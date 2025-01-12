<template>
  <div class="project-container">
    <header class="header">
      <h1>PikuTrade</h1>
      <p class="subtitle">Un bot de trading crypto innovant avec Bitget</p>
    </header>

    <section class="about-project">
      <h2>À propos du projet</h2>
      <p>
        PikuTrade est un projet personnel développé par une équipe de trois passionnés de
        programmation et de finance.
        L'objectif est de créer un bot de trading crypto qui intègre une API performante
        et une interface utilisateur en temps réel pour permettre la gestion efficace des finances.
      </p>
      <p>
        -> Le développement a débuté en décembre 2024.
        -> L'ensemble du projet est disponible sur notre dépôt GitHub.
        -> Nous avons mis en place un serveur dédié avec SSH pour assurer la sécurité des communications et des
        opérations.
      </p>
    </section>

    <section class="api-details">
      <h2>L'API (Java Spring Boot)</h2>
      <p>Lorsque nous avons commencé à concevoir l'API, l'un des défis majeurs était d'assurer une communication fluide
        avec l'API Bitget, qui impose des limitations strictes sur le nombre de requêtes. Pour résoudre ce problème,
        nous avons mis en place un "batcher" innovant.</p>
      <ul>
        <li>Ce batcher fonctionne comme une "boîte aux lettres" asynchrone : chaque requête envoyée à un endpoint est
          évaluée pour s'assurer qu'elle respecte les limites de l'API.
        </li>
        <li>Si la limite est atteinte, la requête est placée dans une file d'attente (queue).</li>
        <li>Une fois que l'API est de nouveau disponible, les requêtes en attente sont traitées automatiquement.</li>
        <li>Cette solution a non seulement permis d'éviter les erreurs de dépassement, mais a également amélioré la
          stabilité globale de l'application.
        </li>
      </ul>
      <p>
        Un autre aspect clé de notre API est le "scheduler" :
        Ce composant analyse en temps réel les fluctuations du marché pour calculer dynamiquement les prix d'entrée et
        de sortie optimaux pour chaque transaction.
        Cette approche permet une prise de décision rapide et adaptée aux
        conditions actuelles du marché, maximisant
        ainsi les opportunités de gains pour les utilisateurs.
      </p>
      <ul>
        <li>Nous avons conçu ces fonctionnalités en respectant des principes d'architecture solides, notamment les
          principes SOLID.
        </li>
        <li>Cela nous a permis de structurer une application modulaire et maintenable.</li>
        <li>Ces outils ont été développés avec une gestion d'erreurs robuste, garantissant une expérience utilisateur
          fluide et fiable.
        </li>
      </ul>
      <div class="api-endpoints">
        <h3>Illustration des requêtes :</h3>
        <img :src="require('@/assets/image/api-endpoints.png')" alt="Exemples de requêtes API" class="api-image"/>
      </div>
    </section>

    <section class="frontend-details">
      <h2>Le Frontend (Vue.js)</h2>
      <p>
        Du côté du frontend, notre objectif principal était d'offrir une interface réactive qui fonctionne en temps
        réel.
        En utilisant Vue.js, nous avons conçu une application capable de :
      </p>
      <ul>
        <li>Afficher un graphique des prix en temps réel, mis à jour directement à partir des données fournies par
          l'API.
        </li>
        <li>Permettre aux utilisateurs de passer des ordres de trading en toute simplicité.</li>
        <li>Gérer les finances des utilisateurs via un tableau de bord clair et intuitif.</li>
      </ul>
      <p>
        - Le développement de cette interface nous a permis de renforcer nos compétences en communication
        client-serveur.
        - Nous avons optimisé les performances pour garantir une fluidité d'utilisation.
        - Le graphique dynamique est rendu possible grâce à l'utilisation efficace des WebSockets et d'outils de
        visualisation avancés.
      </p>
      <div class="chart-container">
        <h3>Graphique des prix en temps réel</h3>
        <img :src="require('@/assets/image/realtime-chart.png')" alt="Graphique en temps réel" class="chart-image"/>
      </div>
    </section>

    <section class="technical-details">
      <h2>Valeur ajoutée et apprentissages</h2>
      <p>
        Travailler sur PikuTrade a été une expérience enrichissante à plusieurs niveaux :
        - Nous avons appliqué les concepts vus en cours, comme les principes SOLID, pour structurer une application
        maintenable et modulaire.
        - Cette approche nous a permis de découpler efficacement la gestion des données, la logique métier et les
        interactions avec l'API Bitget.
      </p>
      <p>
        - La mise en œuvre du batcher a été un défi passionnant.
        - Elle a exigé une compréhension approfondie des systèmes asynchrones et des modèles de gestion de files
        d'attente.
        - Cette solution a considérablement amélioré la robustesse et la scalabilité de l'application.
      </p>
      <p>
        La conception du scheduler nous a offert l'opportunité de :
        - Mettre en pratique des compétences en algorithmes d'analyse prédictive.
        - Croiser les données en temps réel avec des stratégies logiques pour maximiser les performances de trading.
      </p>
      <p>
        - En configurant un serveur sécurisé avec SSH, nous avons renforcé nos compétences en administration système.
        - Ce projet a cultivé notre curiosité technique et notre envie de relever des défis complexes.
        - Il nous a préparés à travailler sur des systèmes à grande échelle dans un contexte professionnel.
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
