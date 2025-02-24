<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {OfCalendar} from "@/models/calendar/OfCalendar";
import {useCalendar} from "@/stores";

@Component({})
export default class MoreInfoOfCalendarComponent extends Vue {
   @Prop({required: true}) private item!: OfCalendar;

   private async deleteOf() {
      console.log("deleteOf");
      await useCalendar().deletOf(this.item.id);
   }
}
</script>

<template>
   <v-card class="card">

      <v-btn @click="deleteOf" color="erreur">
         <v-icon>mdi-delete</v-icon>
      </v-btn>
   </v-card>
</template>

<style scoped>

</style>