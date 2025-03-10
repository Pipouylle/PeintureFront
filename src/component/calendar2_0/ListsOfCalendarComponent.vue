<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import ListJourOfCalendarComponent from "@/component/calendar2_0/ListJourOfCalendarComponent.vue";
import {planingStore} from "@/stores/PlainingStore";

@Component({
   components: {ListJourOfCalendarComponent}
})
export default class ListsOfCalendarComponent extends Vue {
   private store = planingStore();
}
</script>

<template>
   <v-card class="overflow-auto listJour">
      <v-list
          v-for="(jour , index) in store.planingModel.jour" :key="index"
      >
         <ListJourOfCalendarComponent :jour="jour"/>
      </v-list>
   </v-card>
</template>

<style scoped>
.listJour {
   height: 89vh;
}
</style>