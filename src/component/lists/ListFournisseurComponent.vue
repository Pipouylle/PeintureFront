<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore} from "@/stores";

@Component({})

//TODO : faire créer mais pas ans un page avec une nouvexu ligne si t'as vraiment envie de te faire chier
export default class ListFournisseurComponent extends Vue {
   private listStore = ListStore();
   private header = [
      {title: 'Nom', value: 'nom'},
      {title: 'Action', value: 'actions', sortable: false, align: 'end'}
   ];

   private async editFournisseur(item: any) {
      if (await this.listStore.ListFournisseur.modif(item)) {

      }
   };

   private deleteFournisseur(item: any) {
      this.listStore.ListFournisseur.remove(item)
   };
}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des Fournisseur </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.listStore.ListFournisseur.filter"
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
             :items="this.listStore.ListFournisseur.fournisseurs"
             v-model:search="this.listStore.ListFournisseur.filter"
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
               <v-btn color="primary" @click="editFournisseur(item)">Modifier</v-btn>
               <v-btn color="error" @click="deleteFournisseur(item)">Supprimer</v-btn>
            </template>

         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>