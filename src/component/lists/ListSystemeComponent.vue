<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore, ModifSystemeStore} from "@/stores";
import {useRouter} from "vue-router";
import {deleteSysteme} from "@/services/SystemesService";
import {Couche} from "@/models/types/couche";
import {Systeme} from "@/models/types/systeme";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";

@Component({})


//TODO : le granillage ne marche pas
export default class ListSystemeComponent extends Vue {
   private listSystemeStore = ListStore();
   private modifSystemeStore = ModifSystemeStore();
   private selectedCouches: Record<number, Couche> = {};
   private header = [
      {title: 'Nom', value: 'nom'},
      {title: 'Fournisseur', value: 'fournisseur'},
      {title: 'grenaillage', value: 'grenaillage.nom'},
      {title: 'type', value: 'type'},
      {title: 'couche', value: 'couches'},
      {title: 'detail Couche', value: 'detailCouche'},
      {title: 'actions', value: 'actions', sortable: false, align: 'end'}
   ]

   private router = useRouter();

   mounted(){
      for (const systeme of this.listSystemeStore.ListSysteme.systemes) {
         systeme.grenaillage = this.listSystemeStore.ListGrenaillage.grenaillages.find((grenaillage : Grenaillage) => grenaillage.id === systeme.grenaillage?.id) ?? createDefaultGrenaillage();
      }
   }

   async deleteSysteme(item: any) {
      try {
         await deleteSysteme(item);
         await this.listSystemeStore.ListSysteme.delete(item);
      } catch (error) {
         console.log(error);
      }
   }


   editSysteme(item: any) {
      this.modifSystemeStore.systeme = item;
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
         <v-text-field
             label="Rechercher"
             density="compact"
             v-model="this.listSystemeStore.ListSysteme.filter"
             variant="outlined"
             class="textFilter"
         ></v-text-field>
         <router-link to="/CreerSysteme" class="ml-auto">
            <v-btn>
               Creer Systeme
            </v-btn>
         </router-link>
      </v-card-title>
      <v-card-text>
         <v-data-table
             :headers="header"
             :items="listSystemeStore.ListSysteme.systemes"
             v-model:search="this.listSystemeStore.ListSysteme.filter"
             :filter-keys="['nom', 'fournisseur', 'grenaillage.id', 'type']"
             variant="outlined"
             class="tableList"
         >
            <template v-slot:[`item.couches`]="{ item }">
               <v-select
                   :items="item.couches"
                   item-title="nom"
                   item-value="id"
                   label="Sélectionner une couche"
                   @update:modelValue="(value) => onCoucheSelected(item.id, item.couches.find(c => c.id === value))"
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
               <v-btn color="primary" @click="editSysteme(item)">Modifier</v-btn>
               <v-btn color="error" @click="deleteSysteme(item)">Supprimer</v-btn>
            </template>
         </v-data-table>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">
</style>