<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import NotificationModel from "@/models/common/NotificationModel";

@Component({})
export default class NotificationComponent extends Vue {
  @Prop({required: true}) private readonly notification!: NotificationModel;
}
</script>

<template>
  <div class="notification">
    <v-chip variant="flat" :color="notification.onerror ? 'red' : 'green'"
            :prepend-icon="notification.onerror ? 'mdi-alert-circle' : 'mdi-checkbox-marked-circle'"
            class="text-h4 ma-2">
      {{ notification.message }}
    </v-chip>
  </div>
</template>

<style scoped>
.notification {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}
</style>