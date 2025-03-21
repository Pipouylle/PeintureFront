<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {Article, createDefaultArticle} from "@/models/types/article";
import {entreeStock} from "@/services/StockService";
import {listArticleStore, updateArticleStore} from "@/stores/ArticleStore";
import NotificationHandler from "@/services/NotificationHandler";
import {listFournisseurStore} from "@/stores/FournisseurStore";

@Component({})

//TODO: mise a jour de la quantiter quand ça marche et aussi fermer et clear la veleru de la sorti
export default class ListArticleComponent extends Vue {
   private store = listArticleStore();
   private modifStore = updateArticleStore();
   private fournisseurStore = listFournisseurStore();
   private router = useRouter();
   private dialogDelete = false;
   private header = [
      {title: "Code", value: "id"},
      {title: "Description", value: "descriptif"},
      {title: "RAL", value: "ral"},
      {title: "Fournisseur", value: "Nomfournisseur"},
      {title: "quantiter", value: "quantiter"},
      {title: "Action", value: "actions", sortable: false, align: "end"}
   ];
   private stock = false;
   private entreeStockArticle: Article = createDefaultArticle();
   private quEntreeStock: number = 0;

   async mounted() {
      await this.store.load();
   }

   async reload() {
      this.store.unLoad();
      await this.store.load();
   }

   async editArticle(item: any) {
      this.modifStore.articleForm.article = JSON.parse(JSON.stringify(item));
      this.router.push({name: 'modifArticle'});
   }

   async deleteArticle(item: any) {
      if (await this.store.delete(item)) {
         NotificationHandler.showNewNotification('Article supprimé avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la suppression de l\'article.', true);
         await this.reload();
      }
   }

   ActiveEntreeStock(item: any) {
      this.entreeStockArticle = item;
      this.stock = true;
   }

   async faireEntreeStock() {
      try {

         await entreeStock(this.entreeStockArticle, this.quEntreeStock);
         const index = this.store.listArticle.stock.findIndex(stock => stock.idArticle === this.entreeStockArticle.id);
         if (index >= 0) {
            //TODO: ça fait de la merde
            const test = this.store.listArticle.stock[index]
            test.quantite += this.quEntreeStock;
            this.quEntreeStock = 0;
            this.stock = false;
            NotificationHandler.showNewNotification('Stock mis a jour');
            return;
         }
         NotificationHandler.showNewNotification('Erreur lors de l\'entrée de stock', true);
      } catch (e) {
         console.error(e);
         NotificationHandler.showNewNotification('Erreur lors de l\'entrée de stock', true);
      }
   }

   get formatedArticle() {
      return this.store.listArticle.articles.map(article => ({
         ...article,
         Nomfournisseur: this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === article.fournisseur.id)?.nom
      }));
   }
}
</script>

<template>
   <v-dialog
       v-model="stock"
   >
      <v-card>
         <v-card-title>
            Entree de Stock
         </v-card-title>
         <v-number-input
             variant="outlined"
             label="Quantité a entrer"
             class="ma-5"
             v-model="quEntreeStock"
         ></v-number-input>
         <v-btn @click="faireEntreeStock">
            Valider
         </v-btn>
      </v-card>
   </v-dialog>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des articles </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.store.listArticle.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <v-spacer></v-spacer>
         <router-link to="/creer/article" class="ml-auto">
            <v-btn class="bntLink">
               Creer un Article
            </v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table-virtual
             :headers="this.header"
             :items="formatedArticle"
             v-model:search="this.store.listArticle.filter"
             :filter-keys="['id','descriptif','ral','Nomfournisseur']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.quantiter`]="{ item }">
               <span> {{ this.store.listArticle.stock.find(stock => stock.idArticle === item.id)?.quantite ?? 0 }} </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-btn  color="primary" @click="ActiveEntreeStock(item)">Entrée de Stock</v-btn>
               <v-icon size="x-large" color="primary" @click="editArticle(item)">mdi-pencil</v-icon>
               <v-icon size="x-large" color="error" @click="deleteArticle(item)">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>