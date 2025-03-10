<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListUserComponent from "@/component/lists/ListUserComponent.vue"
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, Menu, ListUserComponent}
})
export default class ListUserView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListUserComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>