<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';

@Component({})
export default class ProjectPreview extends Vue {

  @Prop({required: true}) private title!: string;
  @Prop({required: true}) private img!: string;
  @Prop({required: true}) private project!: typeof Vue;

/*  private clickProject(){
    this.$router.push({name: this.project.name});
  }*/
}

</script>

<template>

  <!-- on affiche le titre -->
  <!-- on affiche l'img-->
  <!-- on affiche X pourcent de project -->
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-card-text>
      <v-img :src="img" height="200px"></v-img>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>