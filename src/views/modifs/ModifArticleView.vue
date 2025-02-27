<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ModifArticleComponent from "@/component/modifs/ModifArticleComponent.vue";

@Component({
   components: {ModifArticleComponent, Menu}
})
export default class ModifArticleView extends Vue {

}
</script>

<template>
   <Menu/>
   <ModifArticleComponent/>
</template>

<style scoped>

</style>