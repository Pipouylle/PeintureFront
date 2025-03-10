<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {Affaire} from "@/models/types/affaire";
import {updateAffaire} from "@/services/AffairesService";
import {useRouter} from "vue-router";
import {updateAffaireStore} from "@/stores/AffaireStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})
export default class ModifAffaireComponent extends Vue {
   private store = updateAffaireStore();
   private router = useRouter();

   async mounted() {
      await this.store.load();
      if (this.store.affaire.id === 0) {
         this.router.push({name: 'listAffaire'});
      }
   }
   async submitForm() {
      if (await this.store.update(this.store.affaire)) {
         NotificationHandler.showNewNotification('Affaire modifiée avec succès !');
         this.router.push({name: 'listAffaire'});
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la modification de l\'affaire.', true);
      }
   }
}
</script>

<template>
   <v-container>
      <v-card class="container">
         <v-card-title> Modification d'une affaire</v-card-title>
         <v-card-text>
            <v-form>
               <v-text-field
                   label="Nom de l'affaire"
                   v-model="store.affaire.nom"
                   variant="outlined"
               ></v-text-field>
               <v-text-field
                   label="Numéro de l'affaire"
                   v-model="store.affaire.numero"
                   variant="outlined"
               ></v-text-field>
               <v-btn
                   color="primary"
                   class="mt-4"
                   block
                   size="large"
                   @click="submitForm"
               >
                  <v-icon left>mdi-check-circle</v-icon>
                  Modifier affaire
               </v-btn>
            </v-form>
         </v-card-text>
      </v-card>
   </v-container>
</template>

<style scoped>
</style>