<script lang="ts">
import {Vue, Component, Watch} from 'vue-facing-decorator';
import {CalendarModel} from "@/models/calendar/CalendarModel";
import {CalendarStore, SemaineStore} from "@/stores";
import {getSemaineByInfo} from "@/services/SemainesService";

import OF from "@/component/calendar/OF.vue"
import {Semaine} from "@/models/types/semaine";
import DemandeList from "@/component/calendar/DemandeList.vue";
import SelectSemaine from "@/component/calendar/SelectSemaine.vue";

@Component({
  components: {SelectSemaine, DemandeList, OF}
})
export default class calendar extends Vue {
  private CalendarStore = CalendarStore();
  private SemaineStore = SemaineStore();

  dragStart = (event: DragEvent, of: any) => {
    event.dataTransfer?.setData("ofId", of.id.toString());
  };

  drop = (event: DragEvent, jour: string, ligne: string) => {
    const ofId = event.dataTransfer?.getData("ofId");
    const demandeId = event.dataTransfer?.getData("demandeId");
    if (ofId) {
      this.CalendarStore.updateOfCalendar(parseInt(ofId), jour, ligne);
    }
    if (demandeId) {
      const demande = this.CalendarStore.demandesCalendar.find(d => d.idDemande === parseInt(demandeId));
      if (demande) {
        this.CalendarStore.creerOfCalendar(demande.idDemande, jour, ligne);
      }
    }
  };

  mounted() {
    this.SemaineStore.setSemaines();
    this.CalendarStore.setDemandesCalendar();
  }
}
</script>

<template>
  <v-col class="calendar">
    <v-row class="align-center fixed-select-semaine">
      <SelectSemaine/>
    </v-row>
    <v-row class="content">
      <v-col cols="3" class="demande-list-container">
        <DemandeList/>
      </v-col>
      <v-col class="planning-calendar" v-if="this.CalendarStore.calendarModel.semaine.numeroSemaine">
        <div class="header">
          <div v-for="jour in this.CalendarStore.calendarModel.jours" :key="jour" class="column-header">{{ jour }}</div>
        </div>
        <div class="rows">
          <div v-for="cabine in this.CalendarStore.calendarModel.cabines" :key="cabine" class="row">
            <div class="row-label">{{ cabine }}</div>
            <div v-for="jour in this.CalendarStore.calendarModel.jours" :key="jour" class="column"
                 @dragover.prevent
                 @drop="drop($event, jour, cabine)">
              <OF v-for="of in this.CalendarStore.getOFsByLigneEtJour(cabine, jour)" :key="of.id" :of="of"
                  draggable="true"
                  @dragstart="dragStart($event, of)"/>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>

<style scoped>
.calendar {
}

.fixed-select-semaine {
  position: fixed;
  top: 6vh;
  width: 100%;
  background-color: #0b0e0d;
  z-index: 1000;
}

.content {
  padding-top: 13vh; /* 6djust based on the height of SelectSemaine */

}

.demande-list-container {
  height: calc(100vh - 16vh); /* Adjust based on the height of SelectSemaine */
  overflow: auto;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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