<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CalendarView from "@/views/calendars/CalendarView.vue";

@Component({
  components: {CalendarView, Menu}
})
export default class CalendarCabine2View extends Vue {

}
</script>

<template>
  <Menu/>
  <CalendarView/>
</template>

<style scoped>

</style>