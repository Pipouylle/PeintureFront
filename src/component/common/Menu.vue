<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})

//TODO: modif les lien pour mettre des / a la place des majuscule
export default class Menu extends Vue {
   private list: {path: string, name: string }[] = [
      {path: "", name: "Home"},
      {path: "listAffaire", name: "Affaires"},
      {path: "listSysteme", name: "Systemes"},
      {path: "listCommande", name: "Commandes"},
      {path: "listDemande", name: "Demandes"},
      {path: "listArticle", name: "Articles"},
      {path: "list/fournisseur", name: "Fournisseurs"},
      {path: "listGrenaillage", name: "Grenaillages"},
      {path: "listSemaine", name: "Semaines"},
      //{id: 8, path: "calendar", name: "Planing"},
      //{id: 9, path: "calendarUsineCabine1", name: "Planing Atelier Cabine 1"},
      //{id: 10, path: "calendarUsineCabine2", name: "Planing Atelier Cabine 2"},
      {path: "calendar2", name: "Planning"},
      {path: "usineView", name: "Cabine"},
   ]
}
</script>

<template>
   <v-container class="menu">
      <v-list
          v-for="(item, index) in list" :key="index"
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