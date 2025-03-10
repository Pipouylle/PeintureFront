<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {Article, createDefaultArticle} from "@/models/types/article";
import {entreeStock} from "@/services/StockService";
import {listArticleStore, updateArticleStore} from "@/stores/ArticleStore";
import NotificationHandler from "@/services/NotificationHandler";
import {listFournisseurStore} from "@/stores/FournisseurStore";

@Component({})

//TODO: mettre les nouvelle champs
//TODO: mettre la quantiter de stock
export default class ListArticleComponent extends Vue {
   private store = listArticleStore();
   private modifStore = updateArticleStore();
   private fournisseurStore = listFournisseurStore();
   private router = useRouter();
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
   private quEntreeStock = 0;

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
         //TODO: il ne disparait pas
         await entreeStock(this.entreeStockArticle, this.quEntreeStock);
         this.store.listArticle.stock[this.entreeStockArticle.id].quantite += this.quEntreeStock;
         this.stock = false;
         NotificationHandler.showNewNotification('Stock mis a jour');
      } catch (e) {
         NotificationHandler.showNewNotification('Erreur lors de l\'entrée de stock');
      }
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
         <v-text-field
             label="Quantité a entrer"
             v-model="quEntreeStock"
         ></v-text-field>
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
             :items="this.store.listArticle.articles"
             v-model:search="this.store.listArticle.filter"
             :filter-keys="['id','descriptif']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.Nomfournisseur`]="{ item }">
               <span> {{
                     this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === item.fournisseur.id)?.nom
                  }} </span>
            </template>
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