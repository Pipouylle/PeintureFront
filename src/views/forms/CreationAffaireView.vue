<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerAffaireForm from "@/component/Form/CreerAffaireForm.vue";
@Component({
  components: {
    NavBar,
    CreerAffaireForm
  }
})
export default class CreationAffaireView extends Vue {

}
</script>

<template>
  <NavBar />
  <CreerAffaireForm />
</template>

<style scoped>

</style>