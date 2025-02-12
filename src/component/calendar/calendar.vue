<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {CalendarStore, ListStore} from "@/stores";

import OfClandar from "@/component/calendar/OfClandar.vue"
import DemandeList from "@/component/calendar/DemandeList.vue";
import SelectSemaine from "@/component/calendar/SelectSemaine.vue";
import InfoOfCalendarDialogComponent from "@/component/calendar/infoOfCalendarDialogComponent.vue";
import {OfCalendar} from "@/models/calendar/OfCalendar";
import CalendarComponent from "@/component/calendar/calendarComponent.vue";

@Component({
  components: {CalendarComponent, InfoOfCalendarDialogComponent, SelectSemaine, DemandeList, OfClandar}
})
export default class calendar extends Vue {
  private CalendarStore = CalendarStore();
}
</script>

<template>
  <v-card elevation="3" class="calendar-container">
    <v-row class="align-center fixed-select-semaine">
      <SelectSemaine/>
    </v-row>
    <v-row class="content">
      <v-col cols="3" class="demande-list-container">
        <DemandeList/>
      </v-col>
      <v-col v-if="CalendarStore.calendarModel.cabine">
        <calendarComponent/>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.fixed-select-semaine {
  position: fixed;
  top: 6vh;
  width: 100%;
  z-index: 1000;
}

.calendar-container {
  margin-top: 50px;;
}

.content {
  height: 86vh;
  z-index: 1000;
  position: fixed;
  top: 12vh;
  border: chocolate;
}

.demande-list-container {
  height: 99%;
  width: 150vh;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}
</style>