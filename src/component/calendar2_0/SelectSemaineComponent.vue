<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {CalendarComponentStore} from "@/stores";
import {Semaine} from "@/models/types/semaine";
import {getSemaineByInfo} from "@/services/SemainesService";

@Component({})
export default class SelectSemaineComponent extends Vue {
   private CalendarComponentStore = CalendarComponentStore();

   get availableYears() {
      return [...new Set(this.CalendarComponentStore.listSemaine.map((semaine: Semaine) => semaine.annee))];
   }

   get availableWeeks() {
      return this.CalendarComponentStore.listSemaine
          .filter((semaine: Semaine) =>
              semaine.annee === this.CalendarComponentStore.semaine.annee)
          .map((semaine: Semaine) => semaine.semaine);
   }

   async setCabine() {
      if (this.CalendarComponentStore.calendarModel.cabine != '') {
         this.CalendarComponentStore.semaine = await getSemaineByInfo(this.CalendarComponentStore.semaine);
         await this.CalendarComponentStore.setOfBySemaine();
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
                v-model="this.CalendarComponentStore.semaine.annee"
                @update:model-value="this.CalendarComponentStore.semaine.mois = 0; this.CalendarComponentStore.semaine.semaine = 0; this.CalendarComponentStore.calendarModel.cabine = ''"
            ></v-select>
         </v-col>
         <v-col cols="1">
            <v-select
                :disabled="!this.CalendarComponentStore.semaine.annee"
                :items="availableWeeks"
                label="Semaine"
                density="compact"
                outlined
                dense
                v-model="this.CalendarComponentStore.semaine.semaine"
                @update:model-value="this.CalendarComponentStore.calendarModel.cabine = ''"
            ></v-select>
         </v-col>
         <v-col cols="2">
            <v-select
                :disabled="!this.CalendarComponentStore.semaine.semaine"
                :items="this.CalendarComponentStore.calendarModel.cabines"
                label="cabine"
                density="compact"
                outlined
                dense
                v-model="this.CalendarComponentStore.calendarModel.cabine"
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