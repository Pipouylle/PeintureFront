<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import PikuTradeComponent from "@/component/project/PikuTradeComponent.vue";

@Component({
  components: {PikuTradeComponent, NavBar}
})
export default class PikuTradeView extends Vue {

}
</script>

<template>
  <NavBar/>
  <PikuTradeComponent/>
</template>

<style scoped>

</style>