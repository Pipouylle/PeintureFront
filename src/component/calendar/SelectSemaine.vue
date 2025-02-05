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
    return [...new Set(this.SemaineStore.Semaines.map((semaine: Semaine) => semaine.numeroAnnee))];
  }

  get availableMonths() {
    return [...new Set(this.SemaineStore.Semaines
        .filter((semaine: Semaine) => semaine.numeroAnnee === this.CalendarStore.calendarModel.semaine.numeroAnnee)
        .map((semaine: Semaine) => semaine.numeroMois))];
  }

  get availableWeeks() {
    return this.SemaineStore.Semaines
        .filter((semaine: Semaine) =>
            semaine.numeroAnnee === this.CalendarStore.calendarModel.semaine.numeroAnnee &&
            semaine.numeroMois === this.CalendarStore.calendarModel.semaine.numeroMois)
        .map((semaine: Semaine) => semaine.numeroSemaine);
  }

  async setSemaine() {
    const responseSemaine = await getSemaineByInfo(this.CalendarStore.calendarModel.semaine);
    this.CalendarStore.calendarModel.semaine = responseSemaine;

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
            v-model="this.CalendarStore.calendarModel.semaine.numeroAnnee"
        ></v-select>
      </v-col>
      <v-col cols="1">
        <v-select
            :disabled="!this.CalendarStore.calendarModel.semaine.numeroAnnee"
            :items="availableMonths"
            label="Mois"
            density="compact"
            outlined
            dense
            v-model="this.CalendarStore.calendarModel.semaine.numeroMois"
        ></v-select>
      </v-col>
      <v-col cols="1">
        <v-select
            :disabled="!this.CalendarStore.calendarModel.semaine.numeroMois"
            :items="availableWeeks"
            label="Semaine"
            density="compact"
            outlined
            dense
            v-model="this.CalendarStore.calendarModel.semaine.numeroSemaine"
            @update:model-value="setSemaine"
        ></v-select>
      </v-col>
    </v-row>
  </v-col>
</template>

<style scoped>

</style>