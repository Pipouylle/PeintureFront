<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore} from "@/stores";
import {useRouter} from "vue-router";
import {deleteSysteme} from "@/services/SystemesService";
import {Couche} from "@/models/types/couche";

@Component({})
export default class ListSystemeComponent extends Vue {
  private listSystemeStore = ListStore();
  private selectedCouches: Record<number, Couche> = {};
  private header = [
    {title: 'Nom', value: 'nom'},
    {title: 'Fournisseur', value: 'fournisseur'},
    {title: 'grenaillage', value: 'grenaillage.nom'},
    {title: 'couche', value: 'couches'},
    {title: 'detail Couche', value: 'detailCouche'},
    {title: 'actions', value: 'actions', sortable: false, align: 'end'}
  ]

  private router = useRouter();

  async deleteSysteme(item: any) {
    try {
      await deleteSysteme(item);
      this.listSystemeStore.ListSysteme.systemes = this.listSystemeStore.ListSysteme.systemes.filter(systeme => systeme.id !== item.id);
    } catch (error) {
      console.log(error);
    }
  }

  //get formatedCouche(){}

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
    <v-card-title class="d-flex justify-space-between align-center">
      <span> Liste des systemes </span>
      <router-link to="/CreerSysteme" class="ml-auto"> Creer Systeme</router-link>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="header"
          :items="listSystemeStore.ListSysteme.systemes"
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

<style scoped>
.containerList {
  position: absolute;
  top: 0;
  margin-top: 5vw;
  width: 100vw;
}

.v-card-title {
  justify-content: center;
  height: 2vw;
}

.ml-auto {
  margin-left: auto;
}

.tableList {
  height: 51vw;
}
</style>