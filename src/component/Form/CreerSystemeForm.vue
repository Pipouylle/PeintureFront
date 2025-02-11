<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {CoucheFormStore} from "@/stores";
import {createDefaultCoucheFormModel} from "@/models/forms/CreerCoucheFormModel";
import {creerSystemeWithCouche} from "@/services/SystemesService";
import {createDefaultSysteme} from "@/models/types/systeme";
import {createDefaultCouche} from "@/models/types/couche";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
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



  public async submitForm() {
    if (!this.selectedGrenaillage) {
      throw new Error('Veuillez selectionner un grenaillage');
    }
    try {
      const systeme = createDefaultSysteme({
        nom: this.nomSysteme,
        grenaillage: createDefaultGrenaillage({id: this.selectedGrenaillage.value}),
        fournisseur: this.fournisseur,
        refieSFP: this.regieSFP,
        refieFP: this.regieFP,
      });
      for (const coucheFrom of this.CoucheFormstore.coucheFroms) {
        const couche = createDefaultCouche({
          nom: coucheFrom.couche.nom,
          epaisseur: coucheFrom.couche.epaisseur,
          tarif: coucheFrom.couche.tarif,
          systeme: systeme,
        })
        systeme.couches.push(couche);
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

.form-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #044336;
}
</style>