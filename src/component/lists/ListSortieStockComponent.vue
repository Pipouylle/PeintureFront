<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {listArticleStore} from "@/stores/ArticleStore";
import {listUserStore} from "@/stores/UserStore";
import {getStockForSortie} from "@/services/StockService";
import NotificationHandler from "@/services/NotificationHandler";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listSemaineStore} from "@/stores/SemaineStore";
import {listDemandeStore} from "@/stores/DemandeStore";
import {Stock} from "@/models/types/stock";
import {Semaine, createDefaultSemaine} from "@/models/types/semaine";
import {Article, createDefaultArticle} from "@/models/types/article";
import {getOfForSortie} from "@/services/OfsService";

@Component({})
export default class ListSortieStockComponent extends Vue {
   private articleStore = listArticleStore();
   private userStore = listUserStore();
   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private semaineStore = listSemaineStore();
   private demandeStore = listDemandeStore();

   private btn = true;
   private listStock: any[] = [];
   private listOf: any[] = [];
   private filter = '';
   private headerHistorique = [
      {title: 'Date de sortie', value: 'dateSortie'},
      {title: 'Code Stock', value: 'id'},
      {title: 'Code Article', value: 'article.id'},
      {title: 'designation', value: 'designationArticle'},
      {title: 'Ral', value: 'ral'},
      {title: 'Opérateur', value: 'nomOperateur'},
   ];
   private headerRecap = [
      {title: 'Affaire', value: 'codeAffaire'},
      {title: 'Semaine', value: 'semaine'},
      {title: 'Code article', value: 'articleCode'},
      {title: 'Designation', value: 'articleDesignation'},
      {title: 'Quantité', value: 'quantite'},
   ];
   private options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
      timeZoneName: 'short'
   };

   async mounted() {
      this.userStore.archived = true;
      this.userStore.notArchived = true;
      await this.userStore.load();
      await this.articleStore.load();
      await this.commandeStore.load();
      await this.affaireStore.load();
      await this.systemeStore.load();
      await this.semaineStore.load();
      await this.demandeStore.load();
      await this.getAll();
   }

   get listRecap(){
      //Trier d'bort les affaires(le faire dans le store)
      //ensuite pour chaque affaire faire le regroupe ment des semiane
      //pour finir regouper les article poar apport au truc au dessus
      let affaires = this.affaireStore.listAffaire.affaires.filter( affaire =>
          this.commandeStore.listCommande.commandes.some(commande => commande.affaire.id === affaire.id &&
              this.demandeStore.listDemande.demandes.some(demande => demande.commande.id === commande.id &&
                  this.listOf.some(of => of.demande.id === demande.id &&
                      this.listStock.some(stock => true)))));
      const items: {codeAffaire?: string ,semaine?: number, articleCode?: number, articleDesignation?: string, quantite?: number}[] = [];
      affaires = affaires.sort((a, b) => b.id - a.id);
      for (const affaire of affaires) {
         items.push({codeAffaire: affaire.numero});
         let semaines: {semaine: Semaine, stocks: {article: Article, quantiter: number}[]}[] = [];
         for (const stock of this.listStock) {
            const semaine = this.semaineStore.getSemaine(new Date(stock.dateSortie).toISOString()) ?? createDefaultSemaine();
            const index = semaines.findIndex(item => item.semaine.id === semaine.id);
            if (index == -1) {
               semaines.push({semaine: semaine, stocks: [{article: this.articleStore.listArticle.articles.find(article => article.id === stock.article.id) ?? createDefaultArticle(), quantiter: 1}]});
            } else {
               const indexArticle = semaines[index].stocks.findIndex(item => item.article.id === stock.article.id);
               if (indexArticle == -1) {
                  semaines[index].stocks.push({article: this.articleStore.listArticle.articles.find(article => article.id === stock.article.id) ?? createDefaultArticle(), quantiter: 1});
               } else {
                  semaines[index].stocks[indexArticle].quantiter++;
               }
            }
         }
         semaines = semaines.sort((a,b) => b.semaine.id - a.semaine.id);
         for (const item of semaines) {
            items.push({codeAffaire: affaire.numero,semaine: item.semaine.semaine})
            for (const itemStock of item.stocks) {
               items.push({codeAffaire: affaire.numero,semaine: item.semaine.semaine,articleCode: itemStock.article.id, articleDesignation: itemStock.article.descriptif, quantite: itemStock.quantiter})
            }
         }
      }
      return items;
   }

   async getAll() {
      try {
         this.listStock = (await getStockForSortie()).sort((a, b) => new Date(b.dateSortie).getTime() - new Date(a.dateSortie).getTime());
         console.log(this.listStock);
         this.listOf= await getOfForSortie();
      } catch (e) {
         NotificationHandler.showNewNotification('Erreur lors de la récupération des stocks.', true);
      }
   }
}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des Sortie </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <v-spacer></v-spacer>
         <span class="text-h2">{{this.btn ? 'Recap' : 'Historique'}}</span>
         <v-spacer></v-spacer>
         <v-btn @click="this.btn = !this.btn">
            {{this.btn ? 'Historique' : 'Recap'}}
         </v-btn>
      </v-card-title>
      <v-card-text>
         <v-data-table-virtual
             v-if="this.btn"
             :headers="this.headerRecap"
             :items="this.listRecap"
             v-model:search="this.filter"
             :filter-keys="['codeAffaire','semaine', 'articleCode', 'articleDesignation', 'articleDesignation']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.codeAffaire`]="{ item }">
               <span v-if="!item.semaine && !item.articleCode"> {{
                     item.codeAffaire
                  }} </span>
            </template>
            <template v-slot:[`item.semaine`]="{ item }">
               <span v-if="!item.articleCode"> {{
                     item.semaine
                  }} </span>
            </template>
         </v-data-table-virtual>
         <v-data-table-virtual
             v-else
             :headers="this.headerHistorique"
             :items="this.listStock"
             v-model:search="this.filter"
             :filter-keys="['id','article.id']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.designationArticle`]="{ item }">
               <span> {{
                     this.articleStore.listArticle.articles.find(article => article.id === item.article.id)?.descriptif
                  }} </span>
            </template>
            <template v-slot:[`item.ral`]="{ item }">
               <span> {{
                     this.articleStore.listArticle.articles.find(article => article.id === item.article.id)?.ral
                  }} </span>
            </template>
            <template v-slot:[`item.nomOperateur`]="{ item }">
               <span> {{
                     this.userStore.listUser.users.find(user => user.id === item.user.id)?.name
                  }} </span>
            </template>
            <template v-slot:[`item.dateSortie`]="{ item }">
               <span> {{
                     Intl.DateTimeFormat('fr-FR', this.options).format(new Date(item.dateSortie))
                  }} </span>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>