<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {Semaine} from "@/models/types/semaine";
import {getSemaineByInfo} from "@/services/SemainesService";
import {OperateurViewStore} from "@/stores/UsineStore";
import {listSemaineStore} from "@/stores/SemaineStore";

@Component({})
export default class SelectSemaine extends Vue {
   private store = OperateurViewStore();
   private semaineStore = listSemaineStore();

   get availableYears() {
      return [...new Set(this.semaineStore.listSemaine.semaines.map((semaine: Semaine) => semaine.annee))];
   }

   get availableWeeks() {
      return this.semaineStore.listSemaine.semaines
          .filter((semaine: Semaine) =>
              semaine.annee === this.store.usineModel.semaine.annee)
          .map((semaine: Semaine) => semaine.semaine);
   }

   async setOf(cabine: string) {
      this.store.usineModel.cabine = cabine;
      if (this.store.usineModel.cabine != '') {
         this.store.usineModel.semaine = await getSemaineByInfo(this.store.usineModel.semaine);
         await this.store.setOf();
      }
   }
}
</script>

<template>
   <v-card class="container">
      <v-row justify="start">
         <v-col cols="2" class="select">
            <v-select
                label="Année"
                :items="availableYears"
                item-value="Se"
                density="compact"
                outlined
                dense
                v-model="this.store.usineModel.semaine.annee"
                @update:model-value="this.store.usineModel.semaine.mois = 0; this.store.usineModel.semaine.semaine = 0; this.store.usineModel.cabine = ''; this.store.usineModel.jour = ''"
            ></v-select>
         </v-col>
         <v-col cols="1">
            <v-select
                :disabled="!this.store.usineModel.semaine.annee"
                :items="availableWeeks"
                label="Semaine"
                density="compact"
                outlined
                dense
                v-model="this.store.usineModel.semaine.semaine"
                @update:model-value="this.store.usineModel.cabine = ''; this.store.usineModel.jour = ''"
            ></v-select>
         </v-col>
         <v-col cols="2">
            <v-select
                :disabled="!this.store.usineModel.semaine.semaine"
                :items="this.store.usineModel.jours"
                label="jour"
                density="compact"
                outlined
                dense
                v-model="this.store.usineModel.jour"
                @update:model-value="this.store.usineModel.cabine = ''"
            ></v-select>
         </v-col>
         <v-col cols="2">
            <v-row v-for="(cabine, index) in this.store.usineModel.cabines" :key="index">
               <v-btn
                   :disabled="this.store.usineModel.cabine === cabine || this.store.usineModel.jour === ''"
                   :active="this.store.usineModel.cabine === cabine"
                   variant="outlined"
                   @click="this.setOf(cabine)"
               >{{cabine}}</v-btn>
            </v-row>
         </v-col>
      </v-row>
   </v-card>
</template>

<style scoped>
.container {
   padding: 10px;
   margin: 10px;
   border-radius: 10px;
   width: 90vw;
   left: 2vw;
   height: 8vh;
}
</style>