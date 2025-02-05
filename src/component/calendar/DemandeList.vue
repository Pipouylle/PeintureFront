<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {CalendarStore} from "@/stores";
import DemandeCalendarComponent from "@/component/calendar/DemandeCalendarComponent.vue";

@Component({
  components: {Demande: DemandeCalendarComponent}
})
export default class DemandeList extends Vue {
  private CalendarStore = CalendarStore();

  dragStart = (event: DragEvent, demande: any) => {
    event.dataTransfer?.setData("demandeId", demande.idDemande.toString());
  };

  drop = (event: DragEvent, jour: string, ligne: string) => {
    const demandeId = event.dataTransfer?.getData("demandeId");
    if (demandeId) {
      this.CalendarStore.updateOfCalendar(parseInt(demandeId), jour, ligne);
    }
  };
}
</script>

<template>
  <v-container class="DemandeListContainer">
    <v-row>
      <v-col
          v-for="demande in this.CalendarStore.demandesCalendar"
          :key="demande.idDemande"
          cols="12"
          draggable="true"
          @dragstart="dragStart($event, demande)"
      >
        <Demande :demande="demande"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>