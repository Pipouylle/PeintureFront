<template>
  <div class="project-container">

    <header class="header">
      <div class="flex-container">
        <div class="image-container">
          <img :src="require('@/assets/image/referendum-logo.png')" alt="Logo PikuTrade" class="header-image"/>
        </div>
        <h1>Projet SAE - Application de Vote Électronique</h1>
      </div>
    </header>

    <section class="about-project">
      <h2>À propos du projet</h2>
      <p>
        Ce projet, débuté en <strong>octobre 2024</strong>, a été réalisé dans le cadre d'une SAE de six mois.
        Notre objectif était de développer une application client-serveur sécurisée pour un <strong>référendum en
        ligne</strong>.
        Cette application permet aux utilisateurs de voter de manière confidentielle et sécurisée.
      </p>
      <p>
        Le projet a suivi une méthodologie <strong>Agile</strong>, avec des livraisons successives (sprints) pour
        intégrer les
        fonctionnalités progressivement. Nous avons utilisé <strong>GitLab</strong> pour gérer la collaboration et la
        versioning.
      </p>
      <p>
        Voici les aspects techniques clés du projet :
      </p>
      <ul>
        <li>
          Utilisation des <strong>sockets</strong> pour la communication entre les entités (électeurs, serveur,
          scrutateurs).
        </li>
        <li>
          Mise en place d'un <strong>protocole de chiffrement</strong> basé sur une version modifiée de l'<strong>algorithme
          ElGamal</strong>.
        </li>
        <li>
          Sécurisation des échanges avec le <strong>chiffrement TLS</strong> et une gestion avancée des erreurs.
        </li>
        <li>
          Conception d'un <strong>protocole de trames</strong> personnalisé pour structurer les données et les statuts
          transmis.
        </li>
        <li>
          Architecture <strong>monolithe modulaire</strong> avec Gradle, facilitant la gestion des dépendances et des
          modules.
        </li>
      </ul>
      <div class="flex-container">
        <div class="text-container">
          <p>
            L'architecture du projet a été pensée pour garantir une séparation claire des responsabilités entre les
            différents modules.
            Cela permet une meilleure maintenabilité et évolutivité, tout en respectant les principes
            <strong>SOLID</strong>.
          </p>
        </div>
        <div class="image-container">
          <img :src="require('@/assets/image/archi-projet.png')" alt="Architecture du projet"
               class="architecture-image"/>
        </div>
      </div>
    </section>

    <section class="admin-panel">
      <h2>Interface d'administration</h2>
      <p>
        L'application inclut une interface d'administration intuitive permettant :
      </p>
      <ul>
        <li>De gérer les utilisateurs et les scrutateurs.</li>
        <li>De créer et gérer les réferendums.</li>
        <li>De surveiller les connexions actives et de modifier les permissions.</li>
        <li>De garantir le bon déroulement du processus de vote grâce à des outils de contrôle dédiés.</li>
      </ul>
      <div class="image-container">
        <img :src="require('@/assets/image/admin-user-panel.png')" alt="Panneau d'administration" class="admin-image"/>
      </div>
    </section>
    <section class="user-panel">
      <h2>Interface Utilisateur</h2>
      <p>
        L'application inclut deux interfaces utilisateur, une côté électeur et l'autre côté scrutateur intuitive
        permettant :
      </p>
      <ul>
        <li>De gérer son compte / se connecter.</li>
        <li>De voter et voir les résultats.</li>
        <li>De gérer ça clé côté scrutateur nécessaire au chiffrement des réferendums.</li>
      </ul>
      <div class="double-image-container">
        <img :src="require('@/assets/image/referendum-view.png')" alt="Referendum view" class="admin-image"/>
        <img :src="require('@/assets/image/scrutateur-view.png')" alt="Scrutateur view" class="admin-image"/>
      </div>
    </section>

    <section class="learning-outcomes">
      <h2>Ce que ce projet nous a apporté</h2>
      <p>
        Travailler sur ce projet a été une opportunité exceptionnelle d'apprentissage et de développement. Voici ce que
        nous avons pu renforcer :
      </p>
      <ul>
        <li>
          Approfondir nos connaissances des principes <strong>SOLID</strong> et de la méthodologie <strong>KISS</strong>
          pour concevoir une application
          maintenable et évolutive.
        </li>
        <li>
          Gérer efficacement un projet en équipe avec la méthodologie <strong>Agile</strong>, en utilisant des outils
          comme GitLab pour la coordination et la planification.
        </li>
        <li>
          Acquérir une expertise en <strong>cryptographie</strong>, en intégrant un chiffrement homomorphe pour
          sécuriser les votes.
        </li>
        <li>
          Développer des compétences avancées en gestion des erreurs grâce à un protocole robuste et détaillé.
        </li>
        <li>
          Renforcer nos bases en programmation réseau avec l'utilisation des <strong>sockets</strong>.
        </li>
      </ul>
      <p>
        Ce projet a également mis en évidence l'importance de la communication et de la coordination au sein d'une
        équipe technique, des compétences essentielles pour tout projet à long terme.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class ReferendumComponent extends Vue {
}
</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.header-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

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
  align-items: center;
  margin-bottom: 20px;
}

.image-container {
  flex: 1;
  padding: 10px;
}

.text-container {
  flex: 2;
  padding: 10px;
}

.subtitle {
  font-size: 1.2em;
  color: var(--sub-color);
}

.about-project,
.learning-outcomes,
.admin-panel,
.user-panel {
  margin-bottom: 30px;
}

.admin-image,
.architecture-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.double-image-container {
  display: flex;
  justify-content: space-between;
}

.double-image-container img {
  width: 49%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
