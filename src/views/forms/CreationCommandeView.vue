<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import CreerCommandeForm from "@/component/Form/CreerCommandeForm.vue";
import Menu from "@/component/common/Menu.vue";

@Component({
  components: {Menu, CreerCommandeForm}
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