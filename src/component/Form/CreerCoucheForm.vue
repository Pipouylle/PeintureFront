<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {CreerCoucheFormModel} from "@/models/forms/CreerCoucheFormModel";
import {Couche} from "@/models/types/couche";

@Component({})

//TODO: vraiment régler le probleme
export default class CreerCoucheForm extends Vue {
  @Prop({required: true}) private couche!: Couche;
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="form-container">
      <v-col cols="20" md="10" lg="14">
        <v-card elevation="3">
          <v-card-title class="form-title">Couche {{this.couche.nom}}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                    label="Nom de la couche"
                    outlined
                    dense
                    v-model="this.couche.nom"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-number-input
                    label="epaisseur"
                    outlined
                    dense
                    v-model="this.couche.epaisseur"
                ></v-number-input>
              </v-col>
              <v-col>
                <v-number-input
                    label="tarif"
                    outlined
                    dense
                    v-model="this.couche.tarif"
                ></v-number-input>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.form-container {
  margin-top: 20px;
  padding: 5px;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #044336;
}
</style>