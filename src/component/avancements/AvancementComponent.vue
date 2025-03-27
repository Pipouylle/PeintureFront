<script lang="ts">
import {ref} from 'vue'
import {Vue, Component} from 'vue-facing-decorator';
import SelectJourComponent from "@/component/avancements/SelectJourComponent.vue";
import {avancementStore} from "@/stores/AvancementStore";
import {Of} from "@/models/types/of";
import TableOf from "@/component/avancements/TableOf.vue";
import NotificationHandler from "@/services/NotificationHandler";

@Component({
   components: {TableOf, SelectJourComponent}
})
export default class AvancementComponent extends Vue {
   private store = avancementStore();

   async mounted() {
      await this.store.load();
   }

   async handleUpdateOf() {
      if (await this.store.updateOf()) {
         NotificationHandler.showNewNotification('l\'avancement a été mit a jour');
         this.store.isLoad = false;
         await this.store.load();
      } else {
         NotificationHandler.showNewNotification('cela n\'as pas été mit a jour', true);
      }
   }
}
</script>

<template>
   <v-card>
      <v-card-title>
         <SelectJourComponent @updateOf="handleUpdateOf"/>
      </v-card-title>
      <v-card-text class="overflow-auto card">
         <v-list>
            <v-list-item v-for="(affaire: Affaire) in store.avancementModel.listAffaire.filter(affaire =>
               store.avancementModel.listCommande.some(commande => commande.affaire.id === affaire.id &&
                  store.avancementModel.listDemande.some(demande => demande.commande.id === commande.id &&
                     store.avancementModel.listOF.some(of =>
                      of.demande.id === demande.id &&
                      of.cabine === store.avancementModel.cabine &&
                      of.temp === store.avancementModel.temp))))"
                         :key="affaire.id">
               <v-list-group variant="outlined">
                  <template v-slot:activator="{ props }">
                     <v-list-item
                         v-bind="props"
                         :title="affaire.nom + ' - ' + affaire.numero"
                     ></v-list-item>
                  </template>
                  <v-list-item
                      v-for="(demande: Demande) in store.avancementModel.listDemande.filter(
                  demande => store.avancementModel.listCommande.some(
                      commande => commande.affaire.id === affaire.id && commande.id === demande.commande.id && store.avancementModel.listOF.some(
                          of => of.demande.id === demande.id && of.cabine === store.avancementModel.cabine && of.temp === store.avancementModel.temp)))"
                      :key="demande.id">
                     <v-list-group variant="outlined">
                        <template v-slot:activator="{ props }">
                           <v-list-item
                               v-bind="props"
                               :title="demande.numero + ' - ' + this.store.avancementModel.listSysteme.find(systeme => systeme.id === this.store.avancementModel.listCommande.find(commande => commande.id === demande.commande.id)?.systeme.id)?.nom"
                           ></v-list-item>
                        </template>
                        <TableOf :items="[this.store.avancementModel.listOF.filter(of => of.demande.id === demande.id && of.cabine === store.avancementModel.cabine && of.temp === store.avancementModel.temp)[0]]"/>
                     </v-list-group>
                  </v-list-item>
               </v-list-group>
            </v-list-item>
         </v-list>
      </v-card-text>
   </v-card>
   <v-card class="bottom-0 w-100 ma-3" position="absolute">
      <v-row class="w-100" align-content="left">
         <v-col cols="12" class="right-0">
            <v-btn color="green" @click="handleUpdateOf" size="x-large" class="right-0 bottom-0 pa-5 ma-5"> Valider </v-btn>
         </v-col>
      </v-row>
   </v-card>
</template>

<style scoped>
.card{
   max-height: 76vh;
}
</style>