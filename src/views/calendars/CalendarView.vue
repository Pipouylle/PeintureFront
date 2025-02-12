<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import calendar from "@/component/calendar/calendar.vue";
import Menu from "@/component/common/Menu.vue";

@Component({
  components: {Menu, calendar}
})
export default class CalendarView extends Vue {

}
</script>

<template>
  <Menu/>
  <calendar/>
</template>

<style scoped>

</style>