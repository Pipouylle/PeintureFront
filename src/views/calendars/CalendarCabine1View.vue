<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CalendarView from "@/views/calendars/CalendarView.vue";
import CalendarComponent from "@/component/calendar/calendarComponent.vue";
import {CalendarStore, ListStore} from "@/stores";

@Component({
  components: {CalendarComponent, Menu}
})
export default class CalendarCabine1View extends Vue {
  private CalendarStore = CalendarStore();
  private Lists = ListStore();
  async mounted() {
    this.CalendarStore.calendarModel.cabine = 'Cabine1';
    const semaine = this.Lists.getCurrentSemaine()
    console.log(semaine);
    this.CalendarStore.calendarModel.semaine = semaine ?? this.Lists.ListSemaine[0];
  }
}
</script>

<template>
  <Menu/>
  <CalendarComponent/>
</template>

<style scoped>

</style>