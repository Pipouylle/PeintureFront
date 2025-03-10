<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import ListDemandeComponent from "@/component/lists/ListDemandeComponent.vue";
import Menu from "@/component/common/Menu.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, Menu, ListDemandeComponent}
})
export default class ListDemandeView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListDemandeComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>