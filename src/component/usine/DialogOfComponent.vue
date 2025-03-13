<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {ref, nextTick} from 'vue'
import {Of} from "@/models/types/of";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {Demande} from "@/models/types/demande";
import {Article} from "@/models/types/article";
import {getStockForSortie, getStockNotSortie} from "@/services/StockService"
import {Stock} from "@/models/types/stock"
import {User, createDefaultUser} from "@/models/types/user"
import {listUserStore} from "@/stores/UserStore";
import type {VTextField} from 'vuetify/components';
import NotificationHandler from "@/services/NotificationHandler";
import {OperateurViewStore} from "@/stores/UsineStore";
import {listDemandeStore} from "@/stores/DemandeStore";

@Component({})

//TODO: faut mettre la surface
export default class DialogOfComponent extends Vue {
   @Prop({required: true}) private item!: Of;
   private store = OperateurViewStore();
   private demandeStore = listDemandeStore();
   private userStore = listUserStore();
   private selectedCouche: number = -1;
   private listStock: Stock[] = [];
   private scanne: string = "";
   private stockSelect: Stock[] = [];
   private userSelected: number = -1;
   private sortieSelect: boolean = false;
   private textFieldRef!: VTextField;

   async selectCouche(couche: AvancementSurfaceCouche) {
      this.selectedCouche = this.item.avancements.indexOf(couche);
      this.listStock = await getStockNotSortie();
   }

   async sortieStock() {
      if (await this.store.sortirStock(this.stockSelect, this.userStore.listUser.users[this.userSelected], this.item)) {
         this.stockSelect = [];
         this.selectedCouche = -1;
         NotificationHandler.showNewNotification("la sortie de stock a bine été effectuer");
      } else {
         NotificationHandler.showNewNotification("la sortie de stock n'a pas été effectuer", true);
      }
   }

   async scanneArticle() {
      const index = this.store.listStock.findIndex((stock: Stock) => stock.id === parseInt(this.scanne));
      console.log(index);
      if (index != -1) {
         if (!this.stockSelect.find((stock: Stock) => stock.id === parseInt(this.scanne))) {
            console.log('je vais push')
            this.stockSelect.push(this.store.listStock[index]);
         } else {
            NotificationHandler.showNewNotification("le stock a déjà été selectionner", true);
         }
         this.scanne = "";
         await nextTick();
         (this.$refs.textFieldRef as VTextField)?.blur();
         setTimeout(() => {
            (this.$refs.textFieldRef as VTextField)?.focus();
         }, 10);
      }
   }
}
</script>

<template>
   <v-card class="container">
      <v-card-title class="ma-3 pa 3">
         <v-row >
            <span class="text-h1"> Demande : {{
                  demandeStore.listDemande.demandes.find((demande: Demande) => demande.id === item.demande.id)?.numero
               }} </span>
            <v-spacer></v-spacer>
            <v-btn size="x-large" color="primary" @click="this.store.dialog = false" class="ma-5"> Fermer</v-btn>
         </v-row>
      </v-card-title>
      <v-btn-group
          class="ma-3"
          v-if="userSelected === -1"
          v-for="(user , index) in this.userStore.listUser.users"
          :key="index"
      >
         <v-btn @click="userSelected = index" size="x-large" class="ma-1 buttonCouche text-h5"> {{ user.name }}</v-btn>
      </v-btn-group>
      <v-card v-else-if="userSelected !== -1" class="pa-5">
         <v-row v-for="(couche: AvancementSurfaceCouche, index) in item.avancements" :key="couche.id">
            <v-col>
               <span class="ma-15 text-h4"> {{ couche.surfaceCouches.articleCouche.couche.nom }} </span>
            </v-col>
            <v-col>
               <span class="ma-15 text-h4"> {{ couche.surfaceCouches.articleCouche.couche.epaisseur }} m² </span>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <v-text-field
                   ref="textFieldRef"
                   autofocus
                   label="scanne"
                   v-model="scanne"
                   density="comfortable"
                   @update:model-value="scanneArticle"
               ></v-text-field>
            </v-col>
            <v-col>
               <v-btn color="error" prepend-icon="mdi-delete" @click="scanne = ''" size="x-large"> Supprimer selection
               </v-btn>
            </v-col>
         </v-row>
         <v-row>
            <v-list>
               <v-list-subheader> Stock Selectionner</v-list-subheader>
               <v-list-item v-for="(stock, index) in this.stockSelect"
                            :key="index"
               >
                  <v-row>
                     <span class="text-h3 ma-5"> {{ stock.id }} - {{ stock.article.id }} </span>
                     <v-btn size="x-large" color="error" class="text-h4 ma-5" @click="this.stockSelect.splice(index, 1)"
                            prepend-icon="mdi-trash"> enlever
                     </v-btn>
                  </v-row>
               </v-list-item>
            </v-list>
         </v-row>
         <v-row>
            <v-btn color="primary" append-icon="mdi-arrow-right-thick" @click="sortieStock"
                   size="x-large"> Sortie des stock
            </v-btn>
         </v-row>
      </v-card>
   </v-card>
</template>

<style scoped>
.buttonCouche {
   border: #0b0e0d solid 1px;
}
</style>