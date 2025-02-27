<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {useCalendar} from "@/stores";

@Component({})
export default class OFCalendarDraggableComponent extends Vue {
   @Prop({required: true}) private item!: any;
   @Prop({required: true}) private header!: {title: string, value: string}[];
   private dialog = false;

   private deleteOfCalendar() {
      useCalendar().deletOf(this.item.id);
   }

}
</script>

<template>
   <v-card class="card">
      <v-row class="row" justify="space-around" align="center">
         <v-col v-for="(head, index) in header" :key="index" class="col">
            <v-icon v-if="head.value == 'drag'" class="colIcon"> mdi-drag-vertical</v-icon>
            <span v-else>{{head.value == "idDemandeOf.dateDemande" ? new Date(item[head.value.split('.')[0]][head.value.split('.')[1]]).toLocaleDateString() : item[head.value.split('.')[0]][head.value.split('.')[1]] }}</span>
         </v-col>
         <v-col>
            <v-btn color="error" @click="deleteOfCalendar">
               <v-icon >mdi-information-box</v-icon>
            </v-btn>
         </v-col>
      </v-row>
   </v-card>
</template>

<style scoped>
</style>