<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {Affaire} from "@/models/types/affaire";
import {deleteAffaire} from "@/services/AffairesService";
import {ListStore, useAlert} from "@/stores";
import {useRouter} from "vue-router";

@Component({})
export default class ListAffaireComponent extends Vue {

  private listStore = ListStore();
  private router = useRouter();
  private header = [
    {title: 'Numero Affaire', value: 'numero'},
    {title: 'Nom Affaire', value: 'nom'},
    {title: 'Action', value: 'actions', sortable: false, align: 'end'},
  ];


  private async deleteAffaire(item: Affaire) {
    try {
      await deleteAffaire(item);
      await this.listStore.ListAffaire.delete(item);
      useAlert().alert('Affaire supprimée avec succès');
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
    <v-card-title class="d-flex justify-space-between align-center titleList">
      <span> Liste des affaires </span>

       <v-spacer></v-spacer>
      <v-text-field
          label="Rechercher"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          v-model="this.listStore.ListAffaire.filter"
          variant="outlined"
          class="textFilter"
      ></v-text-field>
       <v-spacer></v-spacer>
      <router-link to="/CreerAffaire" class="ml-auto">
        <v-btn class="bntLink">
          Creer une Affaire
        </v-btn>
      </router-link>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="this.header"
          :items="this.listStore.ListAffaire.affaires"
          v-model:search="this.listStore.ListAffaire.filter"
          :filter-keys="['numero']"
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

<style scoped src="@/assets/styles/list.css">
</style>