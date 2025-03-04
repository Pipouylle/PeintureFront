<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useAlert, useListStore} from "@/stores";
import {createUserStore} from "@/stores/UserStore";
import {useRouter} from "vue-router";

@Component({})
export default class CreerUserComponent extends Vue {
   private store = createUserStore();
   private router = useRouter();
   async submitForm() {
      if (await this.store.create()) {
         this.store.clear();
         this.router.push({name: 'listUser'});
      } else {
         useAlert().alert('Erreur lors de la création du fournisseur.');
      }
   }
}
</script>

<template>
   <v-container>
      <v-row align="center" justify="center" class="form-container">
         <v-col cols="12" md="8" lg="6">
            <v-card elevation="3">
               <v-card-title class="form-title">Créer un nouvel utilisateur</v-card-title>
               <v-card-text>
                  <v-form>
                     <v-text-field
                         label="Nom de l'utilisateur"
                         v-model="this.store.user.name"
                         outlined
                         dense
                         required
                     ></v-text-field>
                     <v-btn
                         color="primary"
                         class="mt-4"
                         block
                         size="large"
                         @click="submitForm"
                     >
                        <v-icon left>mdi-check-circle</v-icon>
                        Créer un utilisateur
                     </v-btn>
                  </v-form>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<style scoped>

</style>