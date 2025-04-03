<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {Of} from "@/models/types/of";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {avancementStore} from "@/stores/AvancementStore";

@Component({})
export default class TableOf extends Vue {
   @Prop({required: true}) private items!: any[];
   private store = avancementStore();
   private header = [
      {title: 'nom Couche', key: 'nom', sortable: false},
      {title: 'RAL', key: 'ral', sortable: false},
      {title: 'Surface Total Demande', key: 'surfaceDemande', sortable: false},
      {title: 'Pièce Total', key: 'pieceTotal', sortable: false},
      {title: '% déjà réalisé', key: 'pourcentageDemandePrevious', sortable: false},
      {title: 'Surface déjà réalisée', key: 'surfaceDemandePrevious', sortable: false},
      {title: 'Pièce déjà réalisée', key: 'piecePrevious', sortable: false},
      {title: '% réalisé cette semaine', key: 'pourcentageCurent', sortable: false},
      {title: 'heure de regie FP', key: 'regieFP', sortable: false},
      {title: 'heure de regie SFP', key: 'regieSFP', sortable: false},
      {title: 'Surface semaine', key: 'surfaceCurent', sortable: false},
      {title: 'Pièce semaine', key: 'pieceCurent', sortable: false},
      {title: 'Surface Total après validation', key: 'surfaceDemandeAfter', sortable: false},
   ]

   private verifyOf(item: Of | AvancementSurfaceCouche): boolean {
      return item && typeof item === 'object' && 'cabine' in item;
   }

   get formatedItems() {
      return this.items.map((item: Of | AvancementSurfaceCouche) => ({
         ...item,
         nbCouche: this.verifyOf(item) ? undefined : this.store.avancementModel.listOF.find(of => of.avancements.some(couche => couche.id === item.id))?.avancements?.findIndex(c => c.id === item.id)
      }))
   }
}
</script>

<template>
   <v-card>
      <v-data-table-virtual
          :headers="this.header"
          :items="formatedItems"
          variant="outlined"
      >
         <template v-slot:[`item.nom`]="{ item }">
            <span>{{
                  verifyOf(item) ? 'grenaillage' : 'couche n°' + (item.nbCouche + 1)
               }}</span>
         </template>
         <template v-slot:[`item.ral`]="{ item }">
            <span>{{
                  verifyOf(item) ? item.demande.commande.ral : ''
               }}</span>
         </template>
         <template v-slot:[`item.surfaceDemande`]="{ item }">
           <span>{{
                 verifyOf(item) ? item.demande.surface + " m²" : item.surfaceCouches.surface + " m²"
              }}</span>
         </template>
         <template v-slot:[`item.pieceTotal`]="{ item }">
            <span>{{ verifyOf(item) ? item.demande.nombrePiece : '' }}</span>
         </template>
         <template v-slot:[`item.pourcentageDemandePrevious`]="{ item }">
            <span>{{
                  verifyOf(item) ? store.avancementModel.listPrevious.find(previous => previous.demandeId === item.demande.id)?.avancement + ' %' : store.avancementModel.listPrevious.find(previous => previous.demandeId === this.store.avancementModel.listOF.find(of => of.avancements.some(couche => couche.id === item.id))?.demande.id)?.avancementCouche[item.nbCouche ?? 0] + ' %'
               }}</span>
         </template>
         <template v-slot:[`item.surfaceDemandePrevious`]="{ item }">
            <span>{{
                  verifyOf(item) ? Math.floor((store.avancementModel.listPrevious.find(previous => previous.demandeId === item.demande.id)?.avancement ?? 0) * (item.demande.surface ?? 0) / 100) + " m²" : Math.floor((store.avancementModel.listPrevious.find(previous => previous.demandeId === this.store.avancementModel.listOF.find(of => of.avancements.some(couche => couche.id === item.id))?.demande.id)?.avancementCouche[item.nbCouche ?? 0] ?? 0) * (item.surfaceCouches.surface ?? 0) / 100) + " m²"
               }}</span>
         </template>
         <template v-slot:[`item.piecePrevious`]="{ item }">
            <span>{{
                  verifyOf(item) ? Math.floor((store.avancementModel.listPrevious.find(previous => previous.demandeId === item.demande.id)?.avancement ?? 0) * (item.demande.nombrePiece ?? 0) / 100) + " nb" : ''
               }}</span>
         </template>
         <template v-slot:[`item.pourcentageCurent`]="{ item }">
            <v-number-input
                v-if="verifyOf(item) && item.demande.commande.systeme.grenaillage.id !== 0"
                density="comfortable"
                v-model="item.avancement"
                min="0"
            ></v-number-input>
            <v-number-input
               v-else
               density="comfortable"
               v-model="item.avancement"
               min="0"
            ></v-number-input>
         </template>
         <template v-slot:[`item.regieFP`]="{ item }">
            <v-number-input
                v-if="verifyOf(item)"
                density="comfortable"
                v-model="item.regieFP"
                min="0"
            ></v-number-input>
         </template>
         <template v-slot:[`item.regieSFP`]="{ item }">
            <v-number-input
                v-if="verifyOf(item)"
                hide-spin-buttons
                density="comfortable"
                v-model="item.regieSFP"
                min="0"
            ></v-number-input>
         </template>
         <template v-slot:[`item.surfaceCurent`]="{ item }">
            <span>{{
                  verifyOf(item) ? Math.floor(item.avancement * (item.demande.surface ?? 0) / 100) : Math.floor(item.avancement * (item.surfaceCouches.surface ?? 0) / 100)
               }}</span>
         </template>
         <template v-slot:[`item.pieceCurent`]="{ item }">
            <span>{{
                  verifyOf(item) ? Math.floor(item.avancement * (item.demande.nombrePiece ?? 0) / 100) : ''
               }}</span>
         </template>
         <template v-slot:[`item.surfaceDemandeAfter`]="{ item }">
            <span>{{
                  verifyOf(item) ? Math.floor((store.avancementModel.listPrevious.find(previous => previous.demandeId === item.demande.id)?.avancement + item.avancement) * (item.demande.surface ?? 0) / 100) : Math.floor((store.avancementModel.listPrevious.find(previous => previous.demandeId === this.store.avancementModel.listOF.find(of => of.avancements.some(couche => couche.id === item.id))?.demande.id)?.avancementCouche[item.nbCouche ?? 0] ?? 0 + item.avancement) * (item.surfaceCouches.surface ?? 0) / 100)
               }}</span>
         </template>
      </v-data-table-virtual>
   </v-card>
</template>

<style scoped>

</style>