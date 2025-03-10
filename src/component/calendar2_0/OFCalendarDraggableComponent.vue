<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {planingStore} from "@/stores/PlainingStore";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";

@Component({})
export default class OFCalendarDraggableComponent extends Vue {
   @Prop({required: true}) private item!: any;
   @Prop({required: true}) private header!: {title: string, value: string}[];

   private store = planingStore();
   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private deleteOfCalendar() {
      this.store.deleteOf(this.item.id);
   }

}
</script>

<template>
   <v-card class="card">
      <v-row class="row" justify="space-around" align="center">
         <v-col v-for="(head, index) in header" :key="index" class="col">
            <v-icon v-if="head.value == 'drag'" class="colIcon"> mdi-drag-vertical</v-icon>
            <span v-else-if="head.value == 'idDemandeOf.numeroAffaire'" >{{
                  affaireStore.listAffaire.affaires.find(affaire => affaire.id === commandeStore.listCommande.commandes.find(commande => commande.id === store.planingModel.listDemande.find(demande => demande.id === item.demande.id)?.commande.id)?.affaire.id)?.numero
            }}</span>
            <span v-else-if="head.value == 'idDemandeOf.nomAffaire'" >{{
                  affaireStore.listAffaire.affaires.find(affaire => affaire.id === commandeStore.listCommande.commandes.find(commande => commande.id === store.planingModel.listDemande.find(demande => demande.id === item.demande.id)?.commande.id)?.affaire.id)?.nom
               }}</span>
            <span v-else-if="head.value == 'idDemandeOf.numeroDemande'" >{{
                  store.planingModel.listDemande.find(demande => demande.id === item.demande.id)?.numero
            }}</span>
            <span v-else-if="head.value == 'idDemandeOf.nomSysteme'" >{{
                  systemeStore.listSysteme.systemes.find(systeme => systeme.id === commandeStore.listCommande.commandes.find(commande => commande.id === store.planingModel.listDemande.find(demande => demande.id === item.demande.id)?.commande.id)?.systeme.id)?.nom
            }}</span>
            <span v-else-if="head.value == 'idDemandeOf.surfaceDemande'" >{{
                  store.planingModel.listDemande.find(demande => demande.id === item.demande.id)?.surface
               }}</span>
            <span v-else-if="head.value == 'idDemandeOf.dateDemande'" >{{
                  new Date(store.planingModel.listDemande.find(demande => demande.id === item.demande.id)?.date ?? new Date().toISOString()).toLocaleDateString()
               }}</span>
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