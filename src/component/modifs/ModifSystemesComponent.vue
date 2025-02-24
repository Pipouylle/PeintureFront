<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {ModifSystemeStore, SystemeFormStore, useAlert} from "@/stores";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
import {getAllGrenaillage} from "@/services/GrenaillagesService";
import {createDefaultSysteme} from "@/models/types/systeme";
import {useRouter} from "vue-router";

@Component({
   components: {CreerCoucheForm}
})

//TODO : ne fait pas les couhe et ne marche pas pour le grenaillage
export default class ModifSystemesComponent extends Vue {
   private ModifSysteme = ModifSystemeStore();
   private router = useRouter();


   get formatedGrenaillages() {
      return this.ModifSysteme.listgrenaillages.grenaillages.map((grenaillage: Grenaillage) => {
         return {
            title: "" + grenaillage.nom + " - " + grenaillage.typeChantier,
            value: grenaillage.id
         }
      })
   }


   public async submitForm() {
      try {
         console.log(this.ModifSysteme.selectGrenaillage);
         this.ModifSysteme.systeme.grenaillage = this.ModifSysteme.selectGrenaillage ? this.ModifSysteme.listgrenaillages.grenaillages.find((grenaillage: Grenaillage) => grenaillage.id === this.ModifSysteme.selectGrenaillage?.value) ?? null : null;
         if (await this.ModifSysteme.listSystemes.modif(this.ModifSysteme.systeme)) {
            useAlert().alert('Systeme créée avec succès !');
         } else {
            useAlert().alert('Erreur lors de la création du systeme.');
         }
         this.ModifSysteme.systeme = createDefaultSysteme();
         this.router.push({name: 'listSysteme'});
      } catch (error) {
         console.error(error);
      }
   }
}

</script>

<template>
   <v-container>
      <v-row align="center" justify="center" class="form-container">
         <v-col cols="12" md="8" lg="12">
            <v-card elevation="3">
               <v-card-title class="form-title">Modifier un systeme</v-card-title>
               <v-card-text>
                  <v-form>
                     <v-text-field
                         label="Nom du systeme"
                         v-model="this.ModifSysteme.systeme.nom"
                         outlined
                         dense
                         prepend-icon="mdi-briefcase-outline"
                     ></v-text-field>
                     <v-text-field
                         label="fournisseur"
                         v-model="this.ModifSysteme.systeme.fournisseur"
                         outlined
                         dense
                     ></v-text-field>
                     <v-combobox
                         label="grenaillage"
                         :items="formatedGrenaillages"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.ModifSysteme.selectGrenaillage"
                     ></v-combobox>
                     <v-text-field
                         label="tarif regieSFP"
                         v-model="this.ModifSysteme.systeme.refieSFP"
                         outlined
                         dense
                         type="number"
                     ></v-text-field>
                     <v-text-field
                         label="tarif regieFP"
                         v-model="this.ModifSysteme.systeme.refieFP"
                         outlined
                         dense
                         type="number"
                     ></v-text-field>
                     <div v-for="couche in this.ModifSysteme.systeme.couches" :key="couche.id">
                        <CreerCoucheForm :couche="couche"/>
                     </div>

                     <v-btn
                         color="primary"
                         class="mt-4"
                         block
                         size="large"
                         @click="submitForm"
                     >
                        <v-icon left>mdi-check-circle</v-icon>
                        Modifier systeme
                     </v-btn>
                  </v-form>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<style scoped>
.form-container {
   margin-top: 50px;
   padding: 20px;
}

.form-title {
   font-size: 20px;
   font-weight: bold;
   text-align: center;
   color: #044336;
}
</style>