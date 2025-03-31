<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import {deleteCommande} from "@/services/CommandesService";
import {createDefaultSysteme} from "@/models/types/systeme";
import {createDefaultAffaire} from "@/models/types/affaire";
import {creationCommandeStore, listCommandeStore, updateCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import {listGrenaillageStore} from "@/stores/GrenaillageStore";
import NotificationHandler from "@/services/NotificationHandler";
import {listDemandeStore} from "@/stores/DemandeStore";
import {avancementStore} from "@/stores/AvancementStore";

@Component({
   methods: {avancementStore}
})

export default class ListCommandeComponent extends Vue {
   private store = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private modifStore = updateCommandeStore();
   private demandeStore = listDemandeStore();
   private router = useRouter();
   private itemToDelete: Commande | null = null;
   private dialogDelete = false;
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

   async deleteCommande() {
      console.log(this.itemToDelete)
      if (this.itemToDelete) {
         if (await this.store.delete(this.itemToDelete)) {
            NotificationHandler.showNewNotification('Commande supprimée avec succès !');
            this.dialogDelete = false;
         } else {
            NotificationHandler.showNewNotification('Erreur lors de la suppression de la commande.', true);
            await this.reload();
         }
      }
   }

   private openDeleteCommande(item: Commande) {
      this.dialogDelete = true;
      this.itemToDelete = item;
   }

   get formatedCommande() {
      return this.store.listCommande.commandes.map(commande => ({
         ...commande,
         nomAffaire: this.affaireStore.listAffaire.affaires.find(affaire => affaire.id === commande.affaire.id)?.nom,
         numAffaire: this.affaireStore.listAffaire.affaires.find(affaire => affaire.id === commande.affaire.id)?.numero,
         nomSysteme: this.systemeStore.listSysteme.systemes.find(systeme => systeme.id === commande.systeme.id)?.nom,
      })).sort((a,b) => b.id - a.id);
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
         <v-data-table-virtual
             :headers="this.header"
             :items="formatedCommande"
             v-model:search="store.listCommande.filter"
             :filter-keys="['eureka','numAffaire', 'nomAffaire', 'nomSysteme']"
             variant="outlined"
             class="tableList"
         >
            <template v-slot:[`item.ficheH`]="{ item }">
               <v-icon v-if="item.ficheH" color="red">mdi-close</v-icon>
            </template>
            <template v-slot:[`item.pvPeinture`]="{ item }">
               <v-icon v-if="item.pvPeinture" color="red">mdi-close</v-icon>
            </template>
            <template v-slot:[`item.surface`]="{ item }">
               <span> {{ parseInt(String((this.store.listAvancement.filter(avancement => this.demandeStore.listDemande.demandes.some(demande => demande.id === avancement.demandeId && demande.commande.id === item.id)).reduce((sum :number, avancement) => sum + ((avancement.avancement * (this.demandeStore.listDemande.demandes.find(demande => demande.id === avancement.demandeId)?.surface ?? 0)) / 100), 0)))) + ' / ' + item.surface}} </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-icon size="x-large" color="primary" @click="editCommande(item)">mdi-pencil</v-icon>
               <v-dialog v-model="dialogDelete">
                  <v-card>
                     <v-btn size="x-large" color="primary" @click="dialogDelete = !dialogDelete">annuler</v-btn>
                     <v-btn size="x-large" color="error" @click="deleteCommande()">confirmer la supression</v-btn>
                  </v-card>
               </v-dialog>
               <v-icon size="x-large" color="error" @click="openDeleteCommande(item)">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>