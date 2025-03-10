<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListFournisseurComponent from "@/component/lists/ListFournisseurComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, ListFournisseurComponent, Menu}
})
export default class ListFournisseurView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListFournisseurComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>