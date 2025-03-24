<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {deleteDemande} from "@/services/DemandesService";
import {Demande} from "@/models/types/demande";
import {useRouter} from "vue-router";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listDemandeStore, modifDemandeStore} from "@/stores/DemandeStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})
export default class ListDemandeComponent extends Vue {
   private store = listDemandeStore();
   private modifStore = modifDemandeStore();
   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private router = useRouter();
   private dialogDelete = false;
   private header = [
      {title: 'Numéro affaire', value: 'numAffaire'},
      {title: 'Nom affaire', value: 'nomAffaire'},
      {title: 'Numero', value: 'numero'},
      {title: 'Nom Systeme', value: 'nomSysteme'},
      {title: 'RAL', value: 'ral'},
      {title: 'Etat', value: 'etat'},
      {title: 'Surface', value: 'surface'},
      {title: 'Date', value: 'date'},
      {title: 'Pièces', value: 'nombrePiece'},
      {title: 'Réservation peinture', value: 'reservation', align: 'center'},
      {title: 'Commentaire', value: 'commentaire'},
      {title: 'Action', value: 'actions', sortable: false, align: 'end'}
   ];

   async mounted() {
      await this.store.load()
   }

   async reload() {
      this.store.unLoad();
      await this.store.load();
   }

   async deleteDemande(item: Demande) {
      if(await this.store.delete(item)) {
         NotificationHandler.showNewNotification('Demande supprimée avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la suppression de la demande.', true);
      }
   }

   editDemande(item: Demande) {
      const index = this.store.listDemande.demandes.findIndex(demande => demande.id === item.id);
      if (index !== -1) {
         this.modifStore.modifDemande.demande = JSON.parse(JSON.stringify(this.store.listDemande.demandes[index]));
         this.router.push({name: 'modifDemande'});
      }
   }

   async finish(item: Demande) {
      if (await this.store.finish(item)) {
         NotificationHandler.showNewNotification('Demande terminée avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la fin de la demande.', true);
      }
   }

   async notFinish(item: Demande) {
      if (await this.store.notFinish(item)) {
         NotificationHandler.showNewNotification('Demande non terminée avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la fin de la demande.', true);
      }
   }

   get formatedDemande() {
      return this.store.listDemande.demandes.map(demande => ({
         ...demande,
         numAffaire: this.affaireStore.listAffaire.affaires.find(affaire => affaire.id === this.commandeStore.listCommande.commandes.find(commande => commande.id === demande.commande.id)?.affaire.id)?.numero,
         nomAffaire: this.affaireStore.listAffaire.affaires.find(affaire => affaire.id === this.commandeStore.listCommande.commandes.find(commande => commande.id === demande.commande.id)?.affaire.id)?.nom,
         nomSysteme: this.systemeStore.listSysteme.systemes.find(systeme => systeme.id === this.commandeStore.listCommande.commandes.find(commande => commande.id === demande.commande.id)?.systeme.id)?.nom
      }))
   }

}
</script>

<template>

   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des Demandes </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.store.listDemande.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <v-spacer></v-spacer>
         <router-link to="/creer/demande" class="ml-auto">
            <v-btn> Creer une Demande</v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table-virtual
             :headers="this.header"
             :items="formatedDemande"
             v-model:search="this.store.listDemande.filter"
             :filter-keys="['numero','numAffaire','nomAffaire','nomSysteme', 'etat', 'surface']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.ral`]="{ item }">
            <span> {{
                  commandeStore.listCommande.commandes.find(commande => commande.id === item.commande.id)?.ral
               }} </span>
            </template>
            <template v-slot:[`item.surface`]="{ item }">
               <span> {{ parseInt(String(item.surface * (this.commandeStore.listAvancement.find(a => a.demandeId === item .id)?.avancement ?? 0) / 100)) }} / {{ item.surface }} </span>
            </template>
            <template v-slot:[`item.date`]="{ item }">
               <span> {{ new Date(item.date).toLocaleDateString() }} </span>
            </template>
            <template v-slot:[`item.reservation`]="{ item }">
               <v-icon v-if="item.reservation" color="red">mdi-close</v-icon>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-btn v-if="!(item.etat === 'terminé')" color="primary" @click="finish(item)">Terminer</v-btn>
               <v-btn v-else color="primary" @click="notFinish(item)">Réouvrir</v-btn>
               <v-icon size="x-large" color="primary" @click="editDemande(item)">mdi-pencil</v-icon>
               <v-dialog v-model="dialogDelete">
                  <v-card>
                     <v-btn size="x-large" color="primary" @click="dialogDelete = !dialogDelete">annuler</v-btn>
                     <v-btn size="x-large" color="error" @click="deleteDemande(item)">confirmer la supression</v-btn>
                  </v-card>
               </v-dialog>
               <v-icon size="x-large" color="error" @click="dialogDelete = !dialogDelete">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>