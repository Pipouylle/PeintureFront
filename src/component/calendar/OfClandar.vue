<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {CalendarStore} from "@/stores";
import {OfCalendar} from "@/models/calendar/OfCalendar";

@Component({

})
export default class OF extends Vue {
  @Prop({required : true}) private of!: OfCalendar;
  private CalendarStore = CalendarStore();

  public getCouleur = (etat: string) => {
    switch (etat) {
      case 'non commencé': return 'transparent';
      case 'en cours': return 'rgba(0, 0, 255, 0.3)';
      case 'terminé': return 'blue';
      default: return 'transparent';
    }
  };
}
</script>

<template>
  <v-card class="of" :style="{ backgroundColor: getCouleur(of.idDemandeOf.etatDemande) }">
    <v-card-title class="top" :style="{ backgroundColor: 'blue' }"> {{ of.idDemandeOf.numeroDemande + "" + "" }} </v-card-title>
    <v-card-text class="bottom"> {{ of.idDemandeOf.numeroAffaire }} </v-card-text>
  </v-card>
</template>

<style scoped>

</style>