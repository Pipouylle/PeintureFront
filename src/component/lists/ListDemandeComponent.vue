<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore} from "@/stores";
import {deleteDemande} from "@/services/DemandesService";
import {Demande} from "@/models/types/demande";

@Component({})
export default class ListDemandeComponent extends Vue {
  private listeStore = ListStore();
  private header = [
    {title: 'numero', value: 'numero'},
    {title: 'etat', value: 'etat'},
    {title: 'surface', value: 'surface'},
    {title: 'date', value: 'date'},
    {title: 'pièces', value: 'nombrePiece'},
     {title: 'reservation peinturre', value: 'reservation'},
    {title: 'Action', value: 'actions', sortable: false, align: 'end'}
  ];
  async deleteDemande(item: Demande){
    try {
      await deleteDemande(item);
      this.listeStore.ListDemande.demandes = this.listeStore.ListDemande.demandes.filter(demande => demande.id !== item.id);
    } catch (error) {
      console.log(error);
    }

  }
  editDemande(item: Demande){
    //TODO: editDemande
  }

}
</script>

<template>
  <v-card class="containerList">
    <v-card-title class="d-flex justify-space-between align-center titleList">
      <span> Liste des Demande </span>
       <v-text-field
           label="Rechercher"
           density="compact"
           v-model="this.listeStore.ListDemande.filter"
           variant="outlined"
           class="textFilter"
       ></v-text-field>
      <router-link to="/CreerDemande" class="ml-auto"> <v-btn> Creer Demande </v-btn> </router-link>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="this.header"
          :items="this.listeStore.ListDemande.demandes"
          v-model:search="this.listeStore.ListDemande.filter"
          :filter-keys="['numero', 'etat', 'surface', 'date']"
          variant="outlined"
          class="tableList"
      >
         <template v-slot:[`item.date`]="{ item }">
            <span> {{ new Date(item.date).toLocaleDateString() }} </span>
         </template>
         <template v-slot:[`item.reservation`]="{ item }">
            <v-icon v-if="item.reservation" color="green">mdi-check</v-icon>
            <v-icon v-else color="red">mdi-close</v-icon>
         </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editDemande(item)">Modifier</v-btn>
          <v-btn color="error" @click="deleteDemande(item)">Supprimer</v-btn>
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>