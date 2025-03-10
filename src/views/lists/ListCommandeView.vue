<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListCommandeComponent from "@/component/lists/ListCommandeComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, ListCommandeComponent, Menu}
})
export default class ListCommandeView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListCommandeComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>