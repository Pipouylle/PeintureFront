<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerDemandeForm from "@/component/Form/CreerDemandeForm.vue";
@Component({
  components: {
    NavBar,
    CreerDemandeForm
  }
})
export default class CreationDemandeView extends Vue {

}
</script>

<template>
  <NavBar />
  <CreerDemandeForm />
</template>

<style scoped>

</style>