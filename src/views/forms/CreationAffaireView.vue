<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerAffaireForm from "@/component/Form/CreerAffaireForm.vue";
import Menu from "@/component/common/Menu.vue";
@Component({
  components: {
    Menu,
    NavBar,
    CreerAffaireForm
  }
})
export default class CreationAffaireView extends Vue {

}
</script>

<template>
  <Menu />
  <CreerAffaireForm />
</template>

<style scoped>

</style>