<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore, ModifArticleStore, useAlert} from "@/stores";
import {useRouter} from "vue-router";

@Component({})

//TODO: mettre les nouvelle champs
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

   async editArticle(item: any) {
      this.modifStore.article = item;
      this.router.push({name: 'modifArticle'});
   }

   deleteArticle(item: any) {
      this.list.ListArticle.remove(item);
   }
}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des articles </span>
         <v-text-field
             label="Rechercher"
             density="compact"
             v-model="this.list.ListArticle.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <router-link to="/CreerArticle" class="ml-auto">
            <v-btn class="bntLink">
               Creer un Article
            </v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table
             :headers="this.header"
             :items="this.list.ListArticle.articles"
             v-model:search="this.list.ListArticle.filter"
             :filter-keys="['id','descriptif']"
             variant="outlined"
             class="tableList"
         >
            <template v-slot:[`item.Nomfournisseur`]="{ item }">
               <span> {{ this.list.ListFournisseur.fournisseurs.find(fournisseur => fournisseur.id === item.fournisseur.id)?.nom }} </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-btn color="primary" @click="editArticle(item)">Modifier</v-btn>
               <v-btn color="error" @click="deleteArticle(item)">Supprimer</v-btn>
            </template>
         </v-data-table>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>