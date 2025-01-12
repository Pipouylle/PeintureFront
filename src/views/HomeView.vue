<script lang="ts">

import {Component, Vue, Watch} from "vue-facing-decorator";
import ProjectPreviewList from "@/component/ProjectPreviewList.vue";
import Footer from "@/component/common/Footer.vue";

@Component({
  components: {
    Footer,
    ProjectPreviewList
  },

})
export default class HomeView extends Vue {
}
</script>

<template>
  <project-preview-list/>
  <Footer/>
</template>

<style scoped>

</style>