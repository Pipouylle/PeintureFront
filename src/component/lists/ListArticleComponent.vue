<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore, useAlert} from "@/stores";

@Component({})
export default class ListArticleComponent extends Vue {
  private list = ListStore();
  private header  = [
    { title : "Code" , value : "id" },
    { title : "Description" , value : "descriptif" },
    { title : "Action" , value : "actions" , sortable : false , align : "end" }
  ];

  async editArticle(item: any) {
    try {
      if (await this.list.ListArticle.modif(item)) {
        useAlert().alert('Modification effectuée avec succès');
      } else {
        useAlert().alert('Erreur lors de la modification');
      }
    } catch (e) {
      useAlert().alert('Erreur lors de la modification');
      console.error(e);
    }
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
        <template v-slot:[`item.descriptif`]="{ item }">
          <v-text-field
              v-model="item.descriptif"
              variant="outlined"
          ></v-text-field>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editArticle(item)">Modifier</v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>