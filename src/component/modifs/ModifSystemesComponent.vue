<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
import {getAllGrenaillage} from "@/services/GrenaillagesService";
import {createDefaultSysteme} from "@/models/types/systeme";
import {useRouter} from "vue-router";
import {createDefaultFournisseur} from "@/models/types/fournisseur";
import {updateSystemeStore} from "@/stores/SystemeStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import {listGrenaillageStore} from "@/stores/GrenaillageStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({
   components: {CreerCoucheForm}
})

//TODO: il y a pas le clasement, faut voire api
//TODO : le granillage ne marche pas
export default class ModifSystemesComponent extends Vue {
   private store = updateSystemeStore();
   private fournisseurStore = listFournisseurStore();
   private grenaillageStore = listGrenaillageStore();

   private router = useRouter();


   mounted() {
      if (this.store.systemeModif.systeme.id === 0) {
         this.router.push({name: 'listSysteme'});
      }
      this.store.load();
      this.store.systemeModif.selectGrenaillage = this.store.systemeModif.systeme.grenaillage ? {
         title: "" + this.store.systemeModif.systeme.grenaillage.nom + " - " + this.store.systemeModif.systeme.grenaillage.typeChantier,
         value: this.store.systemeModif.systeme.grenaillage.id
      } : null;
      this.store.systemeModif.selectFournisseur = this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.store.systemeModif.systeme.fournisseur.id) ? {
         title: this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.store.systemeModif.systeme.fournisseur.id)?.nom ?? "",
         value: this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.store.systemeModif.systeme.fournisseur.id)?.id ?? 0,
      } : null
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
      try {
         this.store.systemeModif.systeme.fournisseur = this.store.systemeModif.selectFournisseur ? this.fournisseurStore.listFournisseur.fournisseurs.find((fournisseur) => fournisseur.id === this.store.systemeModif.selectFournisseur?.value) ?? createDefaultFournisseur() : createDefaultFournisseur();
         this.store.systemeModif.systeme.grenaillage = this.store.systemeModif.selectGrenaillage ? this.grenaillageStore.listGrenaillage.find((grenaillage: Grenaillage) => grenaillage.id === this.store.systemeModif.selectGrenaillage?.value) ?? null : null;
         if (await this.store.update(this.store.systemeModif.systeme)) {
            NotificationHandler.showNewNotification('Systeme créée avec succès !');
            this.router.push({name: 'listSysteme'});
         } else {
            NotificationHandler.showNewNotification('Erreur lors de la création du systeme.', true);
         }
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
               <v-card-title class="form-title">Modifier un systeme</v-card-title>
               <v-card-text>
                  <v-form>
                     <v-text-field
                         label="Nom du systeme"
                         v-model="this.store.systemeModif.systeme.nom"
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
                        v-model="this.store.systemeModif.selectFournisseur"
                     ></v-combobox>
                     <v-combobox
                         label="grenaillage"
                         :items="formatedGrenaillages"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.systemeModif.selectGrenaillage"
                         clearable
                     ></v-combobox>
                     <v-text-field
                         label="tarif regieSFP"
                         v-model="this.store.systemeModif.systeme.refieSFP"
                         outlined
                         dense
                         type="number"
                     ></v-text-field>
                     <v-text-field
                         label="tarif regieFP"
                         v-model="this.store.systemeModif.systeme.refieFP"
                         outlined
                         dense
                         type="number"
                     ></v-text-field>
                     <v-radio-group
                         v-model="this.store.systemeModif.systeme.type"
                         row
                         dense
                     >
                        <v-radio v-if="store.systemeModif.systeme.couches.length <= 1"
                                 label="Glycero"
                                 value="glycero"
                        ></v-radio>
                        <v-radio
                            label="Complexe"
                            value="complexe"
                        ></v-radio>
                     </v-radio-group>
                     <div v-for="couche in this.store.systemeModif.systeme.couches" :key="couche.id">
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
                        Modifier systeme
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