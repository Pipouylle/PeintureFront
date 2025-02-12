<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class Menu extends Vue {
  private drawer = false;
  private list: { id: number, path: string, name: string }[] = [
    {id: 1, path: "", name: "Home"},
    {id: 2, path: "listAffaire", name: "Affaires"},
    {id: 3, path: "listDemande", name: "Demandes"},
    {id: 4, path: "listSysteme", name: "Systemes"},
    {id: 5, path: "listCommande", name: "Commandes"},
    {id: 6, path: "calendar", name: "Planing"},
    {id: 7, path: "calendarUsineCabine1", name: "Planing Atelier Cabine 1"},
    {id: 8, path: "calendarUsineCabine2", name: "Planing Atelier Cabine 2"},
  ]
}
</script>

<template>
    <v-btn
        @click="drawer = !drawer">
      Navigation
    </v-btn>
    <v-navigation-drawer v-if="drawer">
      <v-list
          v-for="item in list" :key="item.id"
      >
        <v-list-item>
          <v-card>
            <router-link :to="'/' + item.path">
              <v-btn class="w-100 button"> {{ item.name }}</v-btn>
            </router-link>
          </v-card>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.button {
  border: 1px solid #0b0e0d;
  border-radius: 8px;
}
</style>