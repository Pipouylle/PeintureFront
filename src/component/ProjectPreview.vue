<script lang="ts">
import {Vue, Component, Prop, Inject} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import ProjectPreviewModel from "@/models/ProjectPreviewModel";

@Component({})
export default class ProjectPreview extends Vue {
  @Prop({required: true}) private model!: ProjectPreviewModel;
  @Prop({required: false}) private sizeProp?: number;
  @Prop({required: false}) private canRedirect?: boolean;
  private router = useRouter();
  private size: number = 25;


  private async navigateToProject() {
    if (this.canRedirect) {
      const card = this.$el as HTMLElement;
      card.classList.add('animate');
      await new Promise((resolve) => setTimeout(resolve, 500));
      card.classList.remove('animate');
      await this.router.push({name: this.model.pathToProject});
    }
  }

  public mounted() {
    if (this.sizeProp) {
      this.size = this.sizeProp;
    }
  }
}
</script>

<template>
  <v-card class="project-card" @click="navigateToProject" :ripple="false">
    <div class="text-container">
      <div class="faded-top" :style="{ height: size + 'vh' }">
        <div class="blurry-content">
          <!-- Rend dynamiquement n'importe quel composant transmis -->
          <component :is="this.model.project"/>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2%; /* Utilisation de pourcentages pour le padding */
  box-shadow: 0 0.1em 0.2em rgba(0, 0, 0, 0.2);
  border-radius: 1em; /* Bord arrondi basé sur des unités relatives */
  transition: transform 0.4s, box-shadow 0.2s;
}

.text-container {
  width: 100%; /* Utilisation de 100% pour la largeur */
}

.faded-top::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  pointer-events: none;
}

.animate {
  animation: growAndFade 0.5s ease forwards;
}


@keyframes growAndFade {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.7);
    opacity: 0;
  }
}
</style>
