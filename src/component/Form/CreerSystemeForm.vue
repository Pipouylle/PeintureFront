<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {useAlert} from "@/stores";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
import {getAllGrenaillage} from "@/services/GrenaillagesService";
import {useRouter} from "vue-router";
import {createDefaultFournisseur} from "@/models/types/fournisseur";
import {creationSystemeStore} from "@/stores/SystemeStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import {listGrenaillageStore} from "@/stores/GrenaillageStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({
   components: {CreerCoucheForm}
})

//TODO: modification des fournisseur
export default class CreerSystemeForm extends Vue {
   private store = creationSystemeStore();
   private fournisseurStore = listFournisseurStore();
   private grenaillageStore = listGrenaillageStore();
   private router = useRouter();

   public async mounted() {
      await this.store.load();
   }

   public updateCouches() {
      const nbToadd = this.store.systemesForm.nbCouche - this.store.nbCouches;
      if (nbToadd > 0) {
         this.store.addCouche(nbToadd);
      }
      if (nbToadd < 0) {
         this.store.removeCouche(Math.abs(nbToadd));
      }
   }

   get formatedGrenaillages() {
      return this.grenaillageStore.listGrenaillage.map((grenaillage: Grenaillage) => {
         return {
            title: "" + grenaillage.nom + " - " + grenaillage.typeChantier,
            value: grenaillage.id
         }
      })
   }

   get formatedFournisseur() {
      return this.fournisseurStore.listFournisseur.fournisseurs.map((fournisseur) => {
         return {
            title: fournisseur.nom,
            value: fournisseur.id
         }
      })
   }

   public async submitForm() {
      this.store.systemesForm.systeme.grenaillage = this.store.systemesForm.selectGrenaillage ? createDefaultGrenaillage({id: this.store.systemesForm.selectGrenaillage.value}) : null;
      this.store.systemesForm.systeme.fournisseur = this.store.systemesForm.selectFournisseur ? this.fournisseurStore.listFournisseur.fournisseurs.find((fournisseur) => fournisseur.id === this.store.systemesForm.selectFournisseur?.value) ?? createDefaultFournisseur() : createDefaultFournisseur();
      if (await this.store.create(this.store.systemesForm.systeme)) {
         NotificationHandler.showNewNotification('Systeme créée avec succès !');
         this.router.push({name: 'listSysteme'});
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la création du systeme.', true);
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
                         v-model="this.store.systemesForm.systeme.nom"
                         outlined
                         dense
                         prepend-icon="mdi-briefcase-outline"
                     ></v-text-field>
                     <v-combobox
                         label="Fournisseur"
                         :items="formatedFournisseur"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.systemesForm.selectFournisseur"
                     ></v-combobox>
                     <v-combobox
                         label="grenaillage"
                         :items="formatedGrenaillages"
                         clearable
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.systemesForm.selectGrenaillage"
                     ></v-combobox>
                     <v-text-field
                         label="tarif regieSFP"
                         v-model="this.store.systemesForm.systeme.refieSFP"
                         outlined
                         dense
                         type="number"
                     ></v-text-field>
                     <v-text-field
                         label="tarif regieFP"
                         v-model="this.store.systemesForm.systeme.refieFP"
                         outlined
                         dense
                         type="number"
                     ></v-text-field>
                     <v-radio-group
                         v-model="this.store.systemesForm.systeme.type"
                         row
                         dense
                     >
                        <v-radio v-if="store.nbCouches <= 1"
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
                         v-model="this.store.systemesForm.nbCouche"
                         @update:model-value="updateCouches"
                         variant="outlined"
                         dense
                         prepend-icon="mdi-briefcase-outline"
                     ></v-number-input>
                     <div v-for="couche in this.store.systemesForm.systeme.couches" :key="couche.id">
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