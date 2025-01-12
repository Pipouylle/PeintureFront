<template>
  <div class="project-container">
    <header class="header">
      <h1>CGJ Project - Création d'un jeu en 24h</h1>
    </header>

    <section class="project-introduction">
      <div class="flex-container">
        <div class="image-container">
          <img :src="require('@/assets/image/CGJ2024-Affiche-8eme-edition.jpg')"
               alt="Image de l'équipe travaillant sur le projet" class="team-image"/>
        </div>
        <div class="text-container">
          <h2>Un défi collaboratif intense</h2>
          <p>
            Pendant un peu plus de <strong>24 heures</strong>, une équipe de cinq passionnés s'est réunie pour relever
            un défi de taille : créer un jeu vidéo en un temps record. Notre jeu, un <strong>jeu multijoueur
            local</strong> de donjons, a nécessité une organisation précise et une collaboration étroite.
          </p>
          <p>
            Grâce à <strong>GitHub</strong>, nous avons synchronisé nos efforts en temps réel et géré efficacement notre
            code. Chaque membre de l'équipe s'est vu attribuer un rôle spécifique. Mon rôle consistait à :
          </p>
          <ul>
            <li>Développer le <strong>déplacement des personnages</strong>.</li>
            <li>Implémenter leurs <strong>actions interactives</strong>.</li>
            <li>Réaliser les <strong>animations</strong> et le <strong>texturing</strong> des personnages.</li>
          </ul>
          <p>
            Ce projet a été une véritable immersion dans un environnement de travail collaboratif et rapide, mettant en
            lumière l'importance de la coordination et des compétences techniques variées. De plus, l'esprit <strong>jovial</strong> et la bonne humeur qui régnaient dans l'équipe ont rendu cette expérience encore plus agréable et enrichissante.
          </p>
        </div>
      </div>
    </section>

    <section class="project-learnings">
      <h2>Ce que ce projet m'a apporté</h2>
      <p>
        Participer à ce projet m'a permis de :
      </p>
      <ul>
        <li>
          Apprendre à travailler efficacement sous <strong>pression temporelle</strong>, en optimisant la répartition
          des tâches et la gestion du temps.
        </li>
        <li>
          Renforcer mes compétences en <strong>programmation collaborative</strong>, en utilisant GitHub pour organiser
          et synchroniser les contributions.
        </li>
        <li>
          Approfondir mes connaissances en <strong>animations</strong> et en <strong>texturing</strong>, des aspects
          cruciaux pour une expérience utilisateur immersive.
        </li>
        <li>
          Développer mes capacités de communication et de coordination au sein d'une équipe technique.
        </li>
      </ul>
      <p>
        Ce projet répond également aux attentes de mon parcours DACS, notamment :
      </p>
      <ul>
        <li><strong>Concevoir des applications interactives</strong> répondant à des besoins spécifiques.</li>
        <li><strong>Optimiser le travail en équipe</strong> grâce à une répartition claire des rôles et à l'utilisation
          d'outils modernes de versioning.
        </li>
        <li><strong>Garantir une expérience utilisateur fluide</strong> grâce à des animations et des interactions bien
          pensées.
        </li>
      </ul>
    </section>

    <section class="project-image">
      <h2>Visuel du jeu final</h2>
      <div class="image-container">
        <img :src="require('@/assets/image/cgj-preview-jeu.png')" alt="Capture d\écran du jeu développé"
             class="game-image"/></div>
    </section>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class CGJComponent extends Vue {
}
</script>

<style scoped>
.project-container {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.flex-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
}

.image-container {
  flex: 1;
  padding: 10px;
}

.text-container {
  flex: 2;
  padding: 10px;
}

.team-image,
.game-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.project-learnings,
.project-image {
  margin-bottom: 30px;
}
</style>
