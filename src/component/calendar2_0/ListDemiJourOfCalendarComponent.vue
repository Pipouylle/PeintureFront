<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import OFCalendarDraggableComponent from "@/component/calendar2_0/OFCalendarDraggableComponent.vue";
import {planingStore} from "@/stores/PlainingStore";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {createDefaultDemande, Demande} from "@/models/types/demande";
import {createDefaultOf, Of} from "@/models/types/of";
import NotificationHandler from "@/services/NotificationHandler";

@Component({
   components: {OFCalendarDraggableComponent}
})
export default class ListDemiJourOfCalendarComponent extends Vue {
   @Prop({required: true}) private temp!: string;
   @Prop({required: true}) private jour!: string;

   private store = planingStore();
   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();

   get getOfForDay(): Of[] {
      return this.store.getOfByDemiJour(this.jour, this.temp);
   }

   private onClone(of: any){
      this.store.planingModel.ofClone = of;
      return { ...of };
   }

   private onDrop(event: any) {
      const demande = this.store.planingModel.demandeClone;
      const ofClone = this.store.planingModel.ofClone;
      const existList: Of[] = this.getOfForDay;
      const existForDemande = existList.find((of: Of) => of.demande.id === demande.id && of.jour === this.jour);
      const existForOF = existList.find((of: Of) => of.demande.id === ofClone.demande.id && of.jour === this.jour && of.temp === this.temp);
      if (!existForDemande && demande.id !== 0) {
         this.store.creerOfCalendar(demande.id, this.jour, this.temp);
         NotificationHandler.showNewNotification('Of créer avec succes');
         this.store.updateOrderOfCalendar(this.jour, this.getOfForDay);
      } else if (!existForOF && ofClone.id !== 0) {
         if (ofClone.jour !== this.jour || ofClone.temp !== this.temp) {
            this.store.updateOfCalendar(ofClone.id ?? createDefaultOf().id, this.jour, this.temp);
         }
      }
      this.store.planingModel.demandeClone = createDefaultDemande();
      this.store.planingModel.ofClone = createDefaultOf();
   }

   private async onMove(newList: any) {
      await this.store.updateOrderOfCalendar(this.jour, newList);
      NotificationHandler.showNewNotification('Ordre mise a jour');
   }
}
</script>

<template>
   <v-card>
      <v-card-title>{{ temp }}</v-card-title>
      <v-card-item>
         <v-card>
            <v-list-item class="">
               <draggable
                   v-model="getOfForDay"
                   :clone="onClone"
                   :group="{name :'demande'}"
                   @add="onDrop"
                   @update:modelValue="onMove"
               >
                  <template #item="{ element }">
                     <OFCalendarDraggableComponent :item="element"
                                                   :header="store.planingModel.headerListOf"/>
                  </template>
               </draggable>
            </v-list-item>
         </v-card>
      </v-card-item>
   </v-card>
</template>

<style scoped>

</style>