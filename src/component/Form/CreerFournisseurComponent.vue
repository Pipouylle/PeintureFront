<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {createDefaultFournisseur} from "@/models/types/fournisseur";
import {useRouter} from "vue-router";
import {creationFournisseurStore} from "@/stores/FournisseurStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})
export default class CreerFournisseurComponent extends Vue {
   private store = creationFournisseurStore();
   private fournisseur = createDefaultFournisseur();
   private router = useRouter();

   mounted() {
      this.store.load();
   }
   async submitForm() {
      if (await this.store.create(this.store.fournisseur)) {
         NotificationHandler.showNewNotification('Fournisseur créé avec succès.');
         this.store.clear();
         this.router.push({name: 'listFournisseur'});
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la création du fournisseur.', true);
      }
   }
}
</script>

<template>
   <v-container>
      <v-row align="center" justify="center" class="form-container">
         <v-col cols="12" md="8" lg="6">
            <v-card elevation="3">
               <v-card-title class="form-title">Créer un nouveau fournisseur</v-card-title>
               <v-card-text>
                  <v-form>
                     <v-text-field
                         label="Nom du fournisseur"
                         v-model="this.store.fournisseur.nom"
                         outlined
                         dense
                         required
                     ></v-text-field>
                     <v-btn
                         color="primary"
                         class="mt-4"
                         block
                         size="large"
                         @click="submitForm"
                     >
                        <v-icon left>mdi-check-circle</v-icon>
                        Créer fournisseur
                     </v-btn>
                  </v-form>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<style scoped>

</style>