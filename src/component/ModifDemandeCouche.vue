<script lang="ts">
import {Vue, Component, Prop} from 'vue-facing-decorator';
import {ModifDemandeCoucheModel} from "@/models/forms/ModifDemandeCoucheModel";
import SelectArticleComponent from "@/component/SelectArticleComponent.vue";

@Component({
  components: {SelectArticleComponent}
})
export default class ModifDemandeCouche extends Vue {
  @Prop({required: true}) private modifdemandeCouche!: ModifDemandeCoucheModel;


}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center" class="form-container">
      <v-col cols="20" md="10" lg="14">
        <v-card elevation="3">
          <v-card-title class="form-title">Nouvelle Couche</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="20">
                <v-text-field
                    label="Article"
                    outlined
                    dense
                    v-model="this.modifdemandeCouche.SurfaceCouche.coucheSurfaceCouche.id"
                    readonly
                ></v-text-field>
              </v-col>
              <v-col cols="20">
                <v-text-field
                    label="surface"
                    outlined
                    dense
                    v-model="this.modifdemandeCouche.surface"
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