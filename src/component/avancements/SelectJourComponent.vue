<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {avancementStore} from "@/stores/AvancementStore";
import {useRouter} from "vue-router";
import {listSemaineStore} from "@/stores/SemaineStore";
import {Semaine} from "@/models/types/semaine";

@Component({})
export default class SelectJourComponent extends Vue {
   private store = avancementStore();
   private router = useRouter();
   private semaineStore = listSemaineStore();
   get availableYears() {
      return [...new Set(this.semaineStore.listSemaine.semaines.map((semaine: Semaine) => semaine.annee))];
   }

   get availableWeeks() {
      return this.semaineStore.listSemaine.semaines
          .filter((semaine: Semaine) =>
              semaine.annee === this.store.avancementModel.semaine.annee)
          .map((semaine: Semaine) => semaine.semaine);
   }

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
         <v-col cols="2" class="select">
            <v-select
                label="Année"
                :items="availableYears"
                item-value="Se"
                density="compact"
                outlined
                dense
                v-model="this.store.avancementModel.semaine.annee"
                @update:model-value="this.store.avancementModel.semaine.mois = 0; this.store.avancementModel.semaine.semaine = 0"
            ></v-select>
         </v-col>
         <v-col cols="1">
            <v-select
                :disabled="!this.store.avancementModel.semaine.annee"
                :items="availableWeeks"
                label="Semaine"
                density="compact"
                outlined
                dense
                v-model="this.store.avancementModel.semaine.semaine"
            ></v-select>
         </v-col>
         <v-btn @click="store.previousSemaine" size="x-large">
            <v-icon>mdi-arrow-left-bold</v-icon>
         </v-btn>
         <v-btn @click="store.nextSemaine" size="x-large">
            <v-icon>mdi-arrow-right-bold</v-icon>
         </v-btn>
         <v-spacer></v-spacer>
         <!--
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
         -->
         <v-spacer></v-spacer>
         <v-btn size="x-large" color="primary" @click="retour"> Retour</v-btn>
      </v-row>
   </v-card>
</template>

<style scoped>

</style>