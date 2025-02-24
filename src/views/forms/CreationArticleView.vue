<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CreerArticleForm from "@/component/Form/CreerArticleForm.vue";

@Component({
   components: {CreerArticleForm, Menu}
})
export default class CreationArticleView extends Vue {

}
</script>

<template>
   <Menu/>
   <CreerArticleForm/>
</template>

<style scoped>

</style>