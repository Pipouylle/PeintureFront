<script lang="ts">

import {Component, Vue} from "vue-facing-decorator";
import ProjectPreviewList from "@/component/ProjectPreviewList.vue";
import NavBar from "@/component/common/NavBar.vue";

@Component({
  components: {
    NavBar,
    ProjectPreviewList
  },

})
export default class HomeView extends Vue {
}
</script>

<template>
  <NavBar/>
  <project-preview-list/>
</template>

<style scoped>

</style>