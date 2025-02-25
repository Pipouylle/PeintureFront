<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {CalendarComponentStore} from "@/stores";
import {VueDraggableNext} from "vue-draggable-next";
import ListDemiJourOfCalendarComponent from "@/component/calendar2_0/ListDemiJourOfCalendarComponent.vue";

@Component({
   components: ({draggableNext: VueDraggableNext, ListDemiJourOfCalendarComponent})
})
//TODO : mettre un ordre en BD
export default class ListJourOfCalendarComponent extends Vue {
   @Prop({required: true}) jour!: string;
   private CalendarComponentStore = CalendarComponentStore();
}
</script>

<template>
   <v-card>
      <v-card-title>
         {{ jour }}
         <span v-if="jour === 'lundi'"> {{new Date(this.CalendarComponentStore.semaine.dateDebut).toLocaleDateString()}} </span>
      </v-card-title>
      <v-card-item>
         <v-card v-for="(temp, index) in CalendarComponentStore.calendarModel.temp" :key="index">
            <ListDemiJourOfCalendarComponent :jour="jour" :temp="temp" />
         </v-card>
      </v-card-item>
   </v-card>
</template>

<style scoped>

</style>