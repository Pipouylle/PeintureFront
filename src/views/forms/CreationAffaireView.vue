<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerAffaireForm from "@/component/Form/CreerAffaireForm.vue";
import Menu from "@/component/common/Menu.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
  components: {
    Menu,
    NavBar,
    CreerAffaireForm,
    NotificationHandlerComponent
  }
})
export default class CreationAffaireView extends Vue {

}
</script>

<template>
  <Menu />
  <CreerAffaireForm />
  <NotificationHandlerComponent />
</template>

<style scoped>

</style>