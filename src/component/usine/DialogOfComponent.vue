<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {Of} from "@/models/types/of";
import {ViewUsineStore} from "@/stores";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";

@Component({})

//TODO: faut mettre la surface
//TODO : modif pour que l'orque afficher ça mette d'abord une selection de la couche et ensuite les info de la couche
export default class DialogOfComponent extends Vue {
   @Prop({required: true}) private item!: Of;
   private UsineStore = ViewUsineStore();



   mounted(){
   }

   sortieArticle(couche: AvancementSurfaceCouche){
      console.log(couche);
   }
}
</script>

<template>
   <v-card class="container">
      <v-card-title> Demande : {{ this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.numero }} </v-card-title>
      <v-list v-for="(couche: Couche, index) in this.item.avancements" :key="index">
         <v-list-group>
            <template v-slot:activator="{ props }">
               <v-list-item v-bind="props">
                  <v-list-item-title v-text="couche.surfaceCouches.articleCouche.couche.nom" class="ma-3 font-weight-bold"></v-list-item-title>
               </v-list-item>
            </template>
            <v-list-item>
               <v-card class="ma-3">
                  <span class="ma-3 font-weight-bold"> Articles </span>
                  <v-row v-for="(article: Article, index) in couche.surfaceCouches.articleCouche.articles">
                     <span class="ma-3 font-weight-bold"> {{ article.descriptif }} </span>
                  </v-row>
               </v-card>
               <v-spacer></v-spacer>
               <v-card class="ma-3">
                  <span class="ma-3 font-weight-bold" > surface = {{ couche.surfaceCouches.surface }} </span>
                  <br>
                  <v-btn @click="sortieArticle(couche.surfaceCouches.articleCouche.articles)" prepend-icon="mdi-format-paint"> Faire la sortie de peinture de cette couche </v-btn>
               </v-card>
            </v-list-item>
         </v-list-group>
      </v-list>
   </v-card>
</template>

<style scoped>
</style>