<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class Menu extends Vue {
  private drawer = false;
}
</script>

<template>
  <v-app>
    <v-btn
        @click="drawer = !drawer">
      Navigation
    </v-btn>
    <v-navigation-drawer v-if="drawer">
      <v-list>
        <v-list-item>
          <v-card>
            <router-link to="/">
              <v-btn class="w-100 button" > Home</v-btn>
            </router-link>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card>
            <router-link to="/listAffaire">
              <v-btn class="w-100 button"> Affaires </v-btn>
            </router-link>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card>
            <router-link to="/listDemande">
              <v-btn class="w-100 button"> Demandes </v-btn>
            </router-link>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card>
            <router-link to="/listSysteme">
              <v-btn class="w-100 button"> Systemes </v-btn>
            </router-link>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card>
            <router-link to="/listCommande">
              <v-btn class="w-100 button"> Commandes </v-btn>
            </router-link>
          </v-card>
        </v-list-item>
        <v-list-item>
          <v-card>
            <router-link to="/calendar">
              <v-btn class="w-100 button"> Planing </v-btn>
            </router-link>
          </v-card>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
.button {
  border: 1px solid #0b0e0d;
  border-radius: 8px;
}
</style>