<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {CoucheFormStore, SystemeFormStore} from "@/stores";
import {createDefaultCoucheFormModel} from "@/models/forms/CreerCoucheFormModel";
import {creerSystemeWithCouche} from "@/services/SystemesService";
import {createDefaultSysteme} from "@/models/types/systeme";
import {createDefaultCouche} from "@/models/types/couche";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
import {getAllGrenaillage} from "@/services/GrenaillagesService";

@Component({
  components: {CreerCoucheForm}
})

//TODO: il peut n'y aavooir aucun grenaillage
export default class CreerSystemeForm extends Vue {
  private CoucheFormstore = CoucheFormStore();
  private SystemeFormstore = SystemeFormStore();

  public async mounted() {
    this.SystemeFormstore.setCouche()
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
    return this.SystemeFormstore.grenaillages.map((grenaillage: Grenaillage) => {
      return {
        title:"" + grenaillage.nom + " - " + grenaillage.typeChantier,
        value: grenaillage.id
      }
    })
  }



  public async submitForm() {
    try {
      this.SystemeFormstore.systemesForm.systeme.grenaillage = this.SystemeFormstore.systemesForm.selectedGrenaillage ? createDefaultGrenaillage({id: this.SystemeFormstore.systemesForm.selectedGrenaillage.value}) : null;
      await this.SystemeFormstore.addSysteme(this.SystemeFormstore.systemesForm.systeme);
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