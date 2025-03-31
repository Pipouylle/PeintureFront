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
import {Systeme} from "@/models/types/systeme";

@Component({})


//TODO: modification des fournisseur
export default class ListSystemeComponent extends Vue {
   private store = listSystemeStore();
   private fournisseurStore = listFournisseurStore();
   private grenaillageStore = listGrenaillageStore();
   private modifStore = updateSystemeStore();
   private router = useRouter();
   private itemToDelete: Systeme | null = null;
   private dialogDelete = false;
   private selectedCouches: Record<number, Couche> = {};
   private header = [
      {title: 'Nom', value: 'nom'},
      {title: 'Fournisseur', value: 'nomFournisseur'},
      {title: 'Grenaillage', value: 'nomGrenaillage'},
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

   async deleteSysteme() {
      if (this.itemToDelete) {
         if (await this.store.delete(this.itemToDelete)) {
            NotificationHandler.showNewNotification('Systeme supprimé avec succès !');
         } else {
            NotificationHandler.showNewNotification('Erreur lors de la suppression du systeme.', true);
            await this.reload();
         }
      }
   }

   editSysteme(item: any) {
      this.modifStore.systemeModif.systeme = JSON.parse(JSON.stringify(item));
      this.router.push({name: 'modifSysteme'});
   }

   onCoucheSelected(systemeId: number, couche: Couche) {
      this.selectedCouches[systemeId] = couche; // Stockage de la sélection
   }

   private openDeleteSysteme(item: Systeme) {
      this.dialogDelete = true;
      this.itemToDelete = item;
   }

   get formatedSysteme(){
      return this.store.listSysteme.systemes.map(systeme => ({
         ...systeme,
         nomFournisseur: this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === systeme.fournisseur.id)?.nom,
         nomGrenaillage: systeme.grenaillage?.nom || 'AUCUN',
      })).sort((a,b) => b.id - a.id);
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
             :items="formatedSysteme"
             v-model:search="this.store.listSysteme.filter"
             :filter-keys="['nom', 'nomFournisseur', 'nomGrenaillage', 'type']"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
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
               <v-dialog v-model="dialogDelete">
                  <v-card>
                     <v-btn size="x-large" color="primary" @click="dialogDelete = !dialogDelete">annuler</v-btn>
                     <v-btn size="x-large" color="error" @click="deleteSysteme()">confirmer la supression</v-btn>
                  </v-card>
               </v-dialog>
               <v-icon size="x-large" color="error" @click="openDeleteSysteme(item)">mdi-delete</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>