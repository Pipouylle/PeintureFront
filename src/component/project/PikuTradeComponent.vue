

<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class PikuTradeComponent extends Vue {
}
</script>
<template>
  <div class="project-container">
    <div class="header">
      <h1>PikuTrade</h1>
      <p class="subtitle">Un bot de trading crypto innovant avec Bitget</p>
    </div>

    <section class="about-project">
      <h2>À propos du projet</h2>
      <p>
        PikuTrade est un projet personnel développé par une équipe de trois passionnés de
        programmation et de finance. L'objectif est de créer un bot de trading crypto qui intègre une API performante
        et une interface utilisateur en temps réel pour permettre la gestion efficace des finances.
      </p>
      <p>
        Le développement a débuté en décembre 2024, et l'ensemble du projet est disponible sur notre dépôt GitHub. Nous
        avons mis en place un serveur dédié avec SSH pour assurer la sécurité des communications et des opérations.
      </p>
    </section>

    <section class="api-details">
      <h2>L'API (Java Spring Boot)</h2>
      <p>Notre API, développée en Java Spring Boot, est le cœur du projet. Voici ses principales fonctionnalités :</p>
      <ul>
        <li>Appels à l'API Bitget pour récupérer les données du marché.</li>
        <li>Système de stockage des prix dans des fichiers pour optimiser les requêtes.</li>
        <li>Utilisation des fichiers existants pour éviter les appels redondants à l'API Bitget.</li>
        <li>Début d'intégration d'une IA générative pour analyser les données stockées.</li>
        <li>Gestion modulaire des ordres de trading.</li>
        <li>Système avancé de requêtes GET et POST via un "API Requester" dédié :</li>
        <ul>
          <li>Système permettant d'envoyer plusieurs requêtes par seconde avec un système de "boîte aux lettres"
            (batch), le tout en mode asynchrone.
          </li>
          <li>Conception générique avec une gestion d'erreur personnalisée.</li>
        </ul>
        <div class="api-endpoints">
          <h3>Exemples de requêtes :</h3>
          <img :src="require('@/assets/image/api-endpoints.png')" alt="Diagramme des requêtes API" class="api-image"/>
        </div>
        <li>Planification automatique des prix d'entrée et de sortie grâce à un système de "scheduler".</li>
      </ul>
    </section>

    <section class="frontend-details">
      <h2>Le Frontend (Vue.js)</h2>
      <p>L'interface utilisateur, développée avec Vue.js, offre une expérience fluide et interactive :</p>
      <ul>
        <li>Interface utilisateur intuitive et réactive fonctionnant en temps réel.</li>
        <li>Requêtes à l'API en Spring Boot pour obtenir et gérer les données du marché.</li>
        <li>Fonctionnalité permettant de placer des ordres directement depuis l'application.</li>
        <li>Point d'entrée pour gérer les finances des utilisateurs en toute simplicité.</li>
        <li>Affichage en temps réel d'un graphique des prix du marché :</li>
      </ul>
      <div class="chart-container">
        <h3>Graphique des prix</h3>
        <img :src="require('@/assets/image/realtime-chart.png')" alt="Graphique des prix en temps réel"
             class="chart-image"/></div>
    </section>

    <section class="technical-details">
      <h2>Détails techniques</h2>
      <p>Voici quelques points clés sur la technologie utilisée :</p>
      <ul>
        <li>Backend : Java Spring Boot avec Gradle.</li>
        <li>Frontend : Vue.js.</li>
        <li>Stockage des données de marché dans des fichiers pour optimiser les performances.</li>
        <li>Serveur dédié configuré avec SSH pour la sécurité et la stabilité.</li>
        <li>Dépôt GitHub pour la gestion du code et la collaboration.</li>
      </ul>
    </section>
  </div>
</template>
<style scoped>
.project-container {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: var(--background-color);
  color: var(--text-color);
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

.footer {
  text-align: center;
  margin-top: 20px;
}
</style>