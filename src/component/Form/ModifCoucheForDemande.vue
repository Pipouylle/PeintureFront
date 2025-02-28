<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {SurfaceCouche} from "@/models/types/surfaceCouche";

@Component({})
export default class ModifCoucheForDemande extends Vue {
  @Prop({required: true}) private surfaceCouche!: SurfaceCouche;
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="form-container">
      <v-col cols="40" md="10" lg="14">
        <v-card elevation="3">
          <v-card-title class="form-title">Surface de la Couche : {{ this.surfaceCouche.articleCouche.couche.nom }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="article in this.surfaceCouche.articleCouche.articles" cols="20">
                <v-text-field
                    label="Article"
                    outlined
                    dense
                    v-model="article.descriptif"
                    readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="20">
                <v-text-field
                    label="surface"
                    outlined
                    dense
                    v-model="this.surfaceCouche.surface"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>