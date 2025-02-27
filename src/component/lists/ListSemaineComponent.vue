<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore} from "@/stores";
import {Semaine} from "@/models/types/semaine";

@Component({})
export default class ListSemaineComponent extends Vue {
   private listStore = ListStore();
   private header = [
      {title: 'Numero année', value: 'annee'},
      {title: 'Numero mois', value: 'mois'},
      {title: 'Numero semaine', value: 'semaine'},
      {tile: 'Date de début', value: 'dateDebut'},
      {tile: 'Date de fin', value: 'dateFin'},
      {title: 'Action', value: 'actions', sortable: false, align: 'end'},
   ];

   private editSemaine(item: Semaine) {
      //TODO
   }

}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des systemes </span>
         <v-text-field
             label="Rechercher"
             density="compact"
             v-model="this.listStore.ListSemaine.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
      </v-card-title>
      <v-card-text>
         <v-data-table
             :headers="this.header"
             :items="this.listStore.ListSemaine.semaines"
             v-model:search="this.listStore.ListSemaine.filter"
             :filter-keys="['annee', 'mois', 'semaine']"
             variant="outlined"
             class="tableList"
         >
            <template v-slot:[`item.annee`]="{ item }">
               <v-text-field
                   v-model="item.annee"
                   outlined
               ></v-text-field>
            </template>
            <template v-slot:[`item.mois`]="{ item }">
               <v-text-field
                   v-model="item.mois"
                   outlined
               ></v-text-field>
            </template>
            <template v-slot:[`item.dateDebut`]="{ item }">
               <span>{{new Date(item.dateDebut).toLocaleDateString()}}</span>
            </template>
            <template v-slot:[`item.dateFin`]="{ item }">
               <span>{{new Date(item.dateFin).toLocaleDateString()}}</span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-btn color="primary" @click="editSemaine(item)">Modifier</v-btn>
            </template>
         </v-data-table>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>