<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CreerFournisseurComponent from "@/component/Form/CreerFournisseurComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, CreerFournisseurComponent, Menu}
})
export default class CreationFounisseurView extends Vue {

}
</script>

<template>
   <Menu/>
   <CreerFournisseurComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>