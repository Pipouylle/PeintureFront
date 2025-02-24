<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import Menu from "@/component/common/Menu.vue";
import CalendarViewComponent from "@/component/calendar2_0/CalendarViewComponent.vue";

@Component({
   components: {CalendarViewComponent, Menu}
})
export default class CalendarViewNew extends Vue {

}
</script>

<template>
   <Menu/>
   <CalendarViewComponent/>
</template>

<style scoped>

</style>