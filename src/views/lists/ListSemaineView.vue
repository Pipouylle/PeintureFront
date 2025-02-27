<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListSemaineComponent from "@/component/lists/ListSemaineComponent.vue";

@Component({
   components: {ListSemaineComponent, Menu}
})
export default class ListSemaineView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListSemaineComponent/>
</template>

<style scoped>

</style>