<script lang="ts">

import {Component, Vue} from "vue-facing-decorator";
import NavBar from "@/component/common/NavBar.vue";
import Menu from "@/component/common/Menu.vue";
import {creationAffaireStore} from "@/stores/AffaireStore";

@Component({
  components: {
    Menu,
    NavBar,
  },

})
export default class HomeView extends Vue {
  mounted() {
    console.log(creationAffaireStore());
  }
}
</script>

<template>
  <Menu/>
</template>

<style scoped>

</style>