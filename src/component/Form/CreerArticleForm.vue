<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {createDefaultArticle} from "@/models/types/article";
import {useAlert} from "@/stores";
import {useRouter} from "vue-router";
import {Selected} from "@/models/common/Selected";
import {createDefaultFournisseur} from "@/models/types/fournisseur";
import {creationArticleStore} from "@/stores/ArticleStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})

export default class CreerArticleForm extends Vue {
   private store = creationArticleStore();
   private fournisseurStore = listFournisseurStore();
   private router = useRouter();

   async mounted() {
      await this.store.load();
   }

   get formatedFournisseur() {
      return this.fournisseurStore.listFournisseur.fournisseurs.map((fournisseur) => {
         return {
            title: fournisseur.nom,
            value: fournisseur.id
         }
      })
   }

   async submitForm(){
      this.store.articleForm.article.fournisseur = this.store.articleForm.selectFournisseur ? this.fournisseurStore.listFournisseur.fournisseurs.find((fournisseur) => fournisseur.id === this.store.articleForm.selectFournisseur?.value) ?? createDefaultFournisseur() : createDefaultFournisseur();
      if (await this.store.create()){
         NotificationHandler.showNewNotification('Article créé avec succès.');
         this.router.push({name: 'listArticle'});
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la création de l\'article.', true);
      }
   }
}
</script>

<template>
   <v-container>
      <v-row align="center" justify="center" class="form-container">
         <v-col cols="12" md="8" lg="6">
            <v-card elevation="3">
               <v-card-title class="form-title">Créer un nouvel article </v-card-title>
               <v-card-text>
                  <v-form>
                     <v-text-field
                         label="Numéro de l'article"
                         v-model="this.store.articleForm.article.id"
                         outlined
                         dense
                         required
                     ></v-text-field>
                     <v-text-field
                         label="Description de l'article"
                         v-model="this.store.articleForm.article.descriptif"
                         outlined
                         dense
                         required
                     ></v-text-field>
                     <v-text-field
                         label="ral de l'article"
                         v-model="this.store.articleForm.article.ral"
                         outlined
                         dense
                         required
                     ></v-text-field>
                     <v-combobox
                         label="Fournisseur"
                         :items="formatedFournisseur"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.articleForm.selectFournisseur"
                     ></v-combobox>
                     <v-btn
                         color="primary"
                         class="mt-4"
                         block
                         size="large"
                         @click="submitForm"
                     >
                        <v-icon left>mdi-check-circle</v-icon> Créer article
                     </v-btn>
                  </v-form>
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

.form-title {
   font-size: 20px;
   font-weight: bold;
   text-align: center;
   color: #034335;
}
</style>