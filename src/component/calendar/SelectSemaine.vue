<script lang="ts">
import {Component, Vue} from 'vue-facing-decorator';
import {CalendarStore, ListStore} from "@/stores";
import {Semaine} from "@/models/types/semaine";
import {getSemaineByInfo} from "@/services/SemainesService";

@Component({})
export default class SelectSemaine extends Vue {
  private CalendarStore = CalendarStore();
  private Lists = ListStore();

  get availableYears() {
    return [...new Set(this.Lists.ListSemaine.map((semaine: Semaine) => semaine.annee))];
  }

  get availableMonths() {
    return [...new Set(this.Lists.ListSemaine
        .filter((semaine: Semaine) => semaine.annee === this.CalendarStore.calendarModel.semaine.annee)
        .map((semaine: Semaine) => semaine.mois))];
  }

  get availableWeeks() {
    return this.Lists.ListSemaine
        .filter((semaine: Semaine) =>
            semaine.annee === this.CalendarStore.calendarModel.semaine.annee &&
            semaine.mois === this.CalendarStore.calendarModel.semaine.mois)
        .map((semaine: Semaine) => semaine.semaine);
  }

  async setCabine() {
    if (this.CalendarStore.calendarModel.cabine != '') {
      this.CalendarStore.calendarModel.semaine = await getSemaineByInfo(this.CalendarStore.calendarModel.semaine);
      await this.CalendarStore.setOfsCalendar(this.CalendarStore.calendarModel.semaine);
    }
  }
}
</script>

<template>
  <v-col>
    <v-row>
      <v-col cols="2">
        <v-select
            label="Année"
            :items="availableYears"
            item-value="Se"
            density="compact"
            outlined
            dense
            v-model="this.CalendarStore.calendarModel.semaine.annee"
            @update:model-value="this.CalendarStore.calendarModel.semaine.mois = 0; this.CalendarStore.calendarModel.semaine.semaine = 0; this.CalendarStore.calendarModel.cabine = ''"
        ></v-select>
      </v-col>
      <v-col cols="1">
        <v-select
            :disabled="!this.CalendarStore.calendarModel.semaine.annee"
            :items="availableMonths"
            label="Mois"
            density="compact"
            outlined
            dense
            v-model="this.CalendarStore.calendarModel.semaine.mois"
            @update:model-value="this.CalendarStore.calendarModel.semaine.semaine = 0; this.CalendarStore.calendarModel.cabine = ''"
        ></v-select>
      </v-col>
      <v-col cols="1">
        <v-select
            :disabled="!this.CalendarStore.calendarModel.semaine.mois"
            :items="availableWeeks"
            label="Semaine"
            density="compact"
            outlined
            dense
            v-model="this.CalendarStore.calendarModel.semaine.semaine"
            @update:model-value="this.CalendarStore.calendarModel.cabine = ''"
        ></v-select>
      </v-col>
      <v-col cols="1">
      <v-select
          :disabled="!this.CalendarStore.calendarModel.semaine.semaine"
          :items="this.CalendarStore.calendarModel.cabines"
          label="cabine"
          density="compact"
          outlined
          dense
          v-model="this.CalendarStore.calendarModel.cabine"
          @update:model-value="setCabine"
      ></v-select>
    </v-col>
    </v-row>
  </v-col>
</template>

<style scoped>

</style>