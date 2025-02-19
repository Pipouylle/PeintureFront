<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {ListStore} from "@/stores";
import {Commande} from "@/models/types/commande";
import {deleteCommande} from "@/services/CommandesService";

@Component({})

export default class ListCommandeComponent extends Vue {
  private router = useRouter();
  private ListStore = ListStore();
  private header = [
    {title: 'Eureka', value: 'eureka'},
    {title: 'affaire', value: 'affaire.nom'},
    {title: 'systeme', value: 'systeme.nom'},
    {title: 'Commentaire', value: 'commentaire'},
    {title: 'Fiche H', value: 'ficheH'},
    {title: 'PV Peinture', value: 'pvPeinture'},
    {title: 'Actions', value: 'actions', sortable: false, align: 'end'}
  ]

  editCommande(item: Commande) {
    //TODO: l'edit
  }

  async deleteCommande(item: Commande) {
    try {
      await deleteCommande(item)
      this.ListStore.ListCommande.commandes = this.ListStore.ListCommande.commandes.filter(commande => commande.id !== item.id);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<template>
  <v-card class="containerList">
    <v-card-title class="d-flex justify-space-between align-center titleList">
      <span> Liste des Commande </span>
       <v-text-field
           label="Rechercher"
           density="compact"
           v-model="this.ListStore.ListCommande.filter"
           variant="outlined"
           class="textFilter"
       ></v-text-field>
      <router-link to="/CreerCommande" class="ml-auto">
        <v-btn>
          Creer Commande
        </v-btn>
      </router-link>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="this.header"
          :items="this.ListStore.ListCommande.commandes"
          v-model:search="ListStore.ListCommande.filter"
          :filter-keys="['eureka', 'affaire.nom', 'systeme.nom', 'commentaire']"
          variant="outlined"
          class="tableList"
      >
        <template v-slot:[`item.ficheH`]="{ item }">
          <v-icon v-if="item.ficheH" color="green">mdi-check</v-icon>
          <v-icon v-else color="red">mdi-close</v-icon>
        </template>
        <template v-slot:[`item.pvPeinture`]="{ item }">
          <v-icon v-if="item.pvPeinture" color="green">mdi-check</v-icon>
          <v-icon v-else color="red">mdi-close</v-icon>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editCommande(item)">Modifier</v-btn>
          <v-btn color="error" @click="deleteCommande(item)">Supprimer</v-btn>
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>