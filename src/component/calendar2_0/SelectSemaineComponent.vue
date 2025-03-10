<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {Semaine} from "@/models/types/semaine";
import {getSemaineByInfo} from "@/services/SemainesService";
import {planingStore} from "@/stores/PlainingStore";
import {listSemaineStore} from "@/stores/SemaineStore";

@Component({})
export default class SelectSemaineComponent extends Vue {
   private store = planingStore();
   private semaineStore = listSemaineStore();
   get availableYears() {
      return [...new Set(this.semaineStore.listSemaine.semaines.map((semaine: Semaine) => semaine.annee))];
   }

   get availableWeeks() {
      return this.semaineStore.listSemaine.semaines
          .filter((semaine: Semaine) =>
              semaine.annee === this.store.planingModel.semaine.annee)
          .map((semaine: Semaine) => semaine.semaine);
   }

   async setCabine() {
      if (this.store.planingModel.cabine != '') {
         this.store.planingModel.semaine = await getSemaineByInfo(this.store.planingModel.semaine);
         await this.store.setSemaine();
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
                v-model="this.store.planingModel.semaine.annee"
                @update:model-value="this.store.planingModel.semaine.mois = 0; this.store.planingModel.semaine.semaine = 0; this.store.planingModel.cabine = ''"
            ></v-select>
         </v-col>
         <v-col cols="1">
            <v-select
                :disabled="!this.store.planingModel.semaine.annee"
                :items="availableWeeks"
                label="Semaine"
                density="compact"
                outlined
                dense
                v-model="this.store.planingModel.semaine.semaine"
                @update:model-value="this.store.planingModel.cabine = ''"
            ></v-select>
         </v-col>
         <v-col cols="2">
            <v-select
                :disabled="!this.store.planingModel.semaine.semaine"
                :items="this.store.planingModel.cabines"
                label="cabine"
                density="compact"
                outlined
                dense
                v-model="this.store.planingModel.cabine"
                @update:model-value="setCabine"
            ></v-select>
         </v-col>
      </v-row>
   </v-card>
</template>

<style scoped>
.container {
   width: calc(84vw - 20px);
   left: 20px;
   top: 20px;
}
.select {
   left: 50px;
}
</style>