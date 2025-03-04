<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {ref, nextTick} from 'vue'
import {Of} from "@/models/types/of";
import {ViewUsineStore} from "@/stores";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {Demande} from "@/models/types/demande";
import {Article} from "@/models/types/article";
import {getStockForSortie} from "@/services/StockService"
import {Stock} from "@/models/types/stock"
import {User, createDefaultUser} from "@/models/types/user"
import {listUserStore} from "@/stores/UserStore";

@Component({})

//TODO: faut mettre la surface
export default class DialogOfComponent extends Vue {
   @Prop({required: true}) private item!: Of;
   private UsineStore = ViewUsineStore();
   private selectedCouche: number = -1;
   private listStock: Stock[] = [];
   private scanne: number = 0;
   private stockSelect: Stock[] = [];
   private inputRef = ref<any>(null);
   private listUsersStore = listUserStore();
   private sortieSelect: boolean = false;

   async selectCouche(couche: AvancementSurfaceCouche) {
      this.selectedCouche = this.item.avancements.indexOf(couche);
      this.listStock = await getStockForSortie();
      //TOTO: le faire marcher
      //nextTick(() => {this.inputRef.value?.focus();});
   }

   async sortieStock(user: User) {
      if (await this.UsineStore.sortirStock(this.stockSelect, user, this.item)){
         this.stockSelect = [];
      } else {
         console.error('ben non en fait')
      }
   }

   async scanneArticle() {
      const index = this.listStock.findIndex((stock: Stock) => stock.id === this.scanne)
      if (index != -1) {
         if (!this.stockSelect.find((stock: Stock) => stock.id === this.scanne)){
            this.stockSelect.push(this.listStock[index]);
            this.scanne = 0;
            this.listStock.splice(index, 1);
         } else {
            console.log("en double")
         }
      } else {
         console.log('pas bon')
      }
   }
}
</script>

<template>
   <v-card class="container">
      <v-card-title> Demande :
         {{ this.UsineStore.listDemande.demandes.find((demande: Demande) => demande.id === item.demande.id)?.numero }}
      </v-card-title>
      <v-btn-group
          v-if="selectedCouche === -1"
          v-for="(couche: AvancementSurfaceCouche, index) in this.item.avancements"
          :key="index"

      >
         <v-btn @click="selectCouche(couche)" size="x-large" class="ma-1 buttonCouche "> {{ couche.surfaceCouches.articleCouche.couche.nom }}</v-btn>
      </v-btn-group>
      <v-card v-else-if="selectedCouche !== -1 && !this.sortieSelect">
         <v-card-title> {{
               this.item.avancements[selectedCouche].surfaceCouches.articleCouche.couche.nom
            }}
         </v-card-title>
         <v-card-text>
            <v-text-field
                label="surface pour cette couche"
                v-model="this.item.avancements[selectedCouche].surfaceCouches.surface"
                readonly
                density="comfortable"
            ></v-text-field>
            <v-text-field
                readonly
                density="comfortable"
                label="epaisseur pour cette couche"
                v-model="this.item.avancements[selectedCouche].surfaceCouches.articleCouche.couche.epaisseur"
            ></v-text-field>
            <v-row
                v-for="(article: Article, index) in this.item.avancements[selectedCouche].surfaceCouches.articleCouche.articles"
                :key="index"
            >
               <v-col>
                  <v-text-field
                      readonly
                      density="comfortable"
                      v-model="article.descriptif"
                  ></v-text-field>
               </v-col>
               <v-col>
                  <v-text-field
                      readonly
                      density="comfortable"
                      v-model="article.ral"
                  ></v-text-field>
               </v-col>
            </v-row>
            <v-row>
               <v-col>
                  <v-number-input
                      :ref="inputRef"
                      label="scanne"
                      v-model="scanne"
                      density="comfortable"
                      @update:model-value="scanneArticle"
                  ></v-number-input>
               </v-col>
               <v-col>
                  <v-btn color="error" prepend-icon="mdi-delete" @click="scanne = 0" size="x-large"> Supprimer selection</v-btn>
               </v-col>
            </v-row>
            <v-row>
               <v-list>
                  <v-list-subheader> Stock Selectionner </v-list-subheader>
                  <v-list-item v-for="(stock, index) in this.stockSelect"
                  :key="index"
                  >
                     <span> {{stock.id}} - {{stock.article.id}} </span>
                  </v-list-item>
               </v-list>
            </v-row>
            <v-row>
               <v-btn color="error" prepend-icon="mdi-arrow-left-thick" @click="this.sortieSelect = true" size="x-large"> Sortie des stock </v-btn>
            </v-row>
         </v-card-text>
         <v-btn prepend-icon="mdi-arrow-left-thick" @click="selectedCouche = -1" size="x-large"> Retour a la selection des couches</v-btn>
      </v-card>
      <v-card v-else>
         <v-btn-group v-for="(user: User, index) in UsineStore.listUser.users" :key="index">
            <v-btn size="x-large" @click="sortieStock(user)"> {{ user.name }} </v-btn>
         </v-btn-group>
      </v-card>
   </v-card>
</template>

<style scoped>
.buttonCouche{
   border: #0b0e0d solid 1px;
}
</style>