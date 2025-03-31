<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import SelectSemaine from "@/component/usine/SelectSemaine.vue";
import {getSemaineByInfo} from "@/services/SemainesService";
import {createDefaultOf, Of} from "@/models/types/of";
import DialogOfComponent from "@/component/usine/DialogOfComponent.vue";
import {OperateurViewStore} from "@/stores/UsineStore";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listDemandeStore} from "@/stores/DemandeStore";
import {useRoute} from "vue-router";

@Component({
   components: {DialogOfComponent, SelectSemaine}
})

export default class ViewUsineComponent extends Vue {
   private store = OperateurViewStore();
   private header = [
      {title: "Num affaire", value: "numAffaire", sortable: false},
      {title: "Nom affaire", value: "nomAffaire", sortable: false},
      {title: "Num demande", value: "numDemande", sortable: false},
      {title: "Nom Systeme", value: "nomSysteme", sortable: false},
      {title: "Ral", value: "ral", sortable: false},
      {title: 'Réservation', value: "pvPeinture", sortable: false},
      {title: "Commentaire", value: "commentaire", sortable: false},
      {title: "date", value: "dateDemande", sortable: false},
   ]
   private selectedOf = createDefaultOf();
   private route = useRoute();
   private intervalId: number | null = null;

   mounted() {
      this.fetchData();
      this.store.usineModel.cabine = 'cabine ' + this.route.query.cabine;
      this.intervalId = window.setInterval(this.fetchData, 60000);
   }

   unmounted() {
      console.log("Unmounted");
      if (this.intervalId) {
         clearInterval(this.intervalId);
         this.intervalId = null;
      }
   }
   private async fetchData() {
      console.log('je fait un fetch')
      this.store.unLoad();
      await this.store.load();
      await this.store.setJour(new Date(this.store.usineModel.date).toISOString());
   }

   get getJour() {
      return this.store.usineModel.jour + ' - ' + new Date(this.store.usineModel.date).toLocaleDateString();
   }

   get getOf() {
      return this.store.getOfBytempAndJour();
   }

   private setOf(temp: string) {
      this.store.usineModel.temp = temp;
   }

   async setOfCabine(cabine: string) {
      this.store.usineModel.cabine = cabine;
      if (this.store.usineModel.cabine != '') {
         this.store.usineModel.semaine = await getSemaineByInfo(this.store.usineModel.semaine);
         await this.store.setOf();
      }
   }

   private openDialog(event: any) {
      const index = event.currentTarget?.rowIndex;

      if (index !== undefined && index >= 0) {
         this.selectedOf = this.getOf[index - 2];
         this.store.dialog = true;
      } else {
         console.error("❌ Impossible de récupérer l'élément");
      }
   }

   private async forceReload() {
      window.location.reload();
   }
}
</script>

<template>
   <v-dialog
       v-model="this.store.dialog"
       max-height="1000px"
       min-height="700px"
   >
      <DialogOfComponent :item="this.selectedOf"/>
   </v-dialog>
   <v-card class="h-screen container">
      <v-card class="modifJour">
         <v-row>
            <v-col cols="4">
               <v-row justify="space-between" class="ma-3">
                  <v-btn @click="store.previousJour" size="x-large">
                     <v-icon>mdi-arrow-left-bold</v-icon>
                  </v-btn>
                  <v-text-field
                      readonly
                      v-model="getJour"
                      outlined
                      dense
                      class="select text-h3 w-auto">
                  </v-text-field>
                  <v-btn @click="store.nextJour" size="x-large">
                     <v-icon>mdi-arrow-right-bold</v-icon>
                  </v-btn>
               </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <span class="text-h2 buttonGroup">{{ this.store.usineModel.cabine }}</span>
            <v-spacer si></v-spacer>
            <v-col cols="2" class="buttonGroup">
               <v-btn size="x-large" variant="outlined" @click="forceReload">Relancer</v-btn>
            </v-col>
         </v-row>
      </v-card>
      <v-card class="table">
         <v-data-table-virtual
             :items="getOf"
             :headers="header"
             :height="800"
             @click:row="openDialog"
             class="text-h5"
         >
            <template v-slot:[`item.numAffaire`]="{ item }">
               <span> {{
                  item.demande.commande.affaire.id
                  }} </span>
            </template>
            <template v-slot:[`item.nomAffaire`]="{ item }">
               <span> {{
                     item.demande.commande.affaire.nom
                  }} </span>
            </template>
            <template v-slot:[`item.numDemande`]="{ item }">
               <span> {{
                     item.demande.numero
                  }} </span>
            </template>
            <template v-slot:[`item.nomSysteme`]="{ item }">
               <span> {{
                  item.demande.commande.systeme.nom
                  }} </span>
            </template>
            <template v-slot:[`item.ral`]="{ item }">
               <span> {{
                  item.demande.commande.ral
                  }} </span>
            </template>
            <template v-slot:[`item.pvPeinture`]="{ item }">
               <v-icon v-if="item.demande.reservation" color="red" size="x-large">mdi-close</v-icon>
            </template>
            <template v-slot:[`item.commentaire`]="{ item }">
               <span> {{
                  item.demande.commentaire
                  }} </span>
            </template>
            <template v-slot:[`item.dateDemande`]="{ item }">
               <span> {{
                     new Date(item.demande.date).toLocaleDateString()
                  }} </span>
            </template>
         </v-data-table-virtual>
      </v-card>
   </v-card>
</template>

<style scoped>
.container {
   position: fixed;
   right: 0;
   top: 0;
   width: 97vw;
   z-index: 1000;
   border: #0b0e0d solid 1px;
}

.modifJour {
   position: fixed;
   left: 3vw;
   top: 3vh;
   height: 10vh;
   width: 95vw;
   z-index: 1000;
   padding-right: 1vw;
}

.table {
   top: 14vh;
}

.buttonGroup {
   margin-top: 3vh;
}
</style>