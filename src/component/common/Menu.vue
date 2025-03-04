<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})

//TODO: modif les lien pour mettre des / a la place des majuscule
export default class Menu extends Vue {
   private list: {path: string, name: string }[] = [
      {path: "", name: "Home"},
      {path: "list/affaire", name: "Affaires"},
      {path: "list/systeme", name: "Systemes"},
      {path: "list/commande", name: "Commandes"},
      {path: "list/demande", name: "Demandes"},
      {path: "list/article", name: "Articles"},
      {path: "list/user", name: "Utilisateur"},
      {path: "list/fournisseur", name: "Fournisseurs"},
      {path: "list/grenaillage", name: "Grenaillages"},
      {path: "list/semaine", name: "Semaines"},
      //{path: "calendar", name: "Planing"},
      //{path: "calendarUsineCabine1", name: "Planing Atelier Cabine 1"},
      //{path: "calendarUsineCabine2", name: "Planing Atelier Cabine 2"},
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