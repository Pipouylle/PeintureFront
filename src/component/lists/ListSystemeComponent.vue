<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {deleteSysteme} from "@/services/SystemesService";
import {Couche} from "@/models/types/couche";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
import {listSystemeStore, updateSystemeStore} from "@/stores/SystemeStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import {listGrenaillageStore} from "@/stores/GrenaillageStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})


//TODO: modification des fournisseur
export default class ListSystemeComponent extends Vue {
   private store = listSystemeStore();
   private fournisseurStore = listFournisseurStore();
   private grenaillageStore = listGrenaillageStore();
   private modifStore = updateSystemeStore();
   private router = useRouter();
   private selectedCouches: Record<number, Couche> = {};
   private header = [
      {title: 'Nom', value: 'nom'},
      {title: 'Fournisseur', value: 'nomFournisseur'},
      {title: 'Grenaillage', value: 'grenaillage.nom'},
      {title: 'Type', value: 'type'},
      {title: 'Couche', value: 'couches'},
      {title: 'Detail Couche', value: 'detailCouche'},
      {title: 'Actions', value: 'actions', sortable: false, align: 'end'}
   ]



   async mounted() {
      await this.store.load();
   }

   async reload() {
      this.store.unLoad();
      await this.store.load();
   }

   async deleteSysteme(item: any) {
      if (await this.store.delete(item)) {
         NotificationHandler.showNewNotification('Systeme supprimé avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la suppression du systeme.', true);
         await this.reload();
      }
   }

   editSysteme(item: any) {
      this.modifStore.systemeModif.systeme = JSON.parse(JSON.stringify(item));
      this.router.push({name: 'modifSysteme'});
   }

   onCoucheSelected(systemeId: number, couche: Couche) {
      this.selectedCouches[systemeId] = couche; // Stockage de la sélection
   }
}
</script>

<template>
   <v-card class="containerList">
      <v-card-title class="d-flex justify-space-between align-center titleList">
         <span> Liste des systemes </span>
         <v-spacer></v-spacer>
         <v-text-field
             label="Rechercher"
             density="compact"
             prepend-inner-icon="mdi-magnify"
             v-model="this.store.listSysteme.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <v-spacer></v-spacer>
         <router-link to="/creer/systeme" class="ml-auto">
            <v-btn>
               Creer un Systeme
            </v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table-virtual
             :headers="header"
             :items="store.listSysteme.systemes"
             v-model:search="this.store.listSysteme.filter"
             :filter-keys="['nom', 'fournisseur', 'grenaillage.id', 'type']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.nomFournisseur`]="{ item }">
               <span> {{
                     this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === item.fournisseur.id)?.nom
                  }} </span>
            </template>
            <template v-slot:[`item.couches`]="{ item }">
               <v-select
                   :items="item.couches"
                   item-title="nom"
                   item-value="id"
                   label="Sélectionner une couche"
                   @update:modelValue="(value: number) => onCoucheSelected(item.id, item.couches.find((c) => c.id === value))"
                   :model-value="selectedCouches[item.id]?.id"
               ></v-select>
            </template>
            <template v-slot:[`item.detailCouche`]="{ item }">
               <div v-if="selectedCouches[item.id]">
                  <div>Nom: {{ selectedCouches[item.id].nom }}</div>
                  <div>Epaisseur: {{ selectedCouches[item.id].epaisseur }}</div>
                  <div>Tarif : {{ selectedCouches[item.id].tarif }}</div>
               </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-icon size="x-large" color="primary" @click="editSysteme(item)">mdi-pencil</v-icon>
               <v-icon size="x-large" color="error" @click="deleteSysteme(item)">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>