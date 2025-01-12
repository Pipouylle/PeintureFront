<template>
  <div class="project-container">
    <header class="header">
      <h1>Subnautica Multiplayer Mod</h1>
      <p class="subtitle">Créer un mode multijoueur pour Subnautica Below Zero</p>
    </header>

    <section class="about-project">
      <h2>Présentation</h2>
      <p>
        En <strong>mai 2023</strong>, j'ai repris un mod existant pour Subnautica Below Zero qui n'avait pas été achevé. Mon objectif était de continuer son développement en me concentrant sur des aspects techniques cruciaux, notamment la <strong>liaison entre les différents objets</strong> du jeu et la <strong>communication entre joueurs via des sockets</strong>.
      </p>
      <p>
        Ce projet, bien que toujours en <strong>phase alpha</strong> et non jouable, a été une formidable opportunité d'apprentissage. Il m'a permis de mettre en pratique des concepts avancés en <strong>programmation orientée objet (POO)</strong> et de mieux comprendre les défis liés au développement de jeux multijoueurs.
      </p>
    </section>

    <section class="contributions">
      <h2>Contributions clés</h2>
      <p>
        Tout au long de ce projet, mes efforts se sont concentrés sur plusieurs aspects majeurs :
      </p>
      <ul>
        <li><strong>Amélioration de la structure</strong> du mod grâce à des bonnes pratiques de programmation et aux principes SOLID.</li>
        <li>Mise en place d'une <strong>communication réseau efficace</strong> basée sur des sockets pour synchroniser les actions des joueurs.</li>
        <li>Liaison entre les <strong>objets du jeu</strong> pour une gestion cohérente et partielle des interactions multijoueurs.</li>
      </ul>
      <p>
        Ces contributions constituent une <strong>base solide</strong> pour envisager des évolutions futures, telles que l'ajout de nouvelles fonctionnalités et la stabilisation du mod pour le rendre pleinement fonctionnel.
      </p>
    </section>

    <section class="technical-details">
      <h2>Apprentissages et technologies utilisées</h2>
      <p>
        Ce projet a été une opportunité unique de renforcer mes compétences techniques :
      </p>
      <ul>
        <li>Approfondissement de la <strong>POO</strong>, avec une attention particulière portée à l'héritage, au polymorphisme et aux interfaces.</li>
        <li>Refactorisation d'un code préexistant pour améliorer sa <strong>modularité</strong>, en séparant les responsabilités dans des classes dédiées.</li>
        <li>Utilisation des <strong>sockets</strong> pour la communication réseau, permettant une synchronisation en temps réel entre les joueurs.</li>
        <li>Respect des principes <strong>SOLID</strong> pour structurer une architecture propre et évolutive.</li>
      </ul>
      <p>
        En lien avec mon parcours DACS, ce projet répond directement aux compétences suivantes :
        <ul>
          <li><strong>Réaliser des applications communicantes</strong> en utilisant des sockets pour échanger des données.</li>
          <li>Adopter des <strong>bonnes pratiques de conception</strong> et de programmation, en respectant les principes d'accessibilité et de modularité.</li>
          <li><strong>Analyser et modéliser</strong> des structures complexes pour résoudre des problèmes liés à la synchronisation des joueurs.</li>
        </ul>
      </p>
    </section>

    <section class="image-section">
      <h2>Visuel du launcher</h2>
      <p>
        Le launcher actuel permet de gérer la <strong>connexion des joueurs</strong> et d'initier des sessions multijoueurs. Il représente une étape essentielle vers la création d'une interface utilisateur complète et fonctionnelle.
      </p>
      <div class="image-container">
        <img :src="require('@/assets/image/multi-menu.png')" alt="Visuel du menu" class="launcher-image"/>
      </div>
    </section>

    <section class="value-added">
      <h2>Réflexions et valeur ajoutée</h2>
      <p>
        Ce projet m'a permis de :
      </p>
      <ul>
        <li><strong>Renforcer mes bases</strong> en POO et en communication réseau.</li>
        <li>Mieux comprendre les <strong>défis liés au développement de jeux multijoueurs</strong>.</li>
        <li><strong>Collaborer avec la communauté open-source</strong> pour améliorer un projet existant.</li>
        <li>Acquérir des compétences en <strong>gestion de projets complexes</strong> et en résolution de problèmes techniques.</li>
      </ul>
      <p>
        Ces compétences, essentielles dans le parcours DACS, m'ont préparé à des environnements techniques variés où la <strong>rigueur</strong> et l'<strong>innovation</strong> sont nécessaires. Bien qu'inachevé, ce projet illustre ma capacité à m'adapter à des systèmes complexes et à aborder des problèmes techniques ambitieux, tout en renforçant ma curiosité et ma motivation pour le développement logiciel.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';

@Component({})
export default class SubnauticaModComponent extends Vue {
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
.contributions,
.technical-details,
.image-section,
.value-added {
  margin-bottom: 30px;
}

.image-container {
  text-align: center;
  margin-top: 20px;
}

.launcher-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
