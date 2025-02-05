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
                  v-model="numeroAffaire"
                  outlined
                  dense
                  required
                  prepend-icon="mdi-briefcase-outline"
              ></v-text-field>
              <v-text-field
                  label="Nom de l'affaire"
                  v-model="nomAffaire"
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
import { Vue, Component, Prop } from 'vue-facing-decorator';
import { ref } from 'vue';
import { creerAffaire } from '@/services/AffairesService';

import {Affaire, createDefaultAffaire} from "@/models/types/affaire";

@Component({})
export default class CreerAffaireForm extends Vue {
  private nomAffaire = '';
  private numeroAffaire: string = '';

  public async submitForm() {
    try {
      if (!this.nomAffaire) {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      const affaire = createDefaultAffaire({
        id: 0,
        numeroAffaire: this.numeroAffaire,
        nomAffaire: this.nomAffaire,
      });
      await creerAffaire(affaire);
      alert('Affaire créée avec succès !');
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

.v-card {
  border-radius: 16px;
  background-color: #1e1e2f;
  color: #ffffff;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #07bf9b;
}

.v-btn {
  background-color: #07bf9b;
  color: white;
  font-weight: bold;
}

.v-btn:hover {
  background-color: #06ac8b;
}

.v-text-field,
.v-date-picker {
  margin-bottom: 16px;
}

.v-card-text {
  padding: 20px;
}
</style>
