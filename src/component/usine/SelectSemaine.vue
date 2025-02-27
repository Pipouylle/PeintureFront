<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ViewUsineStore} from "@/stores";
import {Semaine} from "@/models/types/semaine";
import {getSemaineByInfo} from "@/services/SemainesService";

@Component({})
export default class SelectSemaine extends Vue {
   private UsineStore = ViewUsineStore();

   get availableYears() {
      return [...new Set(this.UsineStore.listSemaine.semaines.map((semaine: Semaine) => semaine.annee))];
   }

   get availableWeeks() {
      return this.UsineStore.listSemaine.semaines
          .filter((semaine: Semaine) =>
              semaine.annee === this.UsineStore.usineModel.semaine.annee)
          .map((semaine: Semaine) => semaine.semaine);
   }

   async setOf(cabine: string) {
      this.UsineStore.usineModel.cabine = cabine;
      if (this.UsineStore.usineModel.cabine != '') {
         this.UsineStore.usineModel.semaine = await getSemaineByInfo(this.UsineStore.usineModel.semaine);
         await this.UsineStore.setOf();
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
                v-model="this.UsineStore.usineModel.semaine.annee"
                @update:model-value="this.UsineStore.usineModel.semaine.mois = 0; this.UsineStore.usineModel.semaine.semaine = 0; this.UsineStore.usineModel.cabine = ''; this.UsineStore.usineModel.jour = ''"
            ></v-select>
         </v-col>
         <v-col cols="1">
            <v-select
                :disabled="!this.UsineStore.usineModel.semaine.annee"
                :items="availableWeeks"
                label="Semaine"
                density="compact"
                outlined
                dense
                v-model="this.UsineStore.usineModel.semaine.semaine"
                @update:model-value="this.UsineStore.usineModel.cabine = ''; this.UsineStore.usineModel.jour = ''"
            ></v-select>
         </v-col>
         <v-col cols="2">
            <v-select
                :disabled="!this.UsineStore.usineModel.semaine.semaine"
                :items="this.UsineStore.usineModel.jours"
                label="jour"
                density="compact"
                outlined
                dense
                v-model="this.UsineStore.usineModel.jour"
                @update:model-value="this.UsineStore.usineModel.cabine = ''"
            ></v-select>
         </v-col>
         <v-col cols="2">
            <v-row v-for="(cabine, index) in this.UsineStore.usineModel.cabines" :key="index">
               <v-btn
                   :disabled="this.UsineStore.usineModel.cabine === cabine || this.UsineStore.usineModel.jour === ''"
                   :active="this.UsineStore.usineModel.cabine === cabine"
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