<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import AvancementComponent from "@/component/avancements/AvancementComponent.vue";
import NotificationHandlerComponent from "@/component/common/NotificationHandlerComponent.vue";

@Component({
  components: {NotificationHandlerComponent, AvancementComponent, Menu}
})
export default class AvancementView extends Vue {

}
</script>

<template>
  <Menu/>
  <AvancementComponent/>
  <NotificationHandlerComponent/>
</template>

<style scoped>

</style>