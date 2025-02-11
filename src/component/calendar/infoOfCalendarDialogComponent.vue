<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {OfCalendar} from "@/models/calendar/OfCalendar";
import ConsommationCalendarComponent from "@/component/calendar/ConsommationCalendarComponent.vue";
import {deleteOf} from "@/services/OfsService";
import {OfCalendarmapper} from "@/mappers/OfCalendarmapper";
import {CalendarStore} from "@/stores";

@Component({
  components: {ConsommationCalendarComponent}
})
export default class infoOfCalendarDialogComponent extends Vue {
  @Prop({required: true}) private of!: OfCalendar;
  private calendar = CalendarStore();

  private async deletOf() {
    await deleteOf(OfCalendarmapper.mapOf(this.of));
    this.calendar.ofsCalendar = this.calendar.ofsCalendar.filter(of => of.id !== this.of.id);
  }
}
</script>

<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="12">
          <v-card-title>{{ of.idDemandeOf.numeroDemande }}</v-card-title>
        </v-col>
        <v-col cols="12">
          <v-card-title>{{ of.idDemandeOf.numeroAffaire }}</v-card-title>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-card v-for="consommation in of.consommationOf" :key="consommation.id">
        <ConsommationCalendarComponent :consommation="consommation"/>
      </v-card>
      <v-card>
        <v-btn
            @click="deletOf"
            color="primary"
            dark
            variant="outlined"
        ></v-btn>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>