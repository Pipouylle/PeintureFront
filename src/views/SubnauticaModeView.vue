<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import SubnauticaModeComponent from "@/component/project/SubnauticaModeComponent.vue";


@Component({
  components: {SubnauticaModeComponent, NavBar}
})
export default class PikuTradeView extends Vue {

}
</script>

<template>
  <NavBar/>
  <subnautica-mode-component/>
</template>

<style scoped>

</style>