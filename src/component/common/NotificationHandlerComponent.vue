<script lang="ts">
import {Vue, Component, Watch} from 'vue-facing-decorator';
import {useNotificationStore} from "@/stores";
import NotificationComponent from "@/component/common/NotificationComponent.vue";
import NotificationHandler from "@/services/NotificationHandler";
import NotificationModel from "@/models/common/NotificationModel";

@Component({
  components: {NotificationComponent}
})
export default class NotificationHandlerComponent extends Vue {
  private notificationStore = useNotificationStore();

}
</script>

<template>
  <div class="handler">
    <div v-for="(item, index) in notificationStore.notifications" :key="index">
      <NotificationComponent :notification="item"/>
    </div>
  </div>
</template>

<style scoped>
.handler {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
}
</style>