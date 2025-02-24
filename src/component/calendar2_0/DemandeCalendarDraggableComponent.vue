<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';

@Component({})
export default class DemandeCalendarDraggableComponent extends Vue {
 @Prop({required: true}) private item!: any;
 @Prop({required: true}) private header!: {title: string, value: string}[];
}
</script>

<template>
   <v-card class="card">
      <v-row class="row" justify="space-around" align="center">
         <v-col v-for="(head, index) in header" :key="index" class="col">
            <v-icon v-if="head.value == 'drag'" class="colIcon"> mdi-drag-vertical</v-icon>
            <span v-else>{{head.value == "dateDemande" ? item[head.value].split("T")[0] : item[head.value] }}</span>
         </v-col>
      </v-row>
   </v-card>
</template>

<style scoped>
.card {
   width: calc(44vw);
}
.row {
   cursor: move;
   width: calc(42vw);
}
.col {
   padding-left: 0;
   height: 8vh;
}
.colIcon {
   cursor: move;
   font-size: 1.5em;
   width: 1vw;
}
</style>