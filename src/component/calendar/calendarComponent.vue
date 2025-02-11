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
}
</script>

<template>
  <v-dialog max-width="500" v-model="this.CalendarStore.calendarModel.dialog">
    <InfoOfCalendarDialogComponent :of="this.CalendarStore.calendarModel.ofSelected"/>
  </v-dialog>
  <v-card v-for="jour in this.CalendarStore.calendarModel.jours" :key="jour">
    <v-list
      :items="this.CalendarStore.getOfByJour(jour)"
      draggable="true"
    >
      <template
          v-for="of in this.CalendarStore.getOfByJour(jour)"
          :key="of.id"
          class="of-item"
          draggable="true"
          @dragstart="dragStart($event, of)"
          @click="showMedia(of)"
          @dragover.prevent
          @drop="drop($event, jour)"
      >
        <OfClandar :of="of"/>
      </template>
    </v-list>
  </v-card>
</template>

<style scoped>

</style>