<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import CreerCommandeForm from "@/component/Form/CreerCommandeForm.vue";
import Menu from "@/component/common/Menu.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
  components: {NotificationHandlerComponent, Menu, CreerCommandeForm}
})
export default class CreationCommandeView extends Vue {

}
</script>

<template>
 <Menu/>
  <CreerCommandeForm />
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>