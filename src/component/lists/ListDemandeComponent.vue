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
    {title: 'phase', value: 'numeroPhase'},
    {title: 'etat', value: 'etat'},
    {title: 'surface', value: 'surface'},
    {title: 'date', value: 'date'},
    {title: 'pièces', value: 'nombrePiece'},
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
    <v-card-title class="d-flex justify-space-between align-center">
      <span> Liste des affaires </span>
      <router-link to="/CreerDemande" class="ml-auto"> Creer Demande </router-link>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="this.header"
          :items="this.listeStore.ListDemande.demandes"
          variant="outlined"
          class="tableList"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editDemande(item)">Modifier</v-btn>
          <v-btn color="error" @click="deleteDemande(item)">Supprimer</v-btn>
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.containerList {
  position: absolute;
  top: 0;
  margin-top: 5vw;
  width: 100vw;
}

.v-card-title {
  justify-content: center;
  height: 2vw;
}

.ml-auto {
  margin-left: auto;
}
.tableList {
  height: 51vw;
}
</style>