<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import ReferundumComponent from "@/component/project/ReferundumComponent.vue";


@Component({
  components: {ReferundumComponent, NavBar}
})
export default class PikuTradeView extends Vue {

}
</script>

<template>
  <NavBar/>
  <ReferundumComponent/>
</template>

<style scoped>

</style>