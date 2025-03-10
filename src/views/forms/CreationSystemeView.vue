<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerSystemeForm from "@/component/Form/CreerSystemeForm.vue";
import Menu from "@/component/common/Menu.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";
@Component({
  components: {
     NotificationHandlerComponent,
    Menu,
    NavBar,
    CreerSystemeForm
  }
})
export default class CreationSystemeView extends Vue {

}
</script>

<template>
  <Menu />
  <CreerSystemeForm />
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>