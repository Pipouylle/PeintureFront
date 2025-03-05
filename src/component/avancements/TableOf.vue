<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {Of} from "@/models/types/of";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {avancementStore} from "@/stores/AvancementStore";

@Component({})
export default class TableOf extends Vue {
   @Prop({required: true}) private items!: Of[];
   private store = avancementStore();
   private header = [
      {title: 'RAL', key: 'ral'},
      {title: 'Surface Total Demande', key: 'surfaceDemande', sortable: false},
      {title: 'Pièce Total', key: 'pieceTotal', sortable: false},
      {title: '% déjà réaliser', key: 'pourcentageDemandePrevious', sortable: false},
      {title: 'Surface déjà réaliser', key: 'surfaceDemandePrevious', sortable: false},
      {title: 'Pièce déjà réaliser', key: 'piecePrevious', sortable: false},
      {title: '% réaliser aujoud\'hui', key: 'pourcentageCurent', sortable: false},
      {title: 'heure de regie FP', key: 'regieFP', sortable: false},
      {title: 'heure de regie SFP', key: 'regieSFP', sortable: false},
      {title: 'Surface aujoud\'hui', key: 'surfaceCurent', sortable: false},
      {title: 'Pièce aujoud\'hui', key: 'pieceCurent', sortable: false},
      {title: 'Surface Total après validation', key: 'surfaceDemandeAfter', sortable: false},
   ]
   //TODO: changer le les qrcode car trop le int est trop long
   //TODO: mettre la regie et avancemnt_of devient pour l'avancement du grenaillage
   //TODO: remplir la listPresious
   async mounted() {
   }
}
</script>

<template>
   <v-card>
      <v-data-table-virtual
          :headers="this.header"
          :items="this.items"
          variant="outlined"
      >
         <template v-slot:[`item.ral`]="{ item }">
            <span>{{
                  store.avancementModel.listCommande.find(commande => commande.id === store.avancementModel.listDemande.find(demande => demande.id === item.demande.id)?.commande.id)?.ral
               }}</span>
         </template>
         <template v-slot:[`item.surfaceDemande`]="{ item }">
           <span>{{
                 store.avancementModel.listDemande.find(demande => demande.id === item.demande.id)?.surface
              }}</span>
         </template>
         <template v-slot:[`item.pieceTotal`]="{ item }">
            <span>{{ store.avancementModel.listDemande.find(demande => demande.id === item.demande.id)?.nombrePiece }}</span>
         </template>
         <template v-slot:[`item.pourcentageDemandePrevious`]="{ item }">
            <span>{{ store.avancementModel.listPrevious.find(previous => previous.ofId === item.id)?.avancement + ' %' }}</span>
         </template>
         <template v-slot:[`item.surfaceDemandePrevious`]="{ item }">
            <span>{{ ((store.avancementModel.listPrevious.find(previous => previous.ofId === item.id)?.avancement ?? 0) * (store.avancementModel.listDemande.find(demande => demande.id === item.demande.id)?.surface ?? 0) / 100) + " m²" }}</span>
         </template>
         <template v-slot:[`item.piecePrevious`]="{ item }">
            <span>{{ ((store.avancementModel.listPrevious.find(previous => previous.ofId === item.id)?.avancement ?? 0) * (store.avancementModel.listDemande.find(demande => demande.id === item.demande.id)?.nombrePiece ?? 0) / 100) + " nb" }}</span>
         </template>
         <template v-slot:[`item.pourcentageCurent`]="{ item }">
            <v-number-input
               density="comfortable"
               v-model="item.avancement"
            ></v-number-input>
         </template>
         <template v-slot:[`item.regieFP`]="{ item }">
            <v-number-input
                density="comfortable"
                v-model="item.regieFP"
            ></v-number-input>
         </template>
         <template v-slot:[`item.regieSFP`]="{ item }">
            <v-number-input
                density="comfortable"
                v-model="item.regieSFP"
            ></v-number-input>
         </template>
         <template v-slot:[`item.surfaceCurent`]="{ item }">
           <span>{{ store.avancementModel.listPrevious.find(previous => previous.ofId === item.id)?.avancement + item.avancement}}</span>
         </template>
         <template v-slot:[`item.pieceCurent`]="{ item }">
            <span>{{ "TODO" }}</span>
         </template>
         <template v-slot:[`item.surfaceDemandeAfter`]="{ item }">
            <span>{{ "TODO" }}</span>
         </template>
      </v-data-table-virtual>
   </v-card>
</template>

<style scoped>

</style>