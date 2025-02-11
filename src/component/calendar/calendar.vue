<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {CalendarStore, SemaineStore} from "@/stores";

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
  private SemaineStore = SemaineStore();


  mounted() {
    this.SemaineStore.setSemaines();
    this.CalendarStore.setDemandesCalendar();
  }
}
</script>

<template>
  <v-card elevation="3" class="calendar-container">
    <v-card-text>
      <v-col class="calendar">
        <v-row class="align-center fixed-select-semaine">
          <SelectSemaine/>
        </v-row>
        <v-row class="content">
          <v-col cols="3" class="demande-list-container">
            <DemandeList/>
          </v-col>
          <v-col>
            <calendarComponent/>
          </v-col>
        </v-row>
      </v-col>
    </v-card-text>
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
  padding-top: 2vh; /* 6djust based on the height of SelectSemaine */
  height: calc(100vh - 16vh);
}

.demande-list-container {
  z-index: 1000;
  top: 10vh;
  height: 10vw;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
}

.planning-calendar {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
}

.column-header {
  flex: 1;
  text-align: center;
  font-weight: bold;
}

.rows {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
}

.row-label {
  width: 150px;
  font-weight: bold;
}

.column {
  flex: 1;
  min-height: 100px;
  border: 1px solid #0b0e0d;
}
</style>