<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {listArticleStore} from "@/stores/ArticleStore";
import {listUserStore} from "@/stores/UserStore";
import {getStockForSortie, unLeaveStock} from "@/services/StockService";
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
import {Of} from "@/models/types/of";
import {Affaire} from "@/models/types/affaire"

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
      {title: 'Date de sortie', value: 'dateSortieFormated'},
      {title: 'Affaire', value: 'numAffaire'},
      {title: 'Code Stock', value: 'id'},
      {title: 'Code Article', value: 'article.id'},
      {title: 'designation', value: 'designationArticle'},
      {title: 'Ral', value: 'ral'},
      {title: 'Opérateur', value: 'nomOperateur'},
      {title: 'Annuler sortie', value: 'action'},
   ];
   private headerRecap = [
      {title: 'Semaine', value: 'semaine'},
      {title: 'Affaire', value: 'codeAffaire'},
      {title: 'Code article', value: 'articleCode'},
      {title: 'Designation', value: 'articleDesignation'},
      {title: 'Quantité', value: 'quantite'},
   ];
   private options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Paris',
      timeZoneName: 'short',
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

   get listRecap() {
      let listSemaines = this.semaineStore.listSemaine.semaines.filter((semaine: Semaine) =>
          this.listOf.some((of: Of) => of.semaine.id === semaine.id &&
            this.listStock.some((stock: Stock) => stock.of.id === of.id))).sort((a, b) => b.id - a.id);
      let items: {
         semaine?: string,
         codeAffaire?: string,
         articleCode?: number,
         articleDesignation?: string,
         quantite?: number
      }[] = [];

      for (const semaine of listSemaines) {
         items.push({semaine: semaine.annee + '-' + semaine.semaine});
         let listAffaires = this.affaireStore.listAffaire.affaires.filter((affaire: Affaire) =>
             this.commandeStore.listCommande.commandes.some(commande => commande.affaire.id === affaire.id &&
                 this.demandeStore.listDemande.demandes.some(demande => demande.commande.id === commande.id &&
                     this.listOf.some(of => of.demande.id === demande.id && of.semaine.id === semaine.id &&
                        this.listStock.some(stock => stock.of.id === of.id))))).sort((a, b) => b.id - a.id);
         for (const affaire of listAffaires) {
            items.push({semaine: semaine.annee + '-' + semaine.semaine, codeAffaire: affaire.numero});
            let stocks: { article: Article, quantiter: number }[] = [];
            const listStock = this.listStock.filter(stock => this.listOf.some(of => of.id === stock.of.id && of.semaine.id === semaine.id &&
                this.demandeStore.listDemande.demandes.some(demande => demande.id === of.demande.id &&
                    this.commandeStore.listCommande.commandes.some(commande => commande.id === demande.commande.id &&
                        affaire.id === commande.affaire.id))));
            for (const stock of listStock) {
               const index = stocks.findIndex(item => item.article.id === stock.article.id);
               if (index == -1) {
                  stocks.push({
                     article: this.articleStore.listArticle.articles.find(article => article.id === stock.article.id) ?? createDefaultArticle(),
                     quantiter: 1
                  });
               } else {
                  stocks[index].quantiter++;
               }
            }
            for (const stock of stocks) {
               items.push({
                  semaine: semaine.annee + '-' + semaine.semaine,
                  codeAffaire: affaire.numero,
                  articleCode: stock.article.id,
                  articleDesignation: stock.article.descriptif,
                  quantite: stock.quantiter
               })
            }
         }
      }
      return items;
   }

   async getAll() {
      try {
         this.listStock = (await getStockForSortie()).sort((a, b) => new Date(b.dateSortie).getTime() - new Date(a.dateSortie).getTime());
         console.log(this.listStock);
         this.listOf = await getOfForSortie();
      } catch (e) {
         NotificationHandler.showNewNotification('Erreur lors de la récupération des stocks.', true);
      }
   }

   get listStockHisto() {
      return this.listStock.map(stock => {
         return {
            ...stock,
            dateSortieFormated: Intl.DateTimeFormat('fr-FR', this.options).format(new Date(stock.dateSortie)),
            nomOperateur: this.userStore.listUser.users.find(user => user.id === stock.user.id)?.name,
            numAffaire: this.affaireStore.listAffaire.affaires.find(affaire => this.commandeStore.listCommande.commandes.some(commande => commande.affaire.id === affaire.id &&
                this.demandeStore.listDemande.demandes.some(demande => demande.commande.id === commande.id &&
                    this.listOf.some(of => of.demande.id === demande.id &&
                        this.listStock.some(stock => stock.of.id === of.id)))))?.numero,
            designationArticle: this.articleStore.listArticle.articles.find(article => article.id === stock.article.id)?.descriptif,
         }
      });
   }

   private async unLeave(item: any) {
      try {
         const response = await unLeaveStock(item.id);
         this.listStock.splice(this.listStock.findIndex(stock => stock.id === response.id), 1);
      } catch (e) {
         NotificationHandler.showNewNotification('Erreur lors de l\'annulation de la sortie.', true);
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
         <span class="text-h2">{{ this.btn ? 'Recap' : 'Historique' }}</span>
         <v-spacer></v-spacer>
         <v-btn @click="this.btn = !this.btn">
            {{ this.btn ? 'Historique' : 'Recap' }}
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
            <template v-slot:[`item.semaine`]="{ item }">
               <span v-if="!item.articleCode && !item.codeAffaire"> {{
                     item.semaine
                  }} </span>
            </template>
            <template v-slot:[`item.codeAffaire`]="{ item }">
               <span v-if="!item.articleCode"> {{
                     item.codeAffaire
                  }} </span>
            </template>
         </v-data-table-virtual>
         <v-data-table-virtual
             v-else
             :headers="this.headerHistorique"
             :items="listStockHisto"
             v-model:search="this.filter"
             :filter-keys="['id','article.id', 'designationArticle', 'ral', 'nomOperateur', 'numAffaire', 'dateSortieFormated']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.ral`]="{ item }">
               <span> {{
                     this.articleStore.listArticle.articles.find(article => article.id === item.article.id)?.ral
                  }} </span>
            </template>
            <template v-slot:[`item.action`]="{ item }">
               <v-icon size="x-large" color="error" @click="unLeave(item)">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>