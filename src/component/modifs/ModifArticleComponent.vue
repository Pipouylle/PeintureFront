<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ModifArticleStore, useAlert, useListStore} from "@/stores";
import {useRouter} from "vue-router";
import {createDefaultFournisseur} from "@/models/types/fournisseur";

@Component({})

//TODO : mettre peut être un truc pour le disabled genre asund il y a un truc en dessous mdr
export default class ModifArticleComponent extends Vue {
   private modifStore = ModifArticleStore();
   private router = useRouter();

   mounted() {
      this.modifStore.selectFournisseur = this.modifStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.modifStore.article.fournisseur.id) ? {
         title: this.modifStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.modifStore.article.fournisseur.id)?.nom ?? '',
         value: this.modifStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.modifStore.article.fournisseur.id)?.id ?? 0,
      } : null;
   }

   get formatedFournisseur() {
      return useListStore().ListFournisseur.fournisseurs.map((fournisseur) => {
         return {
            title: fournisseur.nom,
            value: fournisseur.id
         }
      })
   }

   async submitForm() {
      this.modifStore.article.fournisseur = this.modifStore.selectFournisseur ? useListStore().ListFournisseur.fournisseurs.find((fournisseur) => fournisseur.id === this.modifStore.selectFournisseur?.value) ?? createDefaultFournisseur() : createDefaultFournisseur();
      if (await useListStore().ListArticle.modif(this.modifStore.article)) {
         this.router.push({name: 'listArticle'});
      } else {
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
                         v-model="this.modifStore.article.id"
                         outlined
                         dense
                         required
                     ></v-text-field>
                     <v-text-field
                         label="descriptif de l'article"
                         v-model="this.modifStore.article.descriptif"
                         outlined
                         dense
                         required
                     ></v-text-field>
                     <v-text-field
                         label="ral de l'article"
                         v-model="this.modifStore.article.ral"
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
                         v-model="this.modifStore.selectFournisseur"
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