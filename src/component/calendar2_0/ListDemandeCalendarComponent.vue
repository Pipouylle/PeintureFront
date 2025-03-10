<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {VueDraggableNext} from 'vue-draggable-next'
import DemandeCalendarDraggableComponent from "@/component/calendar2_0/DemandeCalendarDraggableComponent.vue";
import {planingStore} from "@/stores/PlainingStore";

@Component({
   components: {
      DemandeCalendarDraggableComponent,
      draggableNext: VueDraggableNext
   }
})

export default class ListDemandeCalendarComponent extends Vue {
   private store = planingStore();

   cloneDemande(demande: any) {
      this.store.planingModel.demandeClone = demande;
      return { ...demande };
   }


}
</script>

<template>
   <v-card class="calendar-container">
      <v-card>
         <v-card>
            <v-row>
               <v-col v-for="(head, index) in store.planingModel.headerListDemande" :key="index">
                  {{ head.title }}
               </v-col>
            </v-row>
         </v-card>
         <v-card>
            <v-list-item class="">
               <draggable
                   :list="store.planingModel.listDemande"
                   :group="{ name: 'demande', pull: 'clone', put: false }"
                   :clone="cloneDemande"
                   @start="dragging = true"
                   @end="dragging = false"
               >
                  <template #item="{ element }">
                     <DemandeCalendarDraggableComponent :item="element"
                                                        :header="store.planingModel.headerListDemande"/>
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