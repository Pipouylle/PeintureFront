<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {getAllArticles} from "@/services/ArticlesService";
import SelectArticleComponent from "@/component/SelectArticleComponent.vue";
import {Article} from "@/models/types/article";
import {CoucheFormModel} from "src/models/forms/CoucheFormModel";

@Component({
  components: {SelectArticleComponent}
})
export default class CreerCoucheForm extends Vue {
  @Prop({required: true}) private coucheFromModel!: CoucheFormModel;

  public async selectArticle($article: Article) {
    this.coucheFromModel.article = $article;
    this.coucheFromModel.dialog = false;
  }
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="form-container">
      <v-col cols="20" md="10" lg="14">
        <v-card elevation="3">
          <v-card-title class="form-title">Nouvelle Couche</v-card-title>
          <v-card-text>
              <v-row>
                <v-col cols="20">
                  <v-btn @click="this.coucheFromModel.dialog = true" outlined dense>
                    Sélectionner un article
                  </v-btn>
                  <v-dialog v-model="this.coucheFromModel.dialog" max-width="1000px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Sélectionner un article</span>
                      </v-card-title>
                      <v-card-text class="dialog-content">
                        <SelectArticleComponent @article-selected="selectArticle" />
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="this.coucheFromModel.dialog = false">Fermer</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-text-field
                      label="Article"
                      outlined
                      dense
                      v-model="this.coucheFromModel.article.id"
                      readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="20">
                  <v-text-field
                    label="epaisseur"
                    outlined
                    dense
                    v-model="this.coucheFromModel.epaisseur"
                  ></v-text-field>
                </v-col>
                <v-col cols="20">
                  <v-text-field
                      label="tarif"
                      outlined
                      dense
                      v-model="this.coucheFromModel.tarif"
                  ></v-text-field>
                </v-col>
              </v-row>
          </v-card-text>
        </v-card>
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