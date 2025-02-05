<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {getAllAffaires} from "@/services/AffairesService";
import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {CoucheFormStore} from "@/stores";
import {CoucheFormModel, createDefaultCoucheFormModel} from "@/models/forms/CoucheFormModel";
import {creerSystemeWithCouche} from "@/services/SystemesService";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Commande} from "@/models/types/commande";
import {Couche, createDefaultCouche} from "@/models/types/couche";
import {Article, createDefaultArticle} from "@/models/types/article";
import {Consommation} from "@/models/types/consommation";
import Affairemappers from "@/mappers/Affairemappers";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
import {Grenaillages} from "@/models/objectsApi/Grenaillages";
import {getAllGrenaillage} from "@/services/GrenaillagesService";

@Component({
  components: {CreerCoucheForm}
})

export default class CreerSystemeForm extends Vue {
  private CoucheFormstore = CoucheFormStore();
  private nbCouche = 1;

  private nomSysteme: string = '';

  private Grenaillages: Grenaillage[] = [];
  private selectedGrenaillage: { title: string; value: number } | null = null;

  private regieSFP = 0;
  private regieFP = 0;

  private fournisseur = '';

  public async mounted() {
    this.Grenaillages = await getAllGrenaillage();
    this.updateCouches();
  }

  @Watch('nbCouche', {deep: true, immediate: true})
  public updateCouches() {
    if (this.CoucheFormstore.getnbCoucheForm < this.nbCouche) {
      for (let i = this.CoucheFormstore.getnbCoucheForm; i < this.nbCouche; i++) {
        const coucheFormModel = createDefaultCoucheFormModel({id: i + 1,});
        this.CoucheFormstore.addCoucheFrom(coucheFormModel);
      }
    } else if (this.CoucheFormstore.getnbCoucheForm > this.nbCouche) {
      for (let i = this.CoucheFormstore.getnbCoucheForm; i > this.nbCouche; i--) {
        this.CoucheFormstore.deleteCoucheFrom(i - 1);
      }
    }
  }

  get formatedGrenaillages() {
    return this.Grenaillages.map((grenaillage: Grenaillage) => {
      return {
        title:"" + grenaillage.nom + " - " + grenaillage.typeChantier,
        value: grenaillage.id
      }
    })
  }

  public getDataCouche() {
    const coucheForm = this.CoucheFormstore.coucheFroms;
    return coucheForm.map((couche) => {
      return couche.getData();
    });
  }

  public async submitForm() {
    if (!this.selectedGrenaillage) {
      throw new Error('Veuillez selectionner un grenaillage');
    }
    try {
      const DataCouche = this.getDataCouche();
      const systeme: Systeme = createDefaultSysteme({
        nomSysteme: this.nomSysteme,
        grenaillageSysteme: createDefaultGrenaillage({id: this.selectedGrenaillage.value}),
        fournisseurSysteme: this.fournisseur,
        refieSFPSysteme: this.regieSFP,
        refieFPSysteme: this.regieFP,
      });
      for (let i = 0; i < DataCouche.length; i++) {
        const couche = createDefaultCouche({
          epaisseurCouche: DataCouche[i].epaisseur,
          tarifCouche: DataCouche[i].tarif,
          codeArticleCouche: DataCouche[i].article,
          systemeCouche: systeme,
        });
        systeme.coucheSysteme.push(couche);
      }
      this.CoucheFormstore.coucheFroms = [];
      this.nbCouche = 0;
      this.nbCouche = 1;
      await creerSystemeWithCouche(systeme);
    } catch (error) {
      console.error(error);
    }
  }
}

</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="form-container">
      <v-col cols="12" md="8" lg="12">
        <v-card elevation="3">
          <v-card-title class="form-title">Créer un nouvelle systeme</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Nom du systeme"
                  v-model="nomSysteme"
                  outlined
                  dense
                  prepend-icon="mdi-briefcase-outline"
              ></v-text-field>
              <v-text-field
                  label="fournisseur"
                  v-model="fournisseur"
                  outlined
                  dense
              ></v-text-field>
              <v-combobox
                  label="grenaillage"
                  :items="formatedGrenaillages"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="selectedGrenaillage"
              ></v-combobox>
              <v-text-field
                  label="tarif regieSFP"
                  v-model="regieSFP"
                  outlined
                  dense
                  type="number"
              ></v-text-field>
              <v-text-field
                  label="tarif regieFP"
                  v-model="regieFP"
                  outlined
                  dense
                  type="number"
              ></v-text-field>
              <v-number-input
                  :reverse="true"
                  type="number"
                  :max="4"
                  :min="1"
                  controlVariant="split"
                  label="Nombre de couches"
                  v-model="nbCouche"
                  outlined
                  dense
                  prepend-icon="mdi-briefcase-outline"
              ></v-number-input>
              <div v-for="coucheFormModel in this.CoucheFormstore.coucheFroms" :key="coucheFormModel.id">
                <CreerCoucheForm :coucheFromModel="coucheFormModel"/>
              </div>

              <v-btn
                  color="primary"
                  class="mt-4"
                  block
                  size="large"
                  @click="submitForm"
              >
                <v-icon left>mdi-check-circle</v-icon>
                Créer affaire
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.form-container {
  margin-top: 50px;
  padding: 20px;
}

.v-card {
  border-radius: 16px;
  background-color: #1e1e2f;
  color: #ffffff;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #07bf9b;
}

.v-btn {
  background-color: #07bf9b;
  color: white;
  font-weight: bold;
}

.v-btn:hover {
  background-color: #06ac8b;
}

.v-text-field,
.v-date-picker {
  margin-bottom: 16px;
}

.v-card-text {
  padding: 20px;
}
</style>