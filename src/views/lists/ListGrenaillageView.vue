<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListGrenaillageComponent from "@/component/lists/ListGrenaillageComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, ListGrenaillageComponent, Menu}
})
export default class ListGrenaillageView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListGrenaillageComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>