<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListArticleComponent from "@/component/lists/ListArticleComponent.vue";

@Component({
  components: {ListArticleComponent, Menu}
})
export default class ListArticleView extends Vue {

}
</script>

<template>
<Menu/>
  <ListArticleComponent/>
</template>

<style scoped>

</style>