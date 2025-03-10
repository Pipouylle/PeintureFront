<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListSemaineComponent from "@/component/lists/ListSemaineComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, ListSemaineComponent, Menu}
})
export default class ListSemaineView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListSemaineComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>