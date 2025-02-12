<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {ModifCommandeCoucheModel} from "@/models/forms/CreerCommande/ModifCommandeCoucheModel";
import {Article} from "@/models/types/article";
import {CommandeFormStore} from "@/stores";
import {createDefaultSelectArticles, SelectArticles} from "@/models/forms/CreerCommande/SelectArticles";

@Component({})
export default class ModifCoucheForCommande extends Vue {
  @Prop({required: true}) private modifCommandeCouche!: ModifCommandeCoucheModel;
  private CommandeFormStore = CommandeFormStore();

  async onArticleSelected(id: number) {
    const article = this.CommandeFormStore.commandeFrom.articles.find((article: Article) => article.id === this.modifCommandeCouche.articles[id].article?.value);
    if (article) {
      this.modifCommandeCouche.articleCouche.articles.push(article);
    }
  }

  addMoreArticle(){
    this.modifCommandeCouche.articles.push(createDefaultSelectArticles({
      id : this.modifCommandeCouche.articles.length,
    }))
  }

  removeArticle(articleSelect: SelectArticles) {
    const index = this.modifCommandeCouche.articles.findIndex(article => article.id === articleSelect.id);
    if (index !== -1) {
      this.modifCommandeCouche.articles.splice(index, 1);
      // Update the IDs of the remaining items
      this.modifCommandeCouche.articles.forEach((article, idx) => {
        article.id = idx;
      });
    }
  }

  get formatedArticle() {
    //TODO: faire en sorte que ça propose pas deux fois
    return this.CommandeFormStore.commandeFrom.articles.map((article: Article) => {
      return {
        title: article.descriptif,
        value: article.id
      }
    })
  }
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="form-container">
      <v-col cols="20" md="10" lg="14">
        <v-card elevation="3">
          <v-card-title class="form-title">Selectionner la ou les articles pour la couche :
            {{ this.modifCommandeCouche.articleCouche.couche.nom }}
          </v-card-title>
          <v-card-text class="cardText">
            <v-row>
              <v-col cols="20">
                <v-row
                    v-for="articleSelect in this.modifCommandeCouche.articles" :key="articleSelect.id">
                  <v-combobox
                      variant="outlined"
                      label="Article"
                      :items="formatedArticle"
                      item-title="title"
                      item-value="value"
                      v-model="articleSelect.article"
                      @update:model-value="onArticleSelected(articleSelect.id)"
                  ></v-combobox>
                  <v-text-field
                      label="code article"
                      outlined
                      dense
                      v-model="articleSelect.article.value"
                      readonly
                      disabled
                  ></v-text-field>
                  <v-btn
                      v-if="articleSelect.id == this.modifCommandeCouche.articles.length - 1"
                      @click="addMoreArticle">
                    add Article
                  </v-btn>
                  <v-btn
                      v-if="this.modifCommandeCouche.articles.length > 1"
                      @click="removeArticle(articleSelect)"
                  > remove </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.cardText {
  padding: 0 24px;
}
</style>