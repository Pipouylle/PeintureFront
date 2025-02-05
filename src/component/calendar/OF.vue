<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {CalendarStore} from "@/stores";
import { Of } from '@/models/types/of';
import {blue} from "vuetify/util/colors";
import {OfCalendar} from "@/models/calendar/OfCalendar";

@Component({

})
export default class OF extends Vue {
  @Prop({required : true}) private of!: OfCalendar;
  private CalendarStore = CalendarStore();

  public dragStart = (event: DragEvent) => {
    event.dataTransfer?.setData("ofId", this.of.id.toString());
  };

  public dragEnd = (event: DragEvent) => {
    const targetElement = document.elementFromPoint(event.clientX, event.clientY);
    if (targetElement && targetElement.hasAttribute("data-cabine") && targetElement.hasAttribute("data-jour")) {
      const jour = targetElement.getAttribute("data-jour") as string;
      const cabine = targetElement.getAttribute("data-cabine") as string;
      this.CalendarStore.updateOfCalendar(this.of.id, jour, cabine);
    }
  };

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
  <div class="of" :style="{ backgroundColor: getCouleur(of.idDemandeOf.etatDemande) }"
       draggable="true"
       @dragstart="dragStart"
       @dragend="dragEnd">
    <div class="top" :style="{ backgroundColor: 'blue' }">{{ of.idDemandeOf.numeroDemande + "" + "" }}</div>
    <div class="bottom">{{ of.idDemandeOf }}</div>
  </div>
</template>

<style scoped>

</style>