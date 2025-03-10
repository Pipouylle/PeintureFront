<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";

@Component({})
export default class DemandeCalendarDraggableComponent extends Vue {
   @Prop({required: true}) private item!: any;
   @Prop({required: true}) private header!: { title: string, value: string }[];
   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
}
</script>

<template>
   <v-card class="card">
      <v-row class="row" justify="space-around" align="center">
         <v-col v-for="(head, index) in header" :key="index" class="col">
            <v-icon v-if="head.value == 'drag'" class="colIcon"> mdi-drag-vertical</v-icon>
            <span v-else-if="head.value == 'numeroAffaire'"> {{
                  affaireStore.listAffaire.affaires.find(affaire => affaire.id === commandeStore.listCommande.commandes.find(commande => commande.id === item.commande.id)?.affaire.id)?.numero
               }} </span>
            <span v-else-if="head.value == 'nomAffaire'"> {{
                  affaireStore.listAffaire.affaires.find(affaire => affaire.id === commandeStore.listCommande.commandes.find(commande => commande.id === item.commande.id)?.affaire.id)?.nom
               }} </span>
            <span v-else-if="head.value == 'numeroDemande'"> {{
                  item['numero']
               }} </span>
            <span v-else-if="head.value == 'nomSysteme'"> {{
                  systemeStore.listSysteme.systemes.find(systeme => systeme.id === commandeStore.listCommande.commandes.find(commande => commande.id === item.commande.id)?.systeme.id)?.nom
               }} </span>
            <span v-else-if="head.value == 'surfaceDemande'"> {{
                    item['surface']
               }}</span>
            <span v-if="head.value == 'dateDemande'"> {{ item['date'].split("T")[0] }} </span>
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