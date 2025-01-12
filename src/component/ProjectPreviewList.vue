<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import ProjectPreview from "@/component/ProjectPreview.vue";
import ProjectPreviewModel from "@/models/ProjectPreviewModel";
import PikueTradeProjet from "@/views/PikueTradeProjet.vue";
import CGJProject2 from "@/views/CGJProject2.vue";
import CGJProject3 from "@/views/CGJProject3.vue";
import CGJProject4 from "@/views/CGJProject4.vue";

@Component({
  components: {ProjectPreview},
})
export default class ProjectPreviewList extends Vue {
  private list: ProjectPreviewModel[] = [
    {title: "Projet 1", project: PikueTradeProjet},
    {title: "Projet 2", project: CGJProject2},
    {title: "Projet 3", project: CGJProject3},
    {title: "Projet 4", project: CGJProject4},
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
      window.addEventListener("wheel", this.handleScroll, {passive: true});
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
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

  private modulo(n: number, total: number): number {
    return ((n % total) + total) % total;
  }

  private scrollAvant() {
    this.index = this.modulo(this.index - 1, this.list.length);
    this.update();
  }

  private scrollApres() {
    this.index = this.modulo(this.index + 1, this.list.length);
    this.update();
  }
  private update(): void {
    this.suivant = this.list[this.modulo(this.index + 1, this.list.length)];
    this.courant = this.list[this.modulo(this.index, this.list.length)];
    this.precedent = this.list[this.modulo(this.index - 1, this.list.length)];
  }


  private getDotClass(dotIndex: number): string {
    if (dotIndex === this.index) {
      return 'dot active';
    } else if (dotIndex === this.modulo(this.index - 1, this.list.length) || dotIndex === this.modulo(this.index + 1, this.list.length)) {
      return 'dot adjacent';
    } else {
      return 'dot';
    }
  }

  private scrollToIndex(dotIndex: number) {
    this.index = dotIndex;
    this.update();
  }
}
</script>

<template>
  <div class="list-container">
    <!-- Boutons visibles uniquement sur mobile -->
    <div v-if="isMobile" class="nav-btn">
      <button @click="scrollAvant" class="mdi mdi-menu-up btn"></button>
      <button @click="scrollApres" class="mdi mdi-menu-down btn"></button>
    </div>
    <div class="preview-cards">
      <project-preview @click="scrollAvant"
                       :title="precedent.title"
                       :project="precedent.project"
                       class="back-cards"
      />
      <project-preview
          :title="courant.title"
          :project="courant.project"
          :can-redirect="true"
          size-prop="30"
          class="front-card"
      />
      <project-preview @click="scrollApres"
                       :title="suivant.title"
                       :project="suivant.project"
                       class="back-cards"
      />
    </div>
    <div v-if="!isMobile" class="dots">
      <span v-for="(item, dotIndex) in list" :key="dotIndex" :class="getDotClass(dotIndex)" @click="scrollToIndex(dotIndex)"></span>
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
  width: 75%;
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
  right: 4vw;
}

.btn {
  display: block;
  border-radius: 50%; /* Assure un cercle parfait */
  border: 2px solid #ccc; /* Ajout d'une bordure fine */
}

/* Dots styles */
.dots {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 10vw;
  top: 50%;
  transform: translateY(-50%);
}

.dot {
  width: 12px;
  height: 12px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 5px 0;
  cursor: pointer;
  opacity: 0.5;
}

.dot.adjacent {
  opacity: 0.75;
}

.dot.active {
  width: 20px;
  height: 20px;
  opacity: 1;
}
</style>