<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useAlert} from "@/stores";
import {useRouter} from "vue-router";
import {createDefaultFournisseur} from "@/models/types/fournisseur";
import {updateArticleStore} from "@/stores/ArticleStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})

//TODO : mettre peut être un truc pour le disabled genre asund il y a un truc en dessous mdr
export default class ModifArticleComponent extends Vue {
   private store = updateArticleStore();
   private fournisseurStore = listFournisseurStore();
   private router = useRouter();

   mounted() {
      if (this.store.articleForm.article.id === 0) {
         this.router.push({name: 'listArticle'});
      }
      this.store.load();
      this.store.articleForm.selectFournisseur = this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.store.articleForm.article.fournisseur.id) ? {
         title: this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.store.articleForm.article.fournisseur.id)?.nom ?? '',
         value: this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.store.articleForm.article.fournisseur.id)?.id ?? 0,
      } : null;
   }

   get formatedDournisseur() {
      return this.fournisseurStore.listFournisseur.fournisseurs.map((fournisseur) => {
         return {
            title: fournisseur.nom,
            value: fournisseur.id
         }
      })
   }

   async submitForm() {
      this.store.articleForm.article.fournisseur = this.store.articleForm.selectFournisseur ? this.fournisseurStore.listFournisseur.fournisseurs.find((fournisseur) => fournisseur.id === this.store.articleForm.selectFournisseur?.value) ?? createDefaultFournisseur() : createDefaultFournisseur();
      if (await this.store.update()) {
         NotificationHandler.showNewNotification('Article modifié avec succès.');
         this.router.push({name: 'listArticle'});
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la modification de l\'article.', true);
         useAlert().alert('Erreur lors de la création de l\'article.');
      }
   }
}
</script>

<template>
   <v-container>
      <v-row align="center" justify="center" class="form-container">
         <v-col cols="12" md="8" lg="6">
            <v-card elevation="3">
               <v-card-title class="form-title">Modifer un article </v-card-title>
               <v-card-text>
                  <v-form>
                     <v-text-field
                         disabled
                         label="Numéro de l'article"
                         v-model="this.store.articleForm.article.id"
                         outlined
                         dense
                         required
                     ></v-text-field>
                     <v-text-field
                         label="descriptif de l'article"
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
                         :items="formatedDournisseur"
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
                        <v-icon left>mdi-check-circle</v-icon> Modifier article
                     </v-btn>
                  </v-form>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<style scoped>

</style>