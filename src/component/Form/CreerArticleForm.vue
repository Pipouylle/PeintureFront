<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {createDefaultArticle} from "@/models/types/article";
import {useAlert, useListStore} from "@/stores";
import {useRouter} from "vue-router";

@Component({})
export default class CreerArticleForm extends Vue {
   private article = createDefaultArticle();
   private router = useRouter();

   async submitForm(){
      if (await useListStore().ListArticle.add(this.article)){
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
               <v-card-title class="form-title">Créer un nouvel article </v-card-title>
               <v-card-text>
                  <v-form>
                     <v-text-field
                         label="Numéro de l'article"
                         v-model="this.article.id"
                         outlined
                         dense
                         required
                         prepend-icon="mdi-briefcase-outline"
                     ></v-text-field>
                     <v-text-field
                         label="descriptif de l'article"
                         v-model="this.article.descriptif"
                         outlined
                         dense
                         required
                         prepend-icon="mdi-briefcase-outline"
                     ></v-text-field>
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