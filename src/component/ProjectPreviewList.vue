<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import ProjectPreview from "@/component/ProjectPreview.vue";
import ProjectPreviewModel from "@/models/ProjectPreviewModel";
import CGJProject from "@/views/CGJProject.vue";
import CGJProject2 from "@/views/CGJProject2.vue";
import CGJProject3 from "@/views/CGJProject3.vue";
import CGJProject4 from "@/views/CGJProject4.vue";

@Component({
  components: {ProjectPreview}
})
export default class ProjectPreviewList extends Vue {

  private list: ProjectPreviewModel[] = [
    {
      title: "Projet 1",
      description: "Description du projet 1",
      project: CGJProject
    },
    {
      title: "Projet 2",
      description: "Description du projet 2",
      project: CGJProject2
    },
    {
      title: "Projet 3",
      description: "Description du projet 3",
      project: CGJProject3
    },
    {
      title: "Projet 4",
      description: "Description du projet 4",
      project: CGJProject4
    }
  ];

  private suivant: ProjectPreviewModel = this.list[1];
  private courant: ProjectPreviewModel = this.list[0];
  private precedent: ProjectPreviewModel = this.list[this.list.length - 1];
  private index: number = 0;

  private scrollAvant() {
    this.index -= 1;
    this.update();
  }

  private update(): void {
    this.suivant = this.list[this.modulo(this.index + 1, this.list.length)];
    this.courant = this.list[this.modulo(this.index, this.list.length)];
    this.precedent = this.list[this.modulo(this.index - 1, this.list.length)];
  }

  private scrollApres() {
    this.index += 1;
    this.update();
  }

  private modulo(n: number, total: number): number {
    return ((n % total) + total) % total;
  }
}
</script>

<template>
  <div class="list-container">
    <v-btn class="nav-btn" @click="scrollAvant">Précédent</v-btn>
    <div class="preview-cards">
      <project-preview
          :title="precedent.title"
          :description="precedent.description"
          :project="precedent.project"
          class="project-card back-cards"
      />
      <project-preview
          :title="courant.title"
          :description="courant.description"
          :project="courant.project"
          class="project-card front-card"
      />
      <project-preview
          :title="suivant.title"
          :description="suivant.description"
          :project="suivant.project"
          class="project-card back-cards"
      />
    </div>
    <v-btn class="nav-btn" @click="scrollApres">Suivant</v-btn>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Empêche la barre de défilement */
  height: 100%;
}

.list-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5%;
  gap: 2vw; /* Espace entre les boutons et les cartes, adapté à la largeur de l'écran */
  border: purple 15px solid;

}

.preview-cards {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 5vh; /* Espace vertical adapté à la hauteur de l'écran */
  padding: 2vw;
  border: red 1px solid;

}

.project-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.front-card {
  transform: scale(1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.front-card:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.back-cards {
  opacity: 0.5;
  transform: scale(0.9);
}

.nav-btn {
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 1vh 2vw; /* Padding adapté à la taille de l'écran */
  font-size: 1rem;
}
</style>
