<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {DemandesCalendar} from "@/models/calendar/DemandesCalendar";
import {CalendarStore} from "@/stores";

@Component({})

//TODO : add date in endpoint
export default class DemandeCalendarComponent extends Vue {
  @Prop({required: true}) private demande!: DemandesCalendar;
  public getCouleur = (etat: string, color: string) => {
    switch (etat) {
      case 'non commencé':
        return 'transparent';
      case 'en cours':
        return color.replace('rgb', 'rgba').replace(')', `, ${0.5})`);
      case 'terminé':
        return color;
      default:
        return 'transparent';
    }
  };
}
</script>

<template>
  <v-container class="demandeContainer">
    <div class="demande" :style="{ backgroundColor: getCouleur(demande.etatDemande, demande.color) }"
    >
      <div class="top" :style="{ backgroundColor: demande.color }">{{
          demande.numeroAffaire + " - " +
          demande.nomAffaire + " - " +
          demande.numeroDemande}}</div>
      <div class="bottom">{{
          demande.nomSysteme + " - " +
          demande.nombrePieceDemande + " - " +
          demande.surfaceDemande + "m² - (" +
          demande.dateDemande.split('T')[0] + ")"
        }}</div>
    </div>
  </v-container>
</template>

<style scoped>
.demande{
  cursor: grab;
}
</style>