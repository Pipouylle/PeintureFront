<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class Menu extends Vue {
   private list: { id: number, path: string, name: string }[] = [
      {id: 1, path: "", name: "Home"},
      {id: 2, path: "listAffaire", name: "Affaires"},
      {id: 3, path: "listSysteme", name: "Systemes"},
      {id: 4, path: "listCommande", name: "Commandes"},
      {id: 5, path: "listDemande", name: "Demandes"},
      {id: 6, path: "listArticle", name: "Articles"},
      {id: 7, path: "listGrenaillage", name: "Grenaillages"},
      {id: 8, path: "calendar", name: "Planing"},
      {id: 9, path: "calendarUsineCabine1", name: "Planing Atelier Cabine 1"},
      {id: 10, path: "calendarUsineCabine2", name: "Planing Atelier Cabine 2"},
   ]
}
</script>

<template>
   <v-container class="menu">
      <v-list
          v-for="item in list" :key="item.id"
      >
         <v-list-item>
            <v-card>
               <router-link :to="'/' + item.path" active-class="active-link">
                  <v-btn class="w-100 button"> {{ item.name }}</v-btn>
               </router-link>
            </v-card>
         </v-list-item>
      </v-list>
   </v-container>
</template>

<style scoped>
.menu {
   position: fixed;
   left: 0;
   height: 100vh;
   width: 15vw;
}

.button {
   border: 1px solid #0b0e0d;
   border-radius: 8px;
}

.active-link .button {
   background-color: blue;
   color: white;
}
</style>