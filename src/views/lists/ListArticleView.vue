<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ListArticleComponent from "@/component/lists/ListArticleComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, ListArticleComponent, Menu}
})
export default class ListArticleView extends Vue {

}
</script>

<template>
   <Menu/>
   <ListArticleComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>

</style>