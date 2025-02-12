<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {Affaire} from "@/models/types/affaire";
import {deleteAffaire} from "@/services/AffairesService";
import {ListStore} from "@/stores";
import {useRouter} from "vue-router";

@Component({})
export default class ListAffaireComponent extends Vue {

  private listStore = ListStore();
  private router = useRouter();
  private header = [
    {title: 'ID', value: 'id'},
    {title: 'Numero Affaire', value: 'numero'},
    {title: 'Nom Affaire', value: 'nom'},
    {title: 'Action', value: 'actions', sortable: false, align: 'end'},
  ];


  private async deleteAffaire(item: Affaire) {
    try {
      await deleteAffaire(item);
      this.listStore.ListAffaire.affaires = this.listStore.ListAffaire.affaires.filter(affaire => affaire.id !== item.id);
      alert('Affaire supprimée avec succès');
    } catch (e) {
      console.error(e);
    }
  }

  private editAffaire(item: Affaire) {
    this.listStore.ListAffaire.affairesModif = item;
    this.router.push({name: 'modifAffaire'});
  }
}
</script>

<template>
  <v-card class="containerList">
    <v-card-title class="d-flex justify-space-between align-center">
      <span> Liste des affaires </span>
      <router-link to="/CreerAffaire" class="ml-auto"> Creer Affaire</router-link>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="this.header"
          :items="this.listStore.ListAffaire.affaires"
          variant="outlined"
          class="tableList"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editAffaire(item)">Modifier</v-btn>
          <v-btn color="error" @click="deleteAffaire(item)">Supprimer</v-btn>
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
  height: 41vw;
}
</style>