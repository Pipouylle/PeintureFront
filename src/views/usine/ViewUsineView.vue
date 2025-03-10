<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import ViewUsineComponent from "@/component/usine/ViewUsineComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
   components: {NotificationHandlerComponent, ViewUsineComponent, Menu}
})
export default class ViewUsineView extends Vue {

}
</script>

<template>
   <router-link to="/" class="router"/>
   <ViewUsineComponent/>
   <NotificationHandlerComponent/>
</template>

<style scoped>
.router {
   position: fixed;
   left: 0;
   top: 0;
   z-index: 1000;
   height: 100vh;
   border: #0b0e0d solid 1px;
   width: 2vw;
}
</style>