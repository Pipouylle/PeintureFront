<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useColorStore} from "@/stores";
import {useRouter} from "vue-router";
import Menu from "@/component/common/Menu.vue";

@Component({
  components: {Menu}
})
export default class NavBar extends Vue {
  private colorStore = useColorStore();
  private router = useRouter();

  private toggleTheme() {
    this.colorStore.toggleTheme();
  }

  private navigateToHome() {
    this.router.push({name: 'home'});
  }

  private navigateToAffaireForm() {
    this.router.push({name: 'CreerAffaire'});
  }
}
</script>

<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <Menu/>
      <router-link to="/"> Home </router-link>
      <router-link to="/CreerAffaire"> Affaire </router-link>
      <router-link to="/CreerCommande"> Commande </router-link>
      <router-link to="/CreerSysteme"> Systeme </router-link>
      <router-link to="/SelectArticle"> Article </router-link>
      <router-link to="/CreerDemande"> Demande </router-link>
      <router-link to="/Calendar"> Calendar </router-link>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333; /* Couleur de fond */
  padding: 1rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-list {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-list li {
  color: white;
}

.navbar-list li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s;
}

.navbar-list li a:hover {
  color: #07bf9b; /* Couleur au survol */
}
</style>