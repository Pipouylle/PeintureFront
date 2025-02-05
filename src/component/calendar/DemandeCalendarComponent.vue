<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {DemandesCalendar} from "@/models/calendar/DemandesCalendar";
import {CalendarStore} from "@/stores";

@Component({})
export default class DemandeCalendarComponent extends Vue {
  @Prop({required: true}) private demande!: DemandesCalendar;
  private CalendarStore = CalendarStore();

  public dragStart = (event: DragEvent,demande : any) => {
    console.log(this.demande.idDemande);
    event.dataTransfer?.setData("demandeId", demande.idDemande.toString());
  };

  public getCouleur = (etat: string) => {
    switch (etat) {
      case 'non commencé':
        return 'transparent';
      case 'en cours':
        return 'rgba(0, 0, 255, 0.3)';
      case 'terminé':
        return 'blue';
      default:
        return 'transparent';
    }
  };
}
</script>

<template>
  <v-container class="demandeContainer">
    <div class="demande" :style="{ backgroundColor: getCouleur(demande.etatDemande) }"
    >
      <div class="top" :style="{ backgroundColor: 'lightblue' }">{{
          demande.idDemande + " - " +
          demande.numeroDemande + " - " +
        demande.numeroAffaire + " - " +
        demande.nomAffaire}}</div>
      <div class="bottom">{{ demande.nombrePieceDemande }}</div>
    </div>
  </v-container>
</template>

<style scoped>
.demande{
  cursor: grab;
}
</style>