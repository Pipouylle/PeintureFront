<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerCommandeForm from "@/component/Form/CreerCommandeForm.vue";

@Component({
  components: {CreerCommandeForm, NavBar}
})
export default class CreationCommandeView extends Vue {

}
</script>

<template>
 <NavBar/>
  <CreerCommandeForm />
</template>

<style scoped>

</style>