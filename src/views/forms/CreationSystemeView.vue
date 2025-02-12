<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerSystemeForm from "@/component/Form/CreerSystemeForm.vue";
import Menu from "@/component/common/Menu.vue";
@Component({
  components: {
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
</template>

<style scoped>

</style>