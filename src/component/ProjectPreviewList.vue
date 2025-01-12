<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import ProjectPreview from "@/component/ProjectPreview.vue";
import ProjectPreviewModel from "@/models/ProjectPreviewModel";
import CGJProject from "@/views/CGJProject.vue";
import CGJProject2 from "@/views/CGJProject2.vue";
import CGJProject3 from "@/views/CGJProject3.vue";
import CGJProject4 from "@/views/CGJProject4.vue";

@Component({
  components: { ProjectPreview },
})
export default class ProjectPreviewList extends Vue {
  private list: ProjectPreviewModel[] = [
    { title: "Projet 1", description: "Description du projet 1", project: CGJProject },
    { title: "Projet 2", description: "Description du projet 2", project: CGJProject2 },
    { title: "Projet 3", description: "Description du projet 3", project: CGJProject3 },
    { title: "Projet 4", description: "Description du projet 4", project: CGJProject4 },
  ];

  private suivant: ProjectPreviewModel = this.list[1];
  private courant: ProjectPreviewModel = this.list[0];
  private precedent: ProjectPreviewModel = this.list[this.list.length - 1];
  private index: number = 0;

  private isMobile: boolean = false; // Variable pour détecter les appareils mobiles

  mounted() {
    this.detectDevice();
    window.addEventListener("resize", this.detectDevice);
    if (!this.isMobile) {
      window.addEventListener("wheel", this.handleScroll, { passive: true });
      window.addEventListener("keydown", this.handleKeydown); // Ajout de l'écoute du clavier
    }
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.detectDevice);
    if (!this.isMobile) {
      window.removeEventListener("wheel", this.handleScroll);
      window.removeEventListener("keydown", this.handleKeydown); // Suppression de l'écoute du clavier
    }
  }

  private detectDevice() {
    this.isMobile = window.innerWidth <= 768;
  }

  private handleScroll(event: WheelEvent) {
    const delta = event.deltaY;

    // Réduire la sensibilité pour les trackpads
    if (Math.abs(delta) < 50) return;

    if (delta > 0) {
      this.scrollApres();
    } else {
      this.scrollAvant();
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      this.scrollApres();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      this.scrollAvant();
    }
  }

  private scrollAvant() {
    this.index -= 1;
    this.update();
  }

  private scrollApres() {
    this.index += 1;
    this.update();
  }

  private update(): void {
    this.suivant = this.list[this.modulo(this.index + 1, this.list.length)];
    this.courant = this.list[this.modulo(this.index, this.list.length)];
    this.precedent = this.list[this.modulo(this.index - 1, this.list.length)];
  }

  private modulo(n: number, total: number): number {
    return ((n % total) + total) % total;
  }
}
</script>

<template>

  <div class="list-container">
    <!-- Boutons visibles uniquement sur mobile -->
    <div v-if="isMobile" class="nav-btn">
      <v-btn  @click="scrollAvant">Précédent</v-btn>
      <v-btn  @click="scrollApres">Suivant</v-btn>

    </div>
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
</div>
</template>


<style scoped>
.list-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  width: 100%;
  position: relative;
}

.preview-cards {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 50%;
}

.front-card {
  transform: scale(1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.front-card:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
}

.back-cards {
  opacity: 0.5;
  transform: scale(0.9);
}


/* Boutons pour mobile */
.nav-btn {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  right: 0;
}
</style>
