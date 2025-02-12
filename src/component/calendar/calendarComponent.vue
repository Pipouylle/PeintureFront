<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import OfClandar from "@/component/calendar/OfClandar.vue";
import {CalendarStore} from "@/stores";
import {OfCalendar} from "@/models/calendar/OfCalendar";
import InfoOfCalendarDialogComponent from "@/component/calendar/infoOfCalendarDialogComponent.vue";

@Component({
  components: {InfoOfCalendarDialogComponent, OfClandar}
})
export default class calendarComponent extends Vue {
  private CalendarStore = CalendarStore();

  showMedia(of: OfCalendar) {
    this.CalendarStore.calendarModel.dialog = true;
    this.CalendarStore.calendarModel.ofSelected = of;
  }

  dragStart = (event: DragEvent, of: any) => {
    event.dataTransfer?.setData("ofId", of.id.toString());
    event.dataTransfer!.effectAllowed = "move";
  };

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop = (event: DragEvent, jour: string) => {
    const ofId = event.dataTransfer?.getData("ofId");
    const demandeId = event.dataTransfer?.getData("demandeId");
    if (ofId) {
      this.CalendarStore.updateOfCalendar(parseInt(ofId), jour, this.CalendarStore.calendarModel.cabine);
    }
    if (demandeId) {
      console.log(jour)
      console.log(jour == "mardi")
      const demande = this.CalendarStore.demandesCalendar.find(d => d.idDemande === parseInt(demandeId));
      if (demande) {
        this.CalendarStore.creerOfCalendar(demande.idDemande, jour, this.CalendarStore.calendarModel.cabine);
      }
    }
  };
}
</script>

<template>
  <v-dialog max-width="500" v-model="this.CalendarStore.calendarModel.dialog">
    <InfoOfCalendarDialogComponent :of="this.CalendarStore.calendarModel.ofSelected"/>
  </v-dialog>
  <div class="calendar-container">
    <v-card
        v-for="jour in CalendarStore.calendarModel.jours"
        :key="jour"
        class="day-card"
        @drop="drop($event, jour)"
        @dragover.prevent="allowDrop"
    >
      <v-card-title>{{ jour }}{{ jour === 'lundi' ? ' (' + this.CalendarStore.calendarModel.semaine.dateDebut.split('T')[0] + ')' : '' }}</v-card-title>
      <v-list>
        <v-list-item
            v-for="of in CalendarStore.getOfByJour(jour)"
            :key="of.id"
            draggable="true"
            @dragstart="dragStart($event, of)"
            @click="showMedia(of)"
            class="of-item"
        >
          <OfClandar :of="of"/>
        </v-list-item>
      </v-list>
    </v-card>
  </div>

</template>

<style scoped>

</style>