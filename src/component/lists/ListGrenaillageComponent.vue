<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ListStore, useAlert} from "@/stores";

@Component({})
export default class ListGrenaillageComponent extends Vue {
  private list = ListStore();
  private header  = [
    { title : "nom" , value : "nom" },
    { title : "type Chantier" , value : "typeChantier"  },
    { title : "tarif" , value : "tarif" },
    { title : "Action" , value : "actions" , sortable : false , align : "end" }
  ];

  async editGrenaillage(item: any) {
    try{
      if (await this.list.ListGrenaillage.modif(item)){
        useAlert().alert('Modification effectuée avec succès');
      } else {
        useAlert().alert('Erreur lors de la modification');
      }
    } catch (e) {
      console.error(e);
      useAlert().alert('Erreur lors de la modification');
    }
  }
}
</script>

<template>
  <v-card class="containerList">
    <v-card-title class="d-flex justify-space-between align-center titleList">
      <span> Liste des Grenaillage </span>
    </v-card-title>
    <v-card-text>
      <v-data-table
          :headers="this.header"
          :items="this.list.ListGrenaillage.grenaillages"
          variant="outlined"
          class="tableList"
      >
        <template v-slot:[`item.tarif`]="{ item }">
          <v-text-field
              v-model="item.tarif"
              variant="outlined"
          ></v-text-field>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="editGrenaillage(item)">Modifier</v-btn>
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>