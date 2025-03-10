<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {Semaine} from "@/models/types/semaine";
import {listSemaineStore} from "@/stores/SemaineStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})
export default class ListSemaineComponent extends Vue {
   private store = listSemaineStore();
   private header = [
      {title: 'Numero année', value: 'annee'},
      {title: 'Numero mois', value: 'mois'},
      {title: 'Numero semaine', value: 'semaine'},
      {tile: 'Date de début', value: 'dateDebut'},
      {tile: 'Date de fin', value: 'dateFin'},
      {title: 'Action', value: 'actions', sortable: false, align: 'end'},
   ];

   async mounted() {
      await this.store.load();
   }
   async reload() {
      this.store.unLoad();
      await this.store.load();
   }
   private async editSemaine(item: Semaine) {
      if (await this.store.update(item)){
         NotificationHandler.showNewNotification('Semaine modifié avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la modification de la semaine.', true);
         await this.reload();
      }
   }

}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des semaine </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.store.listSemaine.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
      </v-card-title>
      <v-card-text>
         <v-data-table-virtual
             :headers="this.header"
             :items="this.store.listSemaine.semaines"
             v-model:search="this.store.listSemaine.filter"
             :filter-keys="['annee', 'mois', 'semaine']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
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
               <v-icon size="x-large" color="primary" @click="editSemaine(item)">mdi-pensil</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>