<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore, ModifDemandeStore} from "@/stores";
import {deleteDemande} from "@/services/DemandesService";
import {Demande} from "@/models/types/demande";
import {useRouter} from "vue-router";

@Component({})
export default class ListDemandeComponent extends Vue {
   private listeStore = ListStore();
   private modifStore = ModifDemandeStore();
   private router = useRouter();
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

   async deleteDemande(item: Demande) {
      try {
         await deleteDemande(item);
         this.listeStore.ListDemande.demandes = this.listeStore.ListDemande.demandes.filter(demande => demande.id !== item.id);
      } catch (error) {
         console.log(error);
      }

   }

   editDemande(item: Demande) {
      const index = this.listeStore.ListDemande.demandes.findIndex(demande => demande.id === item.id);
      if (index !== -1) {
         this.modifStore.demande = JSON.parse(JSON.stringify(this.listeStore.ListDemande.demandes[index]));
         this.router.push({name: 'modifDemande'});
      }
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
             v-model="this.listeStore.ListDemande.filter"
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
             :items="this.listeStore.ListDemande.demandes"
             v-model:search="this.listeStore.ListDemande.filter"
             :filter-keys="['numero', 'etat', 'surface', 'date']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.numAffaire`]="{ item }">
               <span> {{
                     listeStore.ListAffaire.affaires.find(affaire => affaire.id === listeStore.ListCommande.commandes.find(commande => commande.id === item.commande.id)?.affaire.id)?.numero
                  }} </span>
            </template>
            <template v-slot:[`item.nomAffaire`]="{ item }">
               <span> {{
                     listeStore.ListAffaire.affaires.find(affaire => affaire.id === listeStore.ListCommande.commandes.find(commande => commande.id === item.commande.id)?.affaire.id)?.nom
                  }} </span>
            </template>
            <template v-slot:[`item.nomSysteme`]="{ item }">
               <span> {{
                    listeStore.ListSysteme.systemes.find(systeme => systeme.id === listeStore.ListCommande.commandes.find(commande => commande.id === item.commande.id)?.systeme.id)?.nom
                  }} </span>
            </template>
            <template v-slot:[`item.ral`]="{ item }">
            <span> {{
                  listeStore.ListCommande.commandes.find(commande => commande.id === item.commande.id)?.ral
               }} </span>
            </template>
            <template v-slot:[`item.date`]="{ item }">
               <span> {{ new Date(item.date).toLocaleDateString() }} </span>
            </template>
            <template v-slot:[`item.reservation`]="{ item }">
               <v-icon v-if="item.reservation" color="green">mdi-check</v-icon>
               <v-icon v-else color="red">mdi-close</v-icon>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-icon size="x-large" color="primary" @click="editDemande(item)">mdi-pencil</v-icon>
               <v-icon size="x-large" color="error" @click="deleteDemande(item)">mdi-delete</v-icon>
            </template>

         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>