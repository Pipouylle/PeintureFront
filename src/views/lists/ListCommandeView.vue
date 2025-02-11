<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListCommandeComponent from "@/component/lists/ListCommandeComponent.vue";

@Component({
  components: {ListCommandeComponent, Menu}
})
export default class ListCommandeView extends Vue {

}
</script>

<template>
  <Menu/>
  <ListCommandeComponent/>
</template>

<style scoped>

</style>