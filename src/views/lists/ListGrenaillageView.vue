<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListGrenaillageComponent from "@/component/lists/ListGrenaillageComponent.vue";

@Component({
  components: {ListGrenaillageComponent, Menu}
})
export default class ListGrenaillageView extends Vue {

}
</script>

<template>
  <Menu/>
  <ListGrenaillageComponent/>
</template>

<style scoped>

</style>