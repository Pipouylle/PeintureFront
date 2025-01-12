<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';

@Component({})
export default class Project extends Vue {}
</script>

<template>

  <div class="project-container">
    <h1> PRoject preview 3</h1>
    <img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" width="30%" alt="Innovation Image" class="project-image" />
    <div class="project-description">
      L'innovation est le moteur du progrès, une lumière qui guide les sociétés vers de nouvelles opportunités. Dans
      chaque idée novatrice réside le potentiel de transformer des vies, de remodeler des industries et de résoudre des
      problèmes complexes. Pourtant, l'innovation exige courage et persévérance, car les grandes avancées ne naissent
      pas sans défis. Il faut un esprit audacieux pour braver l'inconnu et façonner l'avenir.
    </div>
  </div>
</template>

<style scoped>
.project-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 20px; /* Espace entre l'image et le texte */
}


.project-description {
  font-size: 1.2em;
  line-height: 1.5;
  max-width: 600px; /* Limite la largeur du texte */
}
</style>
