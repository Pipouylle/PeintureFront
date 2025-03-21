<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {ModifCoucheCommandeModel} from "@/models/forms/CreerCommande/ModifCoucheCommandeModel";
import {Article} from "@/models/types/article";
import {createDefaultSelectArticles, SelectArticles} from "@/models/forms/CreerCommande/SelectArticles";
import {Fournisseur} from "@/models/types/fournisseur";
import {listArticleStore} from "@/stores/ArticleStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";

@Component({
})
export default class ModifCoucheForCommande extends Vue {
   @Prop({required: true}) private modifCommandeCouche!: ModifCoucheCommandeModel;
   private articleStore = listArticleStore();
   private fournisseurStore = listFournisseurStore();

   async onArticleSelected(id: any) {
      const article = this.articleStore.listArticle.articles.find((article: Article) => article.id === this.modifCommandeCouche.articles[id].article?.value);
      if (article) {
         this.modifCommandeCouche.articleCouche.articles[id] = article;
      }
   }

   addMoreArticle() {
      this.modifCommandeCouche.articles.push(createDefaultSelectArticles({
         id: this.modifCommandeCouche.articles.length,
      }))
   }

   removeArticle(articleSelect: SelectArticles) {
      const index = this.modifCommandeCouche.articles.findIndex(article => article.id === articleSelect.id);

      if (index !== -1) {
         const indexArticle = this.modifCommandeCouche.articleCouche.articles.findIndex(article => article.id === this.modifCommandeCouche.articles[index].article?.value);
         if (indexArticle !== -1) {
            this.modifCommandeCouche.articleCouche.articles.splice(indexArticle, 1);
         }
         this.modifCommandeCouche.articles.splice(index, 1);
         this.modifCommandeCouche.articles.forEach((article, idx) => {
            article.id = idx;
         });
      }
   }

   get formatedArticle() {
      //TODO: faire en sorte que ça propose pas deux fois
      return this.articleStore.listArticle.articles.filter(article => !this.modifCommandeCouche.articles.some(modif => modif.article?.value === article.id )).map((article: Article) => {
         return {
            title: article.descriptif + ' - ' + article.ral,
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
                               clearable
                               item-title="title"
                               item-value="value"
                               v-model="articleSelect.article"
                               @update:model-value="onArticleSelected(articleSelect.id)"
                           ></v-combobox>
                           <v-text-field
                               label="Fournisseur"
                               outlined
                               dense
                               :model-value="articleSelect.article ? this.fournisseurStore.listFournisseur.fournisseurs.find((fournisseur: Fournisseur) => fournisseur.id === this.articleStore.listArticle.articles.find((article :Article) => article.id === articleSelect.article?.value)?.fournisseur.id)?.nom : ''"
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
                           > remove
                           </v-btn>
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