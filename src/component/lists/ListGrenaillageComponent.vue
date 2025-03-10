<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {listGrenaillageStore} from "@/stores/GrenaillageStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({})
export default class ListGrenaillageComponent extends Vue {
   private store = listGrenaillageStore();
   private header = [
      {title: "Nom", value: "nom"},
      {title: "Type de tarif", value: "typeChantier"},
      {title: "Tarif", value: "tarif"},
      {title: "Action", value: "actions", sortable: false, align: "end"}
   ];

   async mounted() {
      await this.store.load();
   }

   async reload() {
      this.store.unLoad();
      await this.store.load();
   }
   async editGrenaillage(item: any) {
      if (await this.store.update(item)) {
         NotificationHandler.showNewNotification('Grenaillage modifié avec succès !');
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la modification du grenaillage.', true);
         await this.reload();

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
         <v-data-table-virtual
             :headers="this.header"
             :items="this.store.listGrenaillage"
             variant="outlined"
             class="tableList"
             :fixed-header="true"
         >
            <template v-slot:[`item.tarif`]="{ item }">
               <v-text-field
                   v-model="item.tarif"
                   variant="outlined"
                   density="comfortable"
               ></v-text-field>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
               <v-icon size="x-large" color="primary" @click="editGrenaillage(item)">mdi-pensil</v-icon>
            </template>
         </v-data-table-virtual>
      </v-card-text>
   </v-card>
</template>

<style scoped src="@/assets/styles/list.css">

</style>