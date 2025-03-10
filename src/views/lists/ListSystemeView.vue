<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListSystemeComponentComponent from "@/component/lists/ListSystemeComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, ListSysteme: ListSystemeComponentComponent, Menu}
})
export default class ListSystemeView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListSysteme/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>