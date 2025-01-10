<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import ProjectPreview from "@/component/ProjectPreview.vue";
import ProjectPreviewModel from "@/models/ProjectPreviewModel";
import CGJProject from "@/views/CGJProject.vue";

@Component({
  components: {ProjectPreview}
})
export default class ProjectPreviewList extends Vue {

  private list: ProjectPreviewModel[] = [
    {
      title: "Projet 1",
      img: "https://cdn.vuetifyjs.com/images/cards/desert.jpg", project: CGJProject,
    },
    {
      title: "Projet 2",
      img: "https://cdn.vuetifyjs.com/images/cards/house.jpg", project: CGJProject,
    },
    {
      title: "Projet 3",
      img: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg", project: CGJProject,
    },
    {
      title: "Projet 4",
      img: "https://cdn.vuetifyjs.com/images/cards/forest.jpg", project: CGJProject,
    },
    {
      title: "Projet 5",
      img: "https://cdn.vuetifyjs.com/images/cards/plane.jpg", project: CGJProject,
    },

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
    return n - Math.floor(n / total) * total;
  }
}
</script>

<template>

  <v-btn @click="scrollAvant">Precedent</v-btn>
  <project-preview
      :title="precedent.title"
      :img="precedent.img"
      :project="precedent.project"
  />

  <project-preview
      :title="courant.title"
      :img="courant.img"
      :project="courant.project"
  />

  <project-preview
      :title="suivant.title"
      :img="suivant.img"
      :project="suivant.project"
  />
  <v-btn @click="scrollApres">Suivant</v-btn>


</template>

<style scoped>

</style>