<script lang="ts">

import {Component, Vue} from "vue-facing-decorator";
import NavBar from "@/component/common/NavBar.vue";

@Component({
  components: {
    NavBar,
  },

})
export default class HomeView extends Vue {
}
</script>

<template>
  <NavBar/>
  <div> BONJOUR </div>
</template>

<style scoped>

</style>