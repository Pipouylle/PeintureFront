<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore} from "@/stores";
import {useRouter} from "vue-router";
import {deleteSysteme} from "@/services/SystemesService";
import {Couche} from "@/models/types/couche";
import {Systeme} from "@/models/types/systeme";

@Component({})

export default class ListSystemeComponent extends Vue {
  private listSystemeStore = ListStore();
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

  async deleteSysteme(item: any) {
    try {
      await deleteSysteme(item);
      await this.listSystemeStore.ListSysteme.delete(item);
      //TODO: delet tout ce qu'il y a au dessous aussi
    } catch (error) {
      console.log(error);
    }
  }


  editSysteme(item: any) {
    this.listSystemeStore.ListSysteme.systemesModif = item;
    this.router.push({name: 'modifSysteme'});
  }

  onCoucheSelected(systemeId: number, couche: Couche) {
    this.selectedCouches[systemeId] = couche; // Stockage de la sélection
  }

  getCouchesForSysteme(systemeId: number): Couche[] {
    const systeme = this.listSystemeStore.ListSysteme.systemes.find(s => s.id === systemeId);
    return systeme?.couches || [];
  }
}
</script>

<template>
  <v-card class="containerList">
    <v-card-title class="d-flex justify-space-between align-center titleList">
      <span> Liste des systemes </span>
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
          :filter-keys="['nom', 'fournisseur', 'grenaillage.nom', 'type']"
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