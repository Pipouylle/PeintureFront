<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {CalendarComponentStore, useListStore} from "@/stores";
import {nextTick} from "vue";
import {createDefaultDemandesCalendar, DemandesCalendar} from "@/models/calendar/DemandesCalendar";
import DataTableRowHandler from "@/component/common/DataTableRowHandler.vue";
import {VueDraggableNext} from 'vue-draggable-next'
import {logger} from "@nuxt/kit";
import TableDraggableComponent from "@/component/common/tableDraggable/TableDraggableComponent.vue";
import DemandeCalendarDraggableComponent from "@/component/calendar2_0/DemandeCalendarDraggableComponent.vue";

@Component({
   components: {
      DemandeCalendarDraggableComponent,
      TableDraggableComponent,
      DataTableRowHandler,
      draggableNext: VueDraggableNext
   }
})

//TODO : mettre un ordre en BD
export default class ListDemandeCalendarComponent extends Vue {
   private CalendarComponentStore = CalendarComponentStore();

   cloneDemande(demande: any) {
      this.CalendarComponentStore.calendarModel.demandeClone = demande;
      console.log(demande);
      return { ...demande };
   }


}
</script>

<template>
   <v-card class="calendar-container">
      <v-card>
         <v-card>
            <v-row>
               <v-col v-for="(head, index) in CalendarComponentStore.calendarModel.headerListDemande" :key="index">
                  {{ head.title }}
               </v-col>
            </v-row>
         </v-card>
         <v-card>
            <v-list-item class="">
               <draggable
                   :list="CalendarComponentStore.listDemandeCalendar"
                   :group="{ name: 'demande', pull: 'clone', put: false }"
                   :clone="cloneDemande"
                   @start="dragging = true"
                   @end="dragging = false"
               >
                  <template #item="{ element }">
                     <DemandeCalendarDraggableComponent :item="element"
                                                        :header="CalendarComponentStore.calendarModel.headerListDemande"/>
                  </template>
               </draggable>
            </v-list-item>
         </v-card>
      </v-card>
   </v-card>
</template>

<style scoped>
.calendar-container {
   left: 10px;
}
</style>