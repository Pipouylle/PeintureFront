<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {VueDraggableNext} from "vue-draggable-next";
import {planingStore} from "@/stores/PlainingStore";
import {createDefaultOf, Of} from "@/models/types/of";
import NotificationHandler from "@/services/NotificationHandler";
import {createDefaultDemande} from "@/models/types/demande";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listDemandeStore} from "@/stores/DemandeStore";
import OFCalendarDraggableComponent from "@/component/calendar2_0/OFCalendarDraggableComponent.vue";

@Component({
   components: ({draggableNext: VueDraggableNext, OFCalendarDraggableComponent})
})
export default class ListJourOfCalendarComponent extends Vue {
   @Prop({required: true}) jour!: string;
   private store = planingStore();

   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private demandeStore = listDemandeStore();

   get getOfForDay(): Of[] {
      return this.store.getOfByDemiJour(this.jour);
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
      const existForOF = existList.find((of: Of) => of.demande.id === ofClone.demande.id && of.jour === this.jour);
      if (!existForDemande && demande.id !== 0) {
         this.store.creerOfCalendar(demande.id, this.jour);
         NotificationHandler.showNewNotification('Of créer avec succes');
         this.store.updateOrderOfCalendar(this.jour, this.getOfForDay);
      } else if (!existForOF && ofClone.id !== 0) {
         if (ofClone.jour !== this.jour) {
            this.store.updateOfCalendar(ofClone.id ?? createDefaultOf().id, this.jour);
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
      <v-card-title>
         {{ jour }}
         <span> {{new Date(new Date(this.store.planingModel.semaine.dateDebut).setDate(new Date(this.store.planingModel.semaine.dateDebut).getDate() + store.planingModel.jour.indexOf(jour))).toLocaleDateString()}} </span>
      </v-card-title>
      <v-card-item>
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
      </v-card-item>
   </v-card>
</template>

<style scoped>

</style>