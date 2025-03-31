<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
@Component({})

//TODO: modif les lien pour mettre des / a la place des majuscule
export default class Menu extends Vue {
   private route = useRoute();
   private list: { path?: string, name: string, children?: any[] }[] = [
      {path: "", name: "Home"},
      {
         name: "Clients", children: [
            {path: "list/affaire", name: "Affaires"},
            {path: "list/commande", name: "Commandes"},
            {path: "list/demande", name: "Demandes"},
         ]
      },
      {
         name: 'Planification', children: [
            {path: "calendar2", name: "Planning"},
            {path: "avancement/saisie", name: "Saisie Avancement"},
            {path: "usine/view?cabine=1", name: "Cabine 1"},
            {path: "usine/view?cabine=2", name: "Cabine 2"},
         ]
      },
      {
         name: "Stocks", children: [
            {path: "list/stock/sortie", name: "Stock Sortie"},
            {path: "list/article", name: "Articles"},
         ]
      },
      {
         name: 'Paramétrages', children: [
            {path: "list/systeme", name: "Systemes"},
            {path: "list/user", name: "Opérateurs"},
            {path: "list/fournisseur", name: "Fournisseurs"},
            {path: "list/grenaillage", name: "Grenaillages"},
            {path: "list/semaine", name: "Semaines"},
         ]
      },
      //{path: "calendar", name: "Planing"},
      //{path: "calendarUsineCabine1", name: "Planing Atelier Cabine 1"},
      //{path: "calendarUsineCabine2", name: "Planing Atelier Cabine 2"},
   ];

   private openedGroups = ref<Record<string, boolean>>({});

   // Vérifie si un groupe doit être ouvert
   private isGroupOpened(children: any[]): boolean {
      return children.some((item) =>
          this.route.path.includes(item.path.replace(/\?.*/, ""))
      );
   }

   // ✅ Vérifie si `openedGroups` est bien défini avant de l'utiliser
   private updateOpenedGroups() {
      if (!this.openedGroups.value) {
         this.openedGroups.value = {}; // Assure que c'est bien un objet
      }

      this.list.forEach((group) => {
         if (group.children) {
            // ✅ Vérifie si `group.name` est bien défini avant de l'utiliser
            if (typeof group.name === "string") {
               this.openedGroups.value[group.name] = this.isGroupOpened(group.children);
            }
         }
      });
   }

   mounted() {
      this.updateOpenedGroups();

      // Écoute les changements de route et met à jour les groupes ouverts
      watch(() => this.route.path, () => {
         this.updateOpenedGroups();
      });
   }
}
</script>

<template>
   <v-container class="menu">
      <v-list>
         <v-list-item v-for="(item, index) in list" :key="index">
            <v-list-group v-if="item.children" v-model:opened="openedGroups[item.name]">
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