<script lang="ts">
import {Component, Vue} from 'vue-facing-decorator';
import {getArticleByCategorie, getTypesArticles} from "@/services/ArticlesService";

import {Article} from "@/models/types/article";

@Component({})
export default class SelectArticleVue extends Vue {
  private types: string[] = [];
  private selectedCategory: string = '';
  private articles: Article[] = [];
  private headers = [
    {text: 'ID', value: 'id'},
    {text: 'Nom', value: 'nomArticle'},
    {text: 'RAL', value: 'rALArticle'},
    {text: 'Stock', value: 'quantiterArticle'},
    {text: 'Fournisseur', value: 'fournisseurArticle'},
    {text: 'Action', value: 'action', sortable: false}
  ];


  async mounted() {
    const response = await getTypesArticles();
    this.types = response.map(item => item.typeArticle);
  }

  async fetchArticles($category: string) {
    this.articles = await getArticleByCategorie($category);
    this.selectedCategory = $category;
  }

  async resetSelection() {
    this.selectedCategory = '';
    this.articles = [];
  }

  async selectArticle(article: Article) {
    this.$emit('article-selected', article);
  }
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="form-container">
      <v-col cols="12" md="8">
        <!-- Étape 1 : Boutons des catégories -->
        <div v-if="!selectedCategory" class="category-container">
          <v-btn
              v-for="type in types"
              :key="type"
              color="primary"
              class="mx-2 my-1"
              @click="fetchArticles(type)"
          >
            {{ type }}
          </v-btn>
        </div>

        <!-- Étape 2 : Liste des articles -->
        <div v-else>
          <v-btn color="secondary" @click="resetSelection" class="mb-4">
            Retour aux catégories
          </v-btn>
          <v-data-table
              :headers="headers"
              :items="articles"
              class="elevation-1"
              @click:row="selectArticle"
          >
            <template v-slot:item.action="{ item }">
              <v-btn icon color="primary" @click.stop="selectArticle(item)">
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.form-container {
  margin-top: 50px;
  padding: 20px;
}

.v-card {
  border-radius: 16px;
  background-color: #1e1e2f;
  color: #ffffff;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #07bf9b;
}

.v-btn {
  background-color: #07bf9b;
  color: white;
  font-weight: bold;
}

.v-btn:hover {
  background-color: #06ac8b;
}

.v-text-field,
.v-date-picker {
  margin-bottom: 16px;
}

.v-card-text {
  padding: 20px;
}
</style>