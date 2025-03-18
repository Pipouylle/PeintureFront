<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {avancementStore} from "@/stores/AvancementStore";
import {useRouter} from "vue-router";

@Component({})
export default class SelectJourComponent extends Vue {
   private store = avancementStore();
   private router = useRouter();

   get getJour() {
      return this.store.avancementModel.jour + ' - ' + new Date(this.store.avancementModel.date).toLocaleDateString();
   }

   retour() {
      this.router.back();
   };
}
</script>

<template>
   <v-card>
      <v-row justify="space-between" class="ma-3">
         <v-btn @click="store.previousJour" size="x-large">
            <v-icon>mdi-arrow-left-bold</v-icon>
         </v-btn>
         <v-text-field
             variant="outlined"
             readonly
             v-model="getJour"
             outlined
             dense
             class="select text-h3 w-auto">
         </v-text-field>
         <v-btn @click="store.nextJour" size="x-large">
            <v-icon>mdi-arrow-right-bold</v-icon>
         </v-btn>
         <v-spacer></v-spacer>
         <v-btn-group v-for="(cabine, index) in this.store.avancementModel.cabines" :key="index">
            <v-btn @click="this.store.avancementModel.cabine = cabine"
                   variant="outlined"
                   :color="this.store.avancementModel.cabine === cabine ? 'blue' : 'grey'"
            >{{cabine}}</v-btn>
         </v-btn-group>
         <v-spacer></v-spacer>
         <v-btn-group v-for="(temp, index) in this.store.avancementModel.temps" :key="index">
            <v-btn @click="this.store.avancementModel.temp = temp"
                   variant="outlined"
                   :color="this.store.avancementModel.temp === temp ? 'blue' : 'grey'"
            >{{temp}}</v-btn>
         </v-btn-group>
         <v-spacer></v-spacer>
         <v-btn size="x-large" color="primary" @click="retour"> Retour</v-btn>
      </v-row>
   </v-card>
</template>

<style scoped>

</style>