<script lang="ts">

import {Component, Vue} from "vue-facing-decorator";
import NavBar from "@/component/common/NavBar.vue";
import Menu from "@/component/common/Menu.vue";

@Component({
  components: {
    Menu,
    NavBar,
  },

})
export default class HomeView extends Vue {
}
</script>

<template>
  <Menu/>
</template>

<style scoped>

</style>