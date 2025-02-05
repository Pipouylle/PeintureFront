<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-facing-decorator';
import ModifDemandeCouche from "@/component/ModifDemandeCouche.vue";
import {CommandesAffairesSystemes} from "@/models/objectsApi/CommandesAffairesSystemes";
import {getCommandeAffairesystemes} from "@/services/CommandesService";
import {DemandeFormStore} from "@/stores";
import {createDefaultDemande} from "@/models/types/demande";
import {createDefaultCommande} from "@/models/types/commande";
import {creerDemande, getCouchesDemande} from "@/services/DemandesService";
import {createDefaultModifDemandeCoucheModel} from "@/models/forms/ModifDemandeCoucheModel";
import {Couches} from "@/models/objectsApi/Couches";
import {Couche} from "@/models/types/couche";
import {createDefaultSurfaceCouche, SurfaceCouche} from "@/models/types/surfaceCouche";
import {creerSurfaceCouche} from "@/services/SurfaceCouchesService";

@Component({
  components: {ModifDemandeCouche}
})
export default class CreerDemandeForm extends Vue {
  private demandeFormstore = DemandeFormStore();

  async mounted() {
    if (this.demandeFormstore.demandeFrom.commandeItem.length === 0) {
      this.demandeFormstore.demandeFrom.commandeItem = await getCommandeAffairesystemes();
      this.demandeFormstore.demandeFrom.commandeItem.sort((a, b) => {
        if (b.idAffaireCommande !== a.idAffaireCommande) {
          return b.idAffaireCommande - a.idAffaireCommande;
        }
        return b.idCommande - a.idCommande;
      });
    }
  }

  retourCommande() {
    this.demandeFormstore.demandeFrom.selectedCommande = null;
    this.demandeFormstore.clearModifCoucheDemande();
  }

  async selecteCommande(event: any, row: any) {
    console.log(row.item);
    const Couches = await getCouchesDemande(row.item.idCommande);
    for (let i = 0; i < Couches.length; i++) {
      this.demandeFormstore.addModifCoucheDemande(createDefaultModifDemandeCoucheModel({
        id: i,
        SurfaceCouche: createDefaultSurfaceCouche({
          coucheSurfaceCouche: Couches[i]
        })
      }))
    }
    this.demandeFormstore.demandeFrom.selectedCommande = row.item;
  }

  @Watch('demandeFormstore.demandeFrom.surfaceDemande', {deep: true, immediate: true})
  public updateSurface(newValue: number, oldValue: number) {
    for (const modifCouche of this.demandeFormstore.modifCouchesDemande) {
      if (modifCouche.surface == oldValue) {
        modifCouche.surface = newValue;
      }
    }
  }

  async submitForm() {
    try {
      console.log('submitForm');
      if (this.demandeFormstore.demandeFrom.selectedCommande === null) {
        throw new Error('Veuillez selectionner une commande');
      }
      const array: number[] = [];
      for (const modifCouche of this.demandeFormstore.modifCouchesDemande) {
        array.push(modifCouche.SurfaceCouche.coucheSurfaceCouche.codeArticleCouche.id);
      }
      console.log(array);
      const demande = createDefaultDemande({
        id: 0,
        numeroDemande: this.demandeFormstore.demandeFrom.numeroDemande,
        numeroPhaseDemande: this.demandeFormstore.demandeFrom.numeroPhase,
        surfaceDemande: this.demandeFormstore.demandeFrom.surfaceDemande,
        idCommandeDemande: createDefaultCommande({
          id: this.demandeFormstore.demandeFrom.selectedCommande.idCommande,
        }),
      })
      const responseDemande = await creerDemande(demande);
      const responseSurfacecouche: SurfaceCouche[] = [];
      for (const modifCouche of this.demandeFormstore.modifCouchesDemande) {
        modifCouche.SurfaceCouche.demandeSurfaceCouche = responseDemande;
        responseSurfacecouche.push(await creerSurfaceCouche(modifCouche.SurfaceCouche));
      }

      this.demandeFormstore.clearDemandeFrom();
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
          <v-card-title class="form-title">

            Créer une nouvelle demande
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-data-table
                  v-if="!this.demandeFormstore.demandeFrom.selectedCommande"
                  :items="this.demandeFormstore.demandeFrom.commandeItem"
                  class="elevation-1"
                  :headers="this.demandeFormstore.demandeFrom.header"
                  @click:row="selecteCommande"
                  :no-data-text="`Aucune commande trouvé`"
                  density="compact"
                  fixed-header
                  height="400px"
              >
                <template v-slot:item.ficheHCommande="{ item }">
                  <v-icon :color="item.ficheHCommande ? 'green' : 'red'">
                    {{ item.ficheHCommande ? 'mdi-check' : 'mdi-close' }}
                  </v-icon>
                </template>
              </v-data-table>
              <v-col v-else align-self="center" justify="center">
                <v-row align="center" justify="center">
                  <v-btn
                      color="secondary"
                      @click="this.retourCommande()"
                      class="mb-4"
                  >
                    Retour aux commandes
                  </v-btn>
                  <v-text-field
                      label="Numero de la demande"
                      v-model="this.demandeFormstore.demandeFrom.numeroDemande"
                      outlined
                      dense
                      prepend-icon="mdi-briefcase-outline"
                  ></v-text-field>
                </v-row>
                <v-text-field
                    outlined
                    dense
                    label="Numero de Phase"
                    v-model="this.demandeFormstore.demandeFrom.numeroPhase"
                ></v-text-field>
                <v-number-input
                    v-model="this.demandeFormstore.demandeFrom.surfaceDemande"
                    label="surface"
                    outlined
                    dense
                    prepend-icon="mdi-briefcase-outline"
                ></v-number-input>

                <div v-for="ModifDemandeCoucheModel in this.demandeFormstore.modifCouchesDemande"
                     :key="ModifDemandeCoucheModel.id">
                  <ModifDemandeCouche :modifdemandeCouche="ModifDemandeCoucheModel"/>
                </div>
                <v-btn
                    color="primary"
                    class="mt-4"
                    block
                    size="large"
                    @click="submitForm"
                >
                  <v-icon left>mdi-check-circle</v-icon>
                  Créer affaire
                </v-btn>
              </v-col>
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
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: rgba(11, 14, 13, 0.75);
}
</style>