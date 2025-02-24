<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {CalendarComponentStore} from "@/stores";
import {createDefaultOfCalendar, OfCalendar} from "@/models/calendar/OfCalendar";
import {VueDraggableNext} from "vue-draggable-next";
import OFCalendarDraggableComponent from "@/component/calendar2_0/OFCalendarDraggableComponent.vue"
import {createDefaultDemandesCalendar} from "@/models/calendar/DemandesCalendar";

@Component({
   components: ({OFCalendarDraggableComponent ,draggableNext: VueDraggableNext})
})
//TODO : mettre un ordre en BD
export default class ListJourOfCalendarComponent extends Vue {
   @Prop({required: true}) jour!: string;
   private CalendarComponentStore = CalendarComponentStore();

   mounted() {
      this.CalendarComponentStore.setOfBySemaine();
   }
   get getOfForDay(): OfCalendar[] {
      return this.CalendarComponentStore.getOfByJour(this.jour);
   }

   private onClone(of: any){
      this.CalendarComponentStore.calendarModel.ofClone = of;
      return { ...of };
   }

   private onDrop(event: any, newList: any) {
      console.log( "newList = ",newList);
      const demande = this.CalendarComponentStore.calendarModel.demandeClone;
      const of = this.CalendarComponentStore.calendarModel.ofClone;
      //item.data
      const existTes: OfCalendar[] = this.getOfForDay;
      const existForDemande = existTes.find((of: OfCalendar) => of.idDemandeOf.idDemande === demande.idDemande && of.jourOf === this.jour);
      if (!existForDemande && demande.idDemande !== 0) {
         this.CalendarComponentStore.creerOfCalendar(demande.idDemande, this.jour);
         this.CalendarComponentStore.updateOrderOfCalendar(this.jour, this.getOfForDay);
      } else if (of.id !== 0) {
         if (of.jourOf !== this.jour) {
            this.CalendarComponentStore.updateOfCalendar(of.id ?? createDefaultOfCalendar().id, this.jour);
         }
      }
      this.CalendarComponentStore.calendarModel.demandeClone = createDefaultDemandesCalendar();
      this.CalendarComponentStore.calendarModel.ofClone = createDefaultOfCalendar();
   }

   private async onMove(newList: any) {
      console.log("move");
      await this.CalendarComponentStore.updateOrderOfCalendar(this.jour, newList);
   }
}
</script>

<template>

   <v-card>
      <v-card-title>{{ jour }}</v-card-title>
      <v-card-item>
         <v-card>
            <v-list-item class="">
               <draggable
                   v-model="getOfForDay"
                   :clone="onClone"
                   :group="{name :'demande'}"
                   @add="onDrop"
                   @update:modelValue="onMove"
               >
                  <template #item="{ element }">
                     <OFCalendarDraggableComponent :item="element"
                                                        :header="CalendarComponentStore.calendarModel.headerListJour"/>
                  </template>
               </draggable>
            </v-list-item>
         </v-card>
      </v-card-item>
   </v-card>
</template>

<style scoped>

</style>