<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import calendar from "@/component/calendar/calendar.vue";
import NavBar from "@/component/common/NavBar.vue";
@Component({
  components: {NavBar, calendar}
})
export default class CalendarView extends Vue {

}
</script>

<template>
  <NavBar />
  <calendar />
</template>

<style scoped>

</style>