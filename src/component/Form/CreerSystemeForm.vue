<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {SystemeFormStore, useAlert} from "@/stores";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
import {getAllGrenaillage} from "@/services/GrenaillagesService";
import {useRouter} from "vue-router";

@Component({
  components: {CreerCoucheForm}
})

export default class CreerSystemeForm extends Vue {
  private SystemeFormstore = SystemeFormStore();
  private router = useRouter();

  public async mounted() {
    this.SystemeFormstore.clearCouche();
  }

  public updateCouches() {
    const nbToadd = this.SystemeFormstore.systemesForm.nbCouche - this.SystemeFormstore.nbCouches;
    if (nbToadd > 0){
      this.SystemeFormstore.addCouche(nbToadd);
    }
    if (nbToadd < 0){
      this.SystemeFormstore.removeCouche(Math.abs(nbToadd));
    }
  }

  get formatedGrenaillages() {
    return this.SystemeFormstore.listgrenaillages.grenaillages.map((grenaillage: Grenaillage) => {
      return {
        title:"" + grenaillage.nom + " - " + grenaillage.typeChantier,
        value: grenaillage.id
      }
    })
  }

  public async submitForm() {
    try {
      this.SystemeFormstore.systemesForm.systeme.grenaillage = this.SystemeFormstore.systemesForm.selectedGrenaillage ? createDefaultGrenaillage({id : this.SystemeFormstore.systemesForm.selectedGrenaillage.value}) : null;
      if (await this.SystemeFormstore.addSysteme(this.SystemeFormstore.systemesForm.systeme)){
        useAlert().alert('Systeme créée avec succès !');
        this.SystemeFormstore.clearAll()
        this.router.push({name: 'listSysteme'});
      } else {
        useAlert().alert('Erreur lors de la création du systeme.');
      }
      this.SystemeFormstore.clearAll();
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
                  v-model="this.SystemeFormstore.systemesForm.systeme.nom"
                  outlined
                  dense
                  prepend-icon="mdi-briefcase-outline"
              ></v-text-field>
              <v-text-field
                  label="fournisseur"
                  v-model="this.SystemeFormstore.systemesForm.systeme.fournisseur"
                  outlined
                  dense
              ></v-text-field>
              <v-combobox
                  label="grenaillage"
                  :items="formatedGrenaillages"
                  clearable
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="this.SystemeFormstore.systemesForm.selectedGrenaillage"
              ></v-combobox>
              <v-text-field
                  label="tarif regieSFP"
                  v-model="this.SystemeFormstore.systemesForm.systeme.refieSFP"
                  outlined
                  dense
                  type="number"
              ></v-text-field>
              <v-text-field
                  label="tarif regieFP"
                  v-model="this.SystemeFormstore.systemesForm.systeme.refieFP"
                  outlined
                  dense
                  type="number"
              ></v-text-field>
              <v-radio-group
                  v-model="this.SystemeFormstore.systemesForm.systeme.type"
                  row
                  dense
              >
                <v-radio v-if="SystemeFormstore.nbCouches <= 1"
                    label="Glycero"
                    value="glycero"
                ></v-radio>
                <v-radio
                    label="Complexe"
                    value="complexe"
                ></v-radio>
              </v-radio-group>
              <v-number-input
                  :reverse="true"
                  type="number"
                  :max="4"
                  :min="1"
                  controlVariant="split"
                  label="Nombre de couches"
                  v-model="this.SystemeFormstore.systemesForm.nbCouche"
                  @update:model-value="updateCouches"
                  variant="outlined"
                  dense
                  prepend-icon="mdi-briefcase-outline"
              ></v-number-input>
              <div v-for="couche in this.SystemeFormstore.systemesForm.systeme.couches" :key="couche.id">
                <CreerCoucheForm :couche="couche"/>
              </div>

              <v-btn
                  color="primary"
                  class="mt-4"
                  block
                  size="large"
                  @click="submitForm"
              >
                <v-icon left>mdi-check-circle</v-icon>
                Créer systeme
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