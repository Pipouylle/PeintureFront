<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {Affaire} from "@/models/types/affaire";
import {deleteAffaire} from "@/services/AffairesService";
import {useRouter} from "vue-router";
import {listAffaireStore, updateAffaireStore} from "@/stores/AffaireStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})
export default class ListAffaireComponent extends Vue {
   private store = listAffaireStore();
   private storeModif = updateAffaireStore();
   private router = useRouter();
   private dialogDelete = false;
   private header = [
      {title: 'Numero Affaire', value: 'numero'},
      {title: 'Nom Affaire', value: 'nom'},
      {title: 'Action', value: 'actions', sortable: false, align: 'end'},
   ];

   mounted() {
      this.store.load();
   }

   private async deleteAffaire(item: Affaire) {
      if (await this.store.delete(item)) {
         NotificationHandler.showNewNotification('Affaire supprimée avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la suppression de l\'affaire.', true);
      }
   }

   private reload() {
      this.store.unLoad();
      this.store.load();
   }

   get list() {
      return this.store.listAffaire.affaires;
   }

   private editAffaire(item: Affaire) {
      this.storeModif.affaire = JSON.parse(JSON.stringify(item));
      this.router.push({name: 'modifAffaire'});
   }
}
</script>

<template>
   <v-dialog v-model="dialogDelete">
      <v-card>
         <v-btn size="x-large" color="primary" @click="dialogDelete = !dialogDelete">annuler</v-btn>
         <v-btn size="x-large" color="error" @click="deleteAffaire(item)">confirmer la supression</v-btn>
      </v-card>
   </v-dialog>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des affaires </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.store.listAffaire.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <v-spacer></v-spacer>
         <router-link to="/creer/affaire" class="ml-auto">
            <v-btn class="bntLink">
               Creer une Affaire
            </v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table-virtual
             :headers="this.header"
             :items="list"
             v-model:search="this.store.listAffaire.filter"
             :filter-keys="['numero','nom']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.actions`]="{ item }">
               <v-icon size="x-large" color="primary" @click="editAffaire(item)">mdi-pencil</v-icon>
               <v-icon size="x-large" color="error" @click="dialogDelete = !dialogDelete">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>