<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerDemandeForm from "@/component/Form/CreerDemandeForm.vue";
import Menu from "@/component/common/Menu.vue";
@Component({
  components: {
    Menu,
    NavBar,
    CreerDemandeForm
  }
})
export default class CreationDemandeView extends Vue {

}
</script>

<template>
  <Menu />
  <CreerDemandeForm />
</template>

<style scoped>

</style>