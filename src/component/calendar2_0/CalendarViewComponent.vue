<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import SelectSemaine from "@/component/calendar/SelectSemaine.vue";
import SelectSemaineComponent from "@/component/calendar2_0/SelectSemaineComponent.vue";
import ListCommandeComponent from "@/component/lists/ListCommandeComponent.vue";
import ListsOfCalendarComponent from "@/component/calendar2_0/ListsOfCalendarComponent.vue";
import ListDemandeCalendarComponent from "@/component/calendar2_0/ListDemandeCalendarComponent.vue";
import {CalendarComponentStore, useListStore} from "@/stores";

@Component({
   components: {
      ListCommandeCalendarComponent: ListDemandeCalendarComponent,
      ListsOfCalendarComponent, ListCommandeComponent, SelectSemaineComponent, SelectSemaine}
})
//TODO : verif qu'il ai pas deux of le même jour
//TODO : if pour l'affcihage du bas par apport a la semaine
export default class CalendarViewComponent extends Vue {
   private CalendarCompoenentStore = CalendarComponentStore();
   mounted() {
      useListStore().setDemandesCalendar();
   }
}
</script>

<template>
   <v-card elevation="3" class="calendar-container">
      <v-row class="align-center fixed-select-semaine">
         <SelectSemaineComponent class="semaine"/>
      </v-row>
      <v-row class="content" v-if="CalendarCompoenentStore.calendarModel.cabine">
         <v-col>
            <ListCommandeCalendarComponent class="ListCommande"/>
         </v-col>
         <v-col>
            <ListsOfCalendarComponent class="ListsOf"/>
         </v-col>
      </v-row>
   </v-card>
</template>

<style scoped>
.calendar-container {
   position: absolute;
   top: 10px;
   right: 10px;
   width: 84vw;
   height: calc(100vh - 20px);
}
.content {
   position: absolute;
   top: calc(5vh);
   left: 10px;
}
.semaine {
   height: 5vh;
}
.ListCommande {
   height: 89vh;
   width: calc(42vw - 15px);
}
.ListsOf {
   position: absolute;
   left: calc(42vw + 5px);
   width: calc(42vw - 5px);
   height: 89vh;
}
</style>