<script lang="ts">

import {Component, Vue, Watch} from "vue-facing-decorator";
import ProjectPreviewList from "@/component/ProjectPreviewList.vue";

@Component({
  components: {
    ProjectPreviewList
  },

})
export default class HomeView extends Vue {
}
</script>

<template>

  <div class="bg">
    <project-preview-list/>
  </div>


</template>

<style scoped>

.bg {
  background: linear-gradient(to bottom, #ffffff, #4f4c4c);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}



</style>
