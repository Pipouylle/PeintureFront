<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CreerUserComponent from "@/component/Form/CreerUserComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, CreerUserComponent, Menu}
})
export default class CreationUserView extends Vue {

}
</script>

<template>
   <Menu/>
   <CreerUserComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>