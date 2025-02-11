<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {CalendarStore, SemaineStore} from "@/stores";
import {Semaine} from "@/models/types/semaine";
import {getSemaineByInfo} from "@/services/SemainesService";

@Component({})
export default class SelectSemaine extends Vue {
  private SemaineStore = SemaineStore();
  private CalendarStore = CalendarStore();

  get availableYears() {
    return [...new Set(this.SemaineStore.Semaines.map((semaine: Semaine) => semaine.annee))];
  }

  get availableMonths() {
    return [...new Set(this.SemaineStore.Semaines
        .filter((semaine: Semaine) => semaine.annee === this.CalendarStore.calendarModel.semaine.annee)
        .map((semaine: Semaine) => semaine.mois))];
  }

  get availableWeeks() {
    return this.SemaineStore.Semaines
        .filter((semaine: Semaine) =>
            semaine.annee === this.CalendarStore.calendarModel.semaine.annee &&
            semaine.mois === this.CalendarStore.calendarModel.semaine.mois)
        .map((semaine: Semaine) => semaine.semaine);
  }

  async setSemaine() {
    const responseSemaine = await getSemaineByInfo(this.CalendarStore.calendarModel.semaine);
    console.log(responseSemaine);
    this.CalendarStore.calendarModel.semaine = responseSemaine;
  }

  async setCabine() {
    await this.CalendarStore.setDemandesCalendar();
    await this.CalendarStore.setOfsCalendar(this.CalendarStore.calendarModel.semaine);
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
            @update:model-value="setSemaine"
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
          v-model="this.CalendarStore.calendarModel.cabines"
          @update:model-value="setCabine"
      ></v-select>
    </v-col>
    </v-row>
  </v-col>
</template>

<style scoped>

</style>