<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";

@Component({
  components: {NavBar}
})
export default class About extends Vue {
  mounted() {
    const elements = document.querySelectorAll<HTMLElement>(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 200); // Animation décalée pour chaque section
    });
  }
}
</script>



<template>

  <div class="about">
    <NavBar/>
    <div class="content">
      <div class="about-page">
        <!-- Étape 1 : Parcours de formation et expériences -->
        <section class="fade-in">
          <h2>Mon Parcours de Formation et Mes Expériences</h2>
          <p>
            Actuellement en deuxième année de BUT Informatique à l'IUT de Montpellier, parcours DACS (Développement et Application Collaborative et Sécurisée),
            j'ai acquis des compétences solides en développement logiciel, en gestion de projet et en cybersécurité.
            J'ai également travaillé sur des projets concrets, comme une application Java de gestion de référendums sécurisés
            et un projet Vue.js de e-commerce, ainsi que des stages et des expériences personnelles en développement logiciel.
          </p>
        </section>

        <!-- Étape 2 : Derniers projets réalisés -->
        <section class="fade-in">
          <h2>Projets Réalisés</h2>
          <ul>
            <li>
              <strong>SAÉ Semestre 2 et 3 :</strong> Développement d'une application collaborative en Java et mise en place d'une API REST avec Spring Boot.
            </li>
            <li>
              <strong>Code Game Jam :</strong> Création d'un jeu en 48 heures, mettant en avant créativité et collaboration.
            </li>
            <li>
              <strong>Nuit de l'Info :</strong> Participation à un hackathon pour développer une solution web innovante en une nuit, sur le thème du développement durable.
            </li>
          </ul>
        </section>

        <!-- Étape 3 : Projet professionnel et de formation -->
        <section class="fade-in">
          <h2>Mon Projet Professionnel et de Formation</h2>
          <p>
            Après l'obtention de mon BUT Informatique, je souhaite poursuivre mes études en intégrant un master en cybersécurité
            ou en intelligence artificielle pour approfondir mes compétences techniques. Mon ambition professionnelle est de devenir pentesteur
            ou développeur spécialisé dans les systèmes sécurisés, tout en continuant à relever des défis technologiques stimulants.
          </p>
        </section>
      </div>
    </div>
  </div>


</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  margin: 0 auto;
}

.about-page {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 20px;
}

section {
  margin-bottom: 40px;
}

h2 {
  font-size: 1.8rem;
  color: var(--h2-color);
  margin-bottom: 10px;
}

p, ul {
  font-size: 1.2rem;
  color: var(--text-color);
}

ul {
  list-style: disc inside;
  margin-left: 20px;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
