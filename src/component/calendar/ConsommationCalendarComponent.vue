<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {Consommation} from "@/models/types/consommation";

@Component({})
export default class ConsommationCalendarComponent extends Vue {
 @Prop({required : true}) consommation! : Consommation
}
</script>

<template>
  <v-card>
    <v-card-title>{{consommation.article.id}}</v-card-title>
    <v-card-text>
      <v-number-input
      :reverse="true"
      :min="0"
      controlVariant="split"
      label="nombre d'article sortie"
      v-model="consommation.quantiter"
      variant="outlined"
      dense
      ></v-number-input>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>