<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {listFournisseurStore} from "@/stores/FournisseurStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})

export default class ListFournisseurComponent extends Vue {
   private store = listFournisseurStore();
   private dialogDelete = false;
   private header = [
      {title: 'Nom', value: 'nom'},
      {title: 'Action', value: 'actions', align: 'end'}
   ];

  async mounted() {
      await this.store.load();
   }

   async reload() {
      this.store.unLoad();
      await this.store.load();
   }

   private async editFournisseur(item: any) {
      if (await this.store.update(item)) {
         NotificationHandler.showNewNotification('Fournisseur modifié avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la modification du fournisseur.', true);
         await this.reload();
      }
   };

   private async deleteFournisseur(item: any) {
      if (await this.store.delete(item)) {
         NotificationHandler.showNewNotification('Fournisseur supprimé avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la suppression du fournisseur.', true);
      }
   };


}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des Fournisseurs </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.store.listFournisseur.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <v-spacer></v-spacer>
         <router-link to="/creer/fournisseur" class="ml-auto">
            <v-btn class="bntLink">
               Creer un Fournisseur
            </v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table-virtual
             :headers="this.header"
             :items="this.store.listFournisseur.fournisseurs"
             v-model:search="this.store.listFournisseur.filter"
             :filter-keys="['nom']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.nom`]="{ item }">
               <v-text-field
                   v-model="item.nom"
                   variant="outlined"
                   density="comfortable"
               ></v-text-field>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-icon size="x-large" color="primary" @click="editFournisseur(item)">mdi-pencil</v-icon>
               <v-dialog v-model="dialogDelete">
                  <v-card>
                     <v-btn size="x-large" color="primary" @click="dialogDelete = !dialogDelete">annuler</v-btn>
                     <v-btn size="x-large" color="error" @click="deleteFournisseur(item)">confirmer la supression</v-btn>
                  </v-card>
               </v-dialog>
               <v-icon size="x-large" color="error" @click="dialogDelete = !dialogDelete">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>