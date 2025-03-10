<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {Commande} from "@/models/types/commande";
import {deleteCommande} from "@/services/CommandesService";
import {createDefaultSysteme} from "@/models/types/systeme";
import {createDefaultAffaire} from "@/models/types/affaire";
import {creationCommandeStore, listCommandeStore, updateCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import {listGrenaillageStore} from "@/stores/GrenaillageStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})

export default class ListCommandeComponent extends Vue {
   private store = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private modifStore = updateCommandeStore();
   private router = useRouter();
   private header = [
      {title: 'Eureka', value: 'eureka'},
      {title: 'Numéro affaire', value: 'numAffaire'},
      {title: 'Nom affaire', value: 'nomAffaire'},
      {title: 'Nom du systeme', value: 'nomSysteme'},
      {title: 'Surface', value: 'surface'},
      {title: 'Ral', value: 'ral'},
      {title: 'Commentaire', value: 'commentaire'},
      {title: 'Fiche H', value: 'ficheH'},
      {title: 'PV Peinture', value: 'pvPeinture'},
      {title: 'Actions', value: 'actions', sortable: false, align: 'end'}
   ]

   async mounted() {
      await this.store.load();
   }

   async reload() {
      this.store.unLoad();
      await this.store.load();
   }

   editCommande(item: Commande) {
      this.modifStore.commandeModif.commande = JSON.parse(JSON.stringify(item));
      this.router.push({name: 'modifCommande'});
   }

   async deleteCommande(item: Commande) {
      if (await this.store.delete(item)) {
         NotificationHandler.showNewNotification('Commande supprimée avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la suppression de la commande.', true);
         await this.reload();
      }
   }
}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des Commandes </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.store.listCommande.filter"
             variant="outlined"
             class="textFilter"
             :fixed-header="true"
         ></v-text-field>
         <v-spacer></v-spacer>
         <router-link to="/creer/commande" class="ml-auto">
            <v-btn>
               Creer une Commande
            </v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table
             :headers="this.header"
             :items="this.store.listCommande.commandes"
             v-model:search="store.listCommande.filter"
             :filter-keys="['eureka', 'affaire.nom', 'systeme.nom', 'commentaire']"
             variant="outlined"
             class="tableList"
         >
            <template v-slot:[`item.nomAffaire`]="{ item }">
               <span> {{
                     this.affaireStore.listAffaire.affaires.find(affaire => affaire.id === item.affaire.id)?.nom
                  }} </span>
            </template>
            <template v-slot:[`item.numAffaire`]="{ item }">
               <span> {{
                     this.affaireStore.listAffaire.affaires.find(affaire => affaire.id === item.affaire.id)?.numero
                  }} </span>
            </template>
            <template v-slot:[`item.nomSysteme`]="{ item }">
               <span> {{
                     this.systemeStore.listSysteme.systemes.find(systeme => systeme.id === item.systeme.id)?.nom
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
               <v-icon size="x-large" color="primary" @click="editCommande(item)">mdi-pencil</v-icon>
               <v-icon size="x-large" color="error" @click="deleteCommande(item)">mdi-delete</v-icon>
            </template>

         </v-data-table>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>