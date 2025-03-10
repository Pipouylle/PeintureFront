<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import NotificationHandler from "@/services/NotificationHandler";
import {creationAffaireStore} from "@/stores/AffaireStore";

@Component({})
export default class CreerAffaireForm extends Vue {
   private store = creationAffaireStore();
   private router = useRouter();

   mounted() {
      this.store.load();
   }

   private async submitForm() {
      if (await this.store.create(this.store.affaire)) {
         NotificationHandler.showNewNotification('Affaire créée avec succès !');
         this.router.push({name: 'listAffaire'});
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la création de l\'affaire.', true);
      }
   };
}
</script>

<template>
   <v-container>
      <v-row align="center" justify="center" class="form-container">
         <v-col cols="12" md="8" lg="6">
            <v-card elevation="3">
               <v-card-title class="form-title">Créer une nouvelle affaire</v-card-title>
               <v-card-text>
                  <v-form>
                     <v-text-field
                         label="Numéro de l'affaire"
                         v-model="this.store.affaire.numero"
                         outlined
                         dense
                         required
                         prepend-icon="mdi-briefcase-outline"
                     ></v-text-field>
                     <v-text-field
                         label="Nom de l'affaire"
                         v-model="this.store.affaire.nom"
                         outlined
                         dense
                         required
                         prepend-icon="mdi-briefcase-outline"
                     ></v-text-field>
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
   color: #034335;
}
</style>
