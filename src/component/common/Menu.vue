<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})

//TODO: modif les lien pour mettre des / a la place des majuscule
export default class Menu extends Vue {
   private list: { path?: string, name: string, children?: any[] }[] = [
      {path: "", name: "Home"},
      {
         name: "Données", children: [
            {path: "list/affaire", name: "Affaires"},
            {path: "list/commande", name: "Commandes"},
            {path: "list/demande", name: "Demandes"},
            {path: "list/stock/sortie", name: "Stock Sortie"},
         ]
      },
      {
         name: 'Planification', children: [
            {path: "calendar2", name: "Planning"},
            {path: "usine/view?cabine=1", name: "Cabine 1"},
            {path: "usine/view?cabine=2", name: "Cabine 2"},
            {path: "avancement/saisie", name: "Saisie Avancement"},
         ]
      },
      {
         name: 'Paramétrages', children: [
            {path: "list/article", name: "Articles"},
            {path: "list/systeme", name: "Systemes"},
            {path: "list/user", name: "Opérateur"},
            {path: "list/fournisseur", name: "Fournisseurs"},
            {path: "list/grenaillage", name: "Grenaillages"},
            {path: "list/semaine", name: "Semaines"},
         ]
      },

      //{path: "calendar", name: "Planing"},
      //{path: "calendarUsineCabine1", name: "Planing Atelier Cabine 1"},
      //{path: "calendarUsineCabine2", name: "Planing Atelier Cabine 2"},
   ]
}
</script>

<template>
   <v-container class="menu">
      <v-list>
         <v-list-item v-for="(item, index) in list" :key="index">
            <v-list-group v-if="item.children">
               <template v-slot:activator="{ props }">
                  <v-list-item
                      v-bind="props"
                      :title="item.name"
                  ></v-list-item>
               </template>
               <v-list-item v-for="(item,index) in item.children" :key="index">
                  <v-card>
                     <router-link :to="'/' + item.path" active-class="active-link">
                        <v-btn class="w-100 button"> {{ item.name }}</v-btn>
                     </router-link>
                  </v-card>
               </v-list-item>
            </v-list-group>
            <v-card v-else>
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