<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";

@Component({
  components: {
    NavBar
  }
})
export default class SelectArticleView extends Vue {

}
</script>

<template>
  <NavBar />
</template>

<style scoped>

</style>