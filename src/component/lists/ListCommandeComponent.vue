<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {ListStore, ModifCommandeStore} from "@/stores";
import {Commande} from "@/models/types/commande";
import {deleteCommande} from "@/services/CommandesService";
import {createDefaultSysteme} from "@/models/types/systeme";
import {createDefaultAffaire} from "@/models/types/affaire";

@Component({})

export default class ListCommandeComponent extends Vue {
   private router = useRouter();
   private ListStore = ListStore();
   private modifStore = ModifCommandeStore();
   private header = [
      {title: 'Eureka', value: 'eureka'},
      {title: 'Numéro affaire', value: 'numAffaire'},
      {title: 'Nom affaire', value: 'nomAffaire'},
      {title: 'Nom du systeme', value: 'nomSysteme'},
      {title: 'Commentaire', value: 'commentaire'},
      {title: 'Fiche H', value: 'ficheH'},
      {title: 'PV Peinture', value: 'pvPeinture'},
      {title: 'Actions', value: 'actions', sortable: false, align: 'end'}
   ]

   mounted() {
      for (const commande of this.ListStore.ListCommande.commandes) {
         commande.affaire = this.ListStore.ListAffaire.affaires.find((affaire) => affaire.id === commande.affaire.id) ?? createDefaultAffaire();
         commande.systeme = this.ListStore.ListSysteme.systemes.find((systeme) => systeme.id === commande.systeme.id) ?? createDefaultSysteme();
      }
   }

   editCommande(item: Commande) {
      return;
      console.log(item);
      this.modifStore.commande = item;
      this.router.push({name: 'modifCommande'});
      //TODO: l'edit, il arrive pas a générer la page
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
         <span> Liste des Commandes </span>
         <v-text-field
             label="Rechercher"
             density="compact"
             v-model="this.ListStore.ListCommande.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <router-link to="/CreerCommande" class="ml-auto">
            <v-btn>
               Creer une Commande
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
            <template v-slot:[`item.nomAffaire`]="{ item }">
               <span> {{
                     this.ListStore.ListAffaire.affaires.find(affaire => affaire.id === item.affaire.id).nom
                  }} </span>
            </template>
            <template v-slot:[`item.numAffaire`]="{ item }">
               <span> {{
                     this.ListStore.ListAffaire.affaires.find(affaire => affaire.id === item.affaire.id).numero
                  }} </span>
            </template>
            <template v-slot:[`item.nomSysteme`]="{ item }">
               <span> {{
                     this.ListStore.ListSysteme.systemes.find(systeme => systeme.id === item.systeme.id).nom
                  }}</span>
            </template>
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