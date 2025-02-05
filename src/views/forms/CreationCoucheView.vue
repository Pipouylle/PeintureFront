<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";

@Component({
  components: {CreerCoucheForm, NavBar}
})
export default class CreationCoucheView extends Vue {

}
</script>

<template>
  <NavBar/>
</template>

<style scoped>

</style>