<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {VueDraggableNext} from "vue-draggable-next";
import ListDemiJourOfCalendarComponent from "@/component/calendar2_0/ListDemiJourOfCalendarComponent.vue";
import {planingStore} from "@/stores/PlainingStore";

@Component({
   components: ({draggableNext: VueDraggableNext, ListDemiJourOfCalendarComponent})
})
export default class ListJourOfCalendarComponent extends Vue {
   @Prop({required: true}) jour!: string;
   private store = planingStore();
}
</script>

<template>
   <v-card>
      <v-card-title>
         {{ jour }}
         <span> {{new Date(new Date(this.store.planingModel.semaine.dateDebut).setDate(new Date(this.store.planingModel.semaine.dateDebut).getDate() + store.planingModel.jour.indexOf(jour))).toLocaleDateString()}} </span>
      </v-card-title>
      <v-card-item>
         <v-card v-for="(temp, index) in store.planingModel.temp" :key="index">
            <ListDemiJourOfCalendarComponent :jour="jour" :temp="temp" />
         </v-card>
      </v-card-item>
   </v-card>
</template>

<style scoped>

</style>