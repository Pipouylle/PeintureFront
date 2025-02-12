<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerCommandeForm from "@/component/Form/CreerCommandeForm.vue";
import Menu from "@/component/common/Menu.vue";

@Component({
  components: {Menu, CreerCommandeForm, NavBar}
})
export default class CreationCommandeView extends Vue {

}
</script>

<template>
 <Menu/>
  <CreerCommandeForm />
</template>

<style scoped>

</style>