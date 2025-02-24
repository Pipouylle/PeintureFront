<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {useCalendar} from "@/stores";
import MoreInfoOfCalendarComponent from "@/component/calendar2_0/MoreInfoOfCalendarComponent.vue";

@Component({
   components: {MoreInfoOfCalendarComponent}
})
export default class OFCalendarDraggableComponent extends Vue {
   @Prop({required: true}) private item!: any;
   @Prop({required: true}) private header!: {title: string, value: string}[];
   private dialog = false;

}
</script>

<template>
   <v-dialog v-if="dialog">
      <MoreInfoOfCalendarComponent :item="item"/>
   </v-dialog>
   <v-card class="card">
      <v-row class="row" justify="space-around" align="center">
         <v-col v-for="(head, index) in header" :key="index" class="col">
            <v-icon v-if="head.value == 'drag'" class="colIcon"> mdi-drag-vertical</v-icon>
            <span v-else>{{head.value == "idDemandeOf.dateDemande" ? new Date(item[head.value.split('.')[0]][head.value.split('.')[1]]).toLocaleDateString() : item[head.value.split('.')[0]][head.value.split('.')[1]] }}</span>
         </v-col>
         <v-col>
            <v-btn color="blue" @click="dialog = !dialog">
               <v-icon >mdi-information-box</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-card>
</template>

<style scoped>
</style>