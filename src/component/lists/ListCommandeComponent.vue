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
    {title: 'Nom', value: 'nom'},
    {title: 'Eureka', value: 'eureka'},
    {title: 'Commentaire', value: 'commentaire'},
    {title: 'Fiche H', value: 'ficheH'},
    {title: 'PV Commande', value: 'pvCommande'},
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
    <v-card-title class="d-flex justify-space-between align-center">
      <span> Liste des Commande </span>
      <router-link to="/CreerCommande" class="ml-auto"> Creer Commande</router-link>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="this.header"
          :items="this.ListStore.ListCommande.commandes"
          variant="outlined"
          class="tableList"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editCommande(item)">Modifier</v-btn>
          <v-btn color="error" @click="deleteCommande(item)">Supprimer</v-btn>
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