<template>
  <div class="project-container">
    <header class="header">
      <h1>PikuTrade</h1>
      <p class="subtitle">Un bot de trading crypto innovant avec Bitget</p>
    </header>

    <section class="about-project">
      <h2>À propos du projet</h2>
      <p>
        <strong>PikuTrade</strong> est un projet personnel développé par une équipe de trois passionnés de programmation
        et de finance.
        L'objectif principal est de concevoir un <strong>bot de trading crypto</strong> performant, combinant une API
        robuste et une interface utilisateur réactive fonctionnant en <strong>temps réel</strong>.
      </p>
      <p>
        Ce projet a débuté en <strong>décembre 2024</strong>. Dès le départ, nous avons pris en compte les exigences de
        sécurité en configurant un <strong>serveur dédié sécurisé via SSH</strong> pour garantir la confidentialité et
        l'intégrité des communications.
      </p>
    </section>

    <section class="api-details">
      <h2>L'API (Java Spring Boot)</h2>
      <p>
        L'API, développée avec <strong>Java Spring Boot</strong>, est le moteur principal de PikuTrade. Elle a été
        pensée pour relever plusieurs défis majeurs liés au trading en temps réel :
      </p>
      <ul>
        <li>
          Mise en place d'un <strong>batcher asynchrone</strong> permettant de gérer les limitations imposées par l'API
          Bitget.
          Ce batcher fonctionne comme une "<strong>boîte aux lettres</strong>", collectant et traitant les requêtes en
          attente lorsque les limites autorisées sont atteintes.
        </li>
        <li>
          Intégration d'un <strong>scheduler intelligent</strong> capable d'analyser en continu les fluctuations du
          marché. Ce composant calcule dynamiquement les <strong>prix d'entrée et de sortie</strong> optimaux, offrant
          une prise de décision rapide et précise.
        </li>
      </ul>
      <p>
        Ces innovations respectent les principes <strong>SOLID</strong>, garantissant une architecture flexible et
        évolutive, adaptée aux besoins du projet.
      </p>
      <div class="api-endpoints">
        <h3>Illustration des requêtes :</h3>
        <img :src="require('@/assets/image/api-endpoints.png')" alt="Exemples de requêtes API" class="api-image"/></div>
    </section>

    <section class="frontend-details">
      <h2>Le Frontend (Vue.js)</h2>
      <p>
        Du côté utilisateur, le frontend, développé avec <strong>Vue.js</strong>, a été conçu pour garantir une
        expérience fluide et intuitive :
      </p>
      <ul>
        <li>Affichage d'un <strong>graphique en temps réel</strong> basé sur les données actualisées de l'API.</li>
        <li>Interface permettant aux utilisateurs de passer des <strong>ordres de trading</strong> de manière intuitive
          et rapide.
        </li>
        <li>Tableau de bord clair, offrant une visualisation complète des <strong>performances financières</strong>.
        </li>
      </ul>
      <p>
        L'utilisation de technologies comme les <strong>WebSockets</strong> a permis d'assurer une réactivité optimale,
        essentielle pour une plateforme de trading en temps réel.
      </p>
      <div class="chart-container">
        <h3>Graphique des prix en temps réel</h3>
        <img :src="require('@/assets/image/realtime-chart.png')" alt="Graphique en temps réel" class="chart-image"/>
      </div>
    </section>

    <section class="technical-details">
      <h2>Valeur ajoutée et apprentissages</h2>
      <p>
        Travailler sur PikuTrade m'a permis de :
      </p>
      <ul>
        <li>
          Appliquer les principes <strong>SOLID</strong> pour concevoir une architecture modulaire et maintenable, en
          ligne avec les attentes professionnelles.
        </li>
        <li>
          Acquérir une expertise dans la <strong>gestion asynchrone</strong>, notamment avec le développement du batcher
          pour optimiser les appels API.
        </li>
        <li>
          Développer des compétences en <strong>analyse prédictive</strong>, grâce au scheduler et à son application
          dans un environnement financier.
        </li>
        <li>
          Renforcer mes capacités en <strong>administration système</strong>, notamment en configurant un environnement
          serveur sécurisé.
        </li>
      </ul>
      <p>
        Ce projet répond également aux objectifs pédagogiques de mon parcours DACS, tels que :
      </p>
      <ul>
        <li><strong>Concevoir des applications communicantes</strong> adaptées à des scénarios réels.</li>
        <li><strong>Optimiser les performances</strong> en intégrant des systèmes asynchrones robustes.</li>
        <li><strong>Garantir la sécurité</strong> des données via des pratiques avancées d'administration système.</li>
      </ul>
      <p>
        En somme, PikuTrade incarne un équilibre entre innovation technologique et apprentissage pratique, me préparant
        à relever des défis professionnels complexes.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class PikuTradeComponent extends Vue {
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

.subtitle {
  font-size: 1.2em;
  color: var(--sub-color);
}

.about-project,
.api-details,
.frontend-details,
.technical-details {
  margin-bottom: 30px;
}

.api-endpoints,
.chart-container {
  margin-top: 20px;
  text-align: center;
}

.api-image,
.chart-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
