<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CreerArticleForm from "@/component/Form/CreerArticleForm.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, CreerArticleForm, Menu}
})
export default class CreationArticleView extends Vue {

}
</script>

<template>
   <Menu/>
   <CreerArticleForm/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>