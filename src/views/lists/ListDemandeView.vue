<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import ListDemandeComponent from "@/component/lists/ListDemandeComponent.vue";
import Menu from "@/component/common/Menu.vue";

@Component({
  components: {Menu, ListDemandeComponent}
})
export default class ListDemandeView extends Vue {

}
</script>

<template>
  <Menu/>
  <ListDemandeComponent/>
</template>

<style scoped>

</style>