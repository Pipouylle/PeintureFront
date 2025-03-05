<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {avancementStore} from "@/stores/AvancementStore";

@Component({})
export default class SelectJourComponent extends Vue {
   private store = avancementStore();
   get getJour() {
      return this.store.avancementModel.jour + ' - ' + new Date(this.store.avancementModel.date).toLocaleDateString();
   }
}
</script>

<template>
   <v-card>
      <v-row justify="space-between" class="ma-3">
         <v-btn @click="store.previousJour" size="x-large">
            <v-icon>mdi-arrow-left-bold</v-icon>
         </v-btn>
         <v-text-field
             required
             v-model="getJour"
             outlined
             dense
             class="select text-h3 w-auto">
         </v-text-field>
         <v-btn @click="store.nextJour" size="x-large">
            <v-icon>mdi-arrow-right-bold</v-icon>
         </v-btn>
      </v-row>
   </v-card>
</template>

<style scoped>

</style>