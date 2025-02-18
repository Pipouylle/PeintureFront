<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {Affaire} from "@/models/types/affaire";
import {updateAffaire} from "@/services/AffairesService";
import {useRouter} from "vue-router";

@Component({})
export default class ModifAffaireComponent extends Vue {
  @Prop({required: true}) private affaire!: Affaire;
  private router = useRouter();

  async submitForm() {
    try {
      await updateAffaire(this.affaire);
      this.router.push({name: 'listAffaire'});
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<template>
  <v-container>
    <v-card class="container">
      <v-card-title> Modification d'une affaire </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
              label="Nom de l'affaire"
              v-model="affaire.nom"
              variant="outlined"
          ></v-text-field>
          <v-text-field
              label="Numéro de l'affaire"
              v-model="affaire.numero"
              variant="outlined"
          ></v-text-field>
          <v-btn
              color="primary"
              class="mt-4"
              block
              size="large"
              @click="submitForm"
          >
            <v-icon left>mdi-check-circle</v-icon> Modifier affaire
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>