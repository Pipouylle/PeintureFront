<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ViewUsineStore} from "@/stores";
import SelectSemaine from "@/component/usine/SelectSemaine.vue";
import {getSemaineByInfo} from "@/services/SemainesService";
import {createDefaultOf, Of} from "@/models/types/of";
import DialogOfComponent from "@/component/usine/DialogOfComponent.vue";

@Component({
   components: {DialogOfComponent, SelectSemaine}
})

//TODO : ça bug sur le dimanche quand je click sur les fleche
export default class ViewUsineComponent extends Vue {
   private UsineStore = ViewUsineStore();
   private header = [
      {title: "Num affaire", value: "numAffaire", sortable: false},
      {title: "Nom affaire", value: "nomAffaire", sortable: false},
      {title: "Num demande", value: "numDemande", sortable: false},
      {title: "Nom Systeme", value: "nomSysteme", sortable: false},
      {title: "Ral", value: "ral", sortable: false},
      {title: "Surface", value: "surface", sortable: false},
      {title: "Nb pièce", value: "nbPiece", sortable: false},
      {title: "Commentaire", value: "commentaire", sortable: false},
      {title: "date", value: "dateDemande", sortable: false},
   ]
   private dialog: boolean = false;
   private selectedOf = createDefaultOf();

   mounted() {
      this.UsineStore.load();
   }

   get getJour() {
      return this.UsineStore.usineModel.jour + ' - ' + new Date(this.UsineStore.usineModel.date).toLocaleDateString();
   }

   get getOf() {
      return this.UsineStore.getOfBytempAndJour();
   }

   private setOf(temp: string) {
      this.UsineStore.usineModel.temp = temp;
   }

   async setOfCabine(cabine: string) {
      this.UsineStore.usineModel.cabine = cabine;
      if (this.UsineStore.usineModel.cabine != '') {
         this.UsineStore.usineModel.semaine = await getSemaineByInfo(this.UsineStore.usineModel.semaine);
         await this.UsineStore.setOf();
      }
   }

   private openDialog(event: any) {
      const index = event.currentTarget?.rowIndex;

      if (index !== undefined && index >= 0) {
         this.selectedOf = this.getOf[index - 2];
         this.dialog = true;
      } else {
         console.error("❌ Impossible de récupérer l'élément");
      }
   }
}
</script>

<template>
   <v-dialog
       v-model="dialog"
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
                  <v-btn @click="UsineStore.previousJour" size="x-large">
                     <v-icon>mdi-arrow-left-bold</v-icon>
                  </v-btn>
                  <v-text-field
                      readonly
                      v-model="getJour"
                      outlined
                      dense
                      class="select text-h3 w-auto">
                  </v-text-field>
                  <v-btn @click="UsineStore.nextJour" size="x-large">
                     <v-icon>mdi-arrow-right-bold</v-icon>
                  </v-btn>
               </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn-group v-for="(cabine, index) in this.UsineStore.usineModel.cabines" :key="index"
                         class="buttonGroup">
               <v-btn
                   :color="this.UsineStore.usineModel.cabine === cabine ? 'blue' : 'grey'"
                   variant="outlined"
                   @click="this.setOfCabine(cabine)"
                   class="text-h5"
               >{{ cabine }}
               </v-btn>
            </v-btn-group>
            <v-spacer si></v-spacer>
            <v-btn-group v-for="(temp, index) in UsineStore.usineModel.temps" :key="index" class="buttonGroup">
               <v-btn
                   :color="UsineStore.usineModel.temp === temp ? 'blue' : 'grey'"
                   @click="setOf(temp)"
                   variant="outlined"
                   :active="this.UsineStore.usineModel.temp === temp"
                   class="text-h5"
               >{{ temp }}
               </v-btn>
            </v-btn-group>
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
                     this.UsineStore.listAffaire.affaires.find(affaire => affaire.id === this.UsineStore.listCommande.commandes.find(commande => commande.id === this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.commande.id)?.affaire.id)?.numero
                  }} </span>
            </template>
            <template v-slot:[`item.nomAffaire`]="{ item }">
               <span> {{
                     this.UsineStore.listAffaire.affaires.find(affaire => affaire.id === this.UsineStore.listCommande.commandes.find(commande => commande.id === this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.commande.id)?.affaire.id)?.nom
                  }} </span>
            </template>
            <template v-slot:[`item.numDemande`]="{ item }">
               <span> {{
                     this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.numero
                  }} </span>
            </template>
            <template v-slot:[`item.nomSysteme`]="{ item }">
               <span> {{
                     this.UsineStore.listSysteme.systemes.find(systeme => systeme.id === this.UsineStore.listCommande.commandes.find(commande => commande.id === this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.commande.id)?.systeme.id)?.nom
                  }} </span>
            </template>
            <template v-slot:[`item.ral`]="{ item }">
               <span> {{
                     this.UsineStore.listCommande.commandes.find(commande => commande.id === this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.commande.id)?.ral
                  }} </span>
            </template>
            <template v-slot:[`item.surface`]="{ item }">
               <span> {{
                     this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.surface
                  }} </span>
            </template>
            <template v-slot:[`item.nbPiece`]="{ item }">
               <span> {{
                     this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.nombrePiece
                  }} </span>
            </template>
            <template v-slot:[`item.commentaire`]="{ item }">
               <span> {{
                     this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.commentaire
                  }} </span>
            </template>
            <template v-slot:[`item.dateDemande`]="{ item }">
               <span> {{
                     new Date(this.UsineStore.listDemande.demandes.find(demande => demande.id === item.demande.id)?.date ?? "").toLocaleDateString()
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