<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';

import {VueDraggableNext} from "vue-draggable-next";
import DemandeCalendarDraggableComponent from "@/component/calendar2_0/DemandeCalendarDraggableComponent.vue";

@Component({components: {DemandeCalendarDraggableComponent, draggableNext: VueDraggableNext}})
export default class TableDraggable extends Vue {
   @Prop({required: true}) private items!: any[];
   @Prop({required: true}) private header!: { title: string, value: string }[];
   @Prop({required: true}) private group!: string;

   private onMove(event: any) {
      console.log(event);
   }
}
</script>

<template>
   <v-card>
      <v-card>
         <v-row>
            <v-col v-for="(head, index) in header" :key="index">
               {{ head.title }}
            </v-col>
         </v-row>
      </v-card>
      <v-card>
         <v-list-item class="">
            <draggable
                :list="items"
                :group="group"
                :move="onMove"
                @start="dragging = true"
                @end="dragging = false"
            >
               <template #item="{ element }">
                  <DemandeCalendarDraggableComponent :item="element" :header="header"/>
               </template>
            </draggable>
         </v-list-item>
      </v-card>
   </v-card>
</template>

<style scoped>

</style>