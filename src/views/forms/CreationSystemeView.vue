<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerSystemeForm from "@/component/Form/CreerSystemeForm.vue";
@Component({
  components: {
    NavBar,
    CreerSystemeForm
  }
})
export default class CreationSystemeView extends Vue {

}
</script>

<template>
  <NavBar />
  <CreerSystemeForm />
</template>

<style scoped>

</style>