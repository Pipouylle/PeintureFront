<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";
import ListSortieStockComponent from "@/component/lists/ListSortieStockComponent.vue";

@Component({
   components: {ListSortieStockComponent, NotificationHandlerComponent, Menu}
})
export default class ListStockSortieView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListSortieStockComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>