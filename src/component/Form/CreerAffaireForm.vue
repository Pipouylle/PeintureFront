<template>
  <v-container>
    <v-row align="center" justify="center" class="form-container">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="3">
          <v-card-title class="form-title">Créer une nouvelle affaire</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Numéro de l'affaire"
                  v-model="this.AffaireFormStore.affaire.numero"
                  outlined
                  dense
                  required
                  prepend-icon="mdi-briefcase-outline"
              ></v-text-field>
              <v-text-field
                  label="Nom de l'affaire"
                  v-model="this.AffaireFormStore.affaire.nom"
                  outlined
                  dense
                  required
                  prepend-icon="mdi-briefcase-outline"
              ></v-text-field>
              <v-btn
                  color="primary"
                  class="mt-4"
                  block
                  size="large"
                  @click="submitForm"
              >
                <v-icon left>mdi-check-circle</v-icon> Créer affaire
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import { creerAffaire } from '@/services/AffairesService';

import { createDefaultAffaire} from "@/models/types/affaire";
import {AffaireFormStore} from "@/stores";
import {useRouter} from "vue-router";

@Component({})
export default class CreerAffaireForm extends Vue {
  private AffaireFormStore = AffaireFormStore();
  private router = useRouter();

  public async submitForm() {
    try {
      await this.AffaireFormStore.addAffaire(this.AffaireFormStore.affaire);
      alert('Affaire créée avec succès !');
      this.AffaireFormStore.clear();
      this.router.push({name: 'listAffaire'});
    } catch (error) {
      alert('Erreur lors de la création de l\'affaire.');
    }
  };
}
</script>

<style scoped>
.form-container {
  margin-top: 50px;
  padding: 20px;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #034335;
}
</style>
