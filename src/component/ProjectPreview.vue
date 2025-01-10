<script lang="ts">
import { Vue, Component, Prop } from 'vue-facing-decorator';

@Component({})
export default class ProjectPreview extends Vue {
  @Prop({ required: true }) private title!: string;
  @Prop({ required: true }) private description!: string;
  @Prop({ required: true }) private project!: typeof Vue; // Accepte n'importe quel composant
}
</script>

<template>
  <v-card class="project-card">
    <div class="text-container">
      <div class="title">{{ title }}</div>
      <div class="description">{{ description }}</div>
      <div class="faded-top">
        <div class="blurry-content">
          <!-- Rend dynamiquement n'importe quel composant transmis -->
          <component :is="project" />
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>

.project-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2vw; /* Padding ajusté selon la largeur de l'écran */
  box-shadow: 0 0.1em 0.2em rgba(0, 0, 0, 0.2);
  border-radius: 1em; /* Bord arrondi basé sur des unités relatives */
  transition: transform 0.4s, box-shadow 0.2s;
}

.text-container {
  width: 100%;
}

.title {
  font-weight: bold;
  font-size: 1.8rem; /* Taille en rem pour mieux gérer l'accessibilité */
  margin: 0;
  text-align: left;
}

.description {
  font-size: 1.2rem; /* Taille en rem pour une meilleure échelle sur mobile */
  margin-top: 1vh; /* Espace relatif à la hauteur de l'écran */
  text-align: left;
}

/* Styles pour la div personnalisée */
.faded-top {
  position: relative;
  overflow: hidden;
  height: 15vh; /* Hauteur relative à l'écran */
}

.faded-top::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  pointer-events: none;
}

</style>
