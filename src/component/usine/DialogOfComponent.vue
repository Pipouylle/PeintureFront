<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {ref, nextTick} from 'vue'
import {Of} from "@/models/types/of";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {Demande} from "@/models/types/demande";
import {Article} from "@/models/types/article";
import {Stock} from "@/models/types/stock"
import {listUserStore} from "@/stores/UserStore";
import type {VTextField} from 'vuetify/components';
import NotificationHandler from "@/services/NotificationHandler";
import {OperateurViewStore} from "@/stores/UsineStore";
import {listDemandeStore} from "@/stores/DemandeStore";

@Component({})

export default class DialogOfComponent extends Vue {
   @Prop({required: true}) private item!: Of;
   private store = OperateurViewStore();
   private demandeStore = listDemandeStore();
   private userStore = listUserStore();
   private scanne: string = "";
   private stockSelect: Stock[] = [];
   private userSelected: number = -1;
   private sortieSelect: boolean = false;
   private textFieldRef!: VTextField;

   async sortieStock() {
      if (await this.store.sortirStock(this.stockSelect, this.userStore.listUser.users[this.userSelected], this.item)) {
         this.stockSelect = [];
         this.userSelected = -1;
         this.store.dialog = false;
         NotificationHandler.showNewNotification("la sortie de stock a bine été effectuer");
      } else {
         NotificationHandler.showNewNotification("la sortie de stock n'a pas été effectuer", true);
      }
   }

   async scanneArticle() {
      const stock = await this.store.getStock(parseInt(this.scanne));
      if (stock.id != 0 && stock.dateSortie === undefined) {
         if (!this.stockSelect.find((s: Stock) => s.id === stock.id)) {
            this.stockSelect.push(stock);
         } else {
            NotificationHandler.showNewNotification("le stock a déjà été selectionner", true);
         }
      } else {
         NotificationHandler.showNewNotification("le stock est inexistant ou est déjà sortie", true);
      }
      this.scanne = "";
      await nextTick();
      (this.$refs.textFieldRef as VTextField)?.blur();
      setTimeout(() => {
         (this.$refs.textFieldRef as VTextField)?.focus();
      }, 10);
   }
}
//TODO : mettre les couche en v-list avec un header
</script>
<template>
   <v-card class="container">
      <v-card-title class="ma-3 pa 3">
         <v-row >
            <span class="text-h2"> Demande : {{
                  demandeStore.listDemande.demandes.find((demande: Demande) => demande.id === item.demande.id)?.numero
               }} </span>
            <v-spacer></v-spacer>
            <v-btn size="x-large" color="primary" @click="this.store.dialog = false" class="ma-5"> Fermer</v-btn>
         </v-row>
      </v-card-title>
      <div v-if="userSelected === -1" class="d-flex flex-wrap ga-10">
            <v-btn v-for="(user , index) in this.userStore.listUser.users"
                   :key="index"
                   @click="userSelected = index"
                   size="x-large"
                   class="ma-1 buttonOperateur text-h4"
                   variant="outlined"> {{ user.name }}</v-btn>
      </div>
      <v-card v-else-if="userSelected !== -1" class="pa-5">
         <v-row v-for="(couche: AvancementSurfaceCouche, index) in item.avancements" :key="couche.id">
            <v-col>
               <span class="ma-15 text-h4"> couche n°{{ index + 1 }} = </span>
            </v-col>
            <v-col>
               <span class="ma-15 text-h4"> {{ couche.surfaceCouches.articleCouche.couche.nom }} </span>
            </v-col>
            <v-col>
               <span class="ma-15 text-h4"> {{ couche.surfaceCouches.articleCouche.couche.epaisseur }} μ </span>
            </v-col>
         </v-row>
         <v-row>
            <v-list>
               <v-list-subheader class="text-h4"> Liste des bibon scanés </v-list-subheader>
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
            <v-col cols="3">
               <v-text-field
                   ref="textFieldRef"
                   autofocus
                   label="scan"
                   v-model="scanne"
                   density="comfortable"
                   @keyup.enter="scanneArticle"
               ></v-text-field>
            </v-col>
            <v-btn color="primary" append-icon="mdi-arrow-right-thick" @click="sortieStock"
                   size="100" class="w-25"> Valider sortie stock
            </v-btn>
         </v-row>
      </v-card>
   </v-card>
</template>

<style scoped>
.buttonOperateur {
   font-size: 2em;  /* Agrandir le texte */
   padding: 20px 40px; /* Augmenter l’espace interne */
   min-width: 200px; /* Largeur minimale */
   min-height: 80px; /* Hauteur minimale */
}
</style>