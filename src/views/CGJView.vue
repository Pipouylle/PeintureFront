<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CGJComponent from "@/component/project/CGJComponent.vue";

@Component({
  components: {CGJComponent, NavBar}
})
export default class PikuTradeView extends Vue {

}
</script>

<template>
  <NavBar/>
  <CGJComponent/>
</template>

<style scoped>

</style>