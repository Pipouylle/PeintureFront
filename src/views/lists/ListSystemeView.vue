<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListSystemeComponentComponent from "@/component/lists/ListSystemeComponent.vue";

@Component({
  components: {ListSysteme: ListSystemeComponentComponent, Menu}
})
export default class ListSystemeView extends Vue {

}
</script>

<template>
  <Menu/>
  <ListSysteme/>
</template>

<style scoped>

</style>