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

  <project-preview-list/>


</template>

<style scoped>

</style>
