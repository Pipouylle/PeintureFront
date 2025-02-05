<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import NavBar from "@/component/common/NavBar.vue";
import SelectArticle from "@/component/SelectArticleComponent.vue";

@Component({
  components: {
    NavBar,
    SelectArticle
  }
})
export default class SelectArticleView extends Vue {

}
</script>

<template>
  <NavBar />
  <SelectArticle />
</template>

<style scoped>

</style>