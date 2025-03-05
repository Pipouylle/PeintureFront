<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore, ModifArticleStore, useAlert} from "@/stores";
import {useRouter} from "vue-router";
import {Article, createDefaultArticle} from "@/models/types/article";
import {entreeStock} from "@/services/StockService";

@Component({})

//TODO: mettre les nouvelle champs
//TODO: mettre la quantiter de stock
export default class ListArticleComponent extends Vue {
   private list = ListStore();
   private modifStore = ModifArticleStore();
   private router = useRouter();
   private header = [
      {title: "Code", value: "id"},
      {title: "Description", value: "descriptif"},
      {title: "RAL", value: "ral"},
      {title: "Fournisseur", value: "Nomfournisseur"},
      {title: "Action", value: "actions", sortable: false, align: "end"}
   ];
   private stock = false;
   private entreeStockArticle: Article = createDefaultArticle();
   private quEntreeStock = 0;

   async editArticle(item: any) {
      this.modifStore.article = JSON.parse(JSON.stringify(item));
      this.router.push({name: 'modifArticle'});
   }

   deleteArticle(item: any) {
      this.list.ListArticle.remove(item);
   }

   ActiveEntreeStock(item: any) {
      this.entreeStockArticle = item;
      this.stock = true;
   }

   async faireEntreeStock() {
      await entreeStock(this.entreeStockArticle, this.quEntreeStock);
      this.stock = false;
      useAlert().alert('Stock mis a jour');
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
             v-model="this.list.ListArticle.filter"
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
             :items="this.list.ListArticle.articles"
             v-model:search="this.list.ListArticle.filter"
             :filter-keys="['id','descriptif']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.Nomfournisseur`]="{ item }">
               <span> {{
                     this.list.ListFournisseur.fournisseurs.find(fournisseur => fournisseur.id === item.fournisseur.id)?.nom
                  }} </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-btn color="primary" @click="ActiveEntreeStock(item)">Entrée de Stock</v-btn>
               <v-icon color="primary" @click="editArticle(item)">mdi-pencil</v-icon>
               <v-icon color="error" @click="deleteArticle(item)">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>