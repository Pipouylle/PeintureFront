<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {CalendarComponentStore} from "@/stores";
import {createDefaultOfCalendar, OfCalendar} from "@/models/calendar2_0/OfCalendar";
import {createDefaultDemandesCalendar} from "@/models/calendar2_0/DemandesCalendar";
import OFCalendarDraggableComponent from "@/component/calendar2_0/OFCalendarDraggableComponent.vue";

@Component({
   components: {OFCalendarDraggableComponent}
})
export default class ListDemiJourOfCalendarComponent extends Vue {
   @Prop({required: true}) private temp!: string;
   @Prop({required: true}) private jour!: string;

   private CalendarStore = CalendarComponentStore();

   get getOfForDay(): OfCalendar[] {
      return this.CalendarStore.getOfByDemiJour(this.jour, this.temp);
   }

   private onClone(of: any){
      this.CalendarStore.calendarModel.ofClone = of;
      return { ...of };
   }

   private onDrop(event: any) {
      const demande = this.CalendarStore.calendarModel.demandeClone;
      const ofClone = this.CalendarStore.calendarModel.ofClone;
      //item.data
      const existTes: OfCalendar[] = this.getOfForDay;
      const existForDemande = existTes.find((of: OfCalendar) => of.idDemandeOf.idDemande === demande.idDemande && of.jourOf === this.jour);
      const existForOF = existTes.find((of: OfCalendar) => of.idDemandeOf.idDemande === ofClone.idDemandeOf.idDemande && of.jourOf === this.jour && of.tempOf === this.temp);
      console.log('exist', existForOF);
      if (!existForDemande && demande.idDemande !== 0) {
         this.CalendarStore.creerOfCalendar(demande.idDemande, this.jour, this.temp);
         this.CalendarStore.updateOrderOfCalendar(this.jour, this.getOfForDay);
      } else if (!existForOF && ofClone.id !== 0) {
         if (ofClone.jourOf !== this.jour || ofClone.tempOf !== this.temp) {
            console.log('je l\'update');
            this.CalendarStore.updateOfCalendar(ofClone.id ?? createDefaultOfCalendar().id, this.jour, this.temp);
         }
      }
      this.CalendarStore.calendarModel.demandeClone = createDefaultDemandesCalendar();
      this.CalendarStore.calendarModel.ofClone = createDefaultOfCalendar();
   }

   private async onMove(newList: any) {
      await this.CalendarStore.updateOrderOfCalendar(this.jour, newList);
   }
}
</script>

<template>
   <v-card>
      <v-card-title>{{ temp }}</v-card-title>
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
                                                   :header="CalendarStore.calendarModel.headerListJour"/>
                  </template>
               </draggable>
            </v-list-item>
         </v-card>
      </v-card-item>
   </v-card>
</template>

<style scoped>

</style>