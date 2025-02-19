<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import ModifCoucheForDemande from "@/component/Form/ModifCoucheForDemande.vue";
import {getCommandeByAffaireAndSysteme} from "@/services/CommandesService";
import {DemandeFormStore, useAlert} from "@/stores";
import {createDefaultDemande} from "@/models/types/demande";
import {creerDemande} from "@/services/DemandesService";
import {createDefaultModifDemandeCoucheModel} from "@/models/forms/ModifDemandeCoucheModel";
import {createDefaultSurfaceCouche, SurfaceCouche} from "@/models/types/surfaceCouche";
import {creerSurfaceCouche} from "@/services/SurfaceCouchesService";
import {getArticleCoucheByCommande, getArticleCoucheForDemande} from "@/services/ArticleCoucheService";
import {Systeme} from "@/models/types/systeme";
import {Affaire} from "@/models/types/affaire";
import {getArticlesByArticleCouche} from "@/services/ArticlesService";
import {getCouchesBySysteme} from "@/services/CouchesService";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import {useRouter} from "vue-router";

@Component({
  components: {ModifDemandeCouche: ModifCoucheForDemande}
})
export default class CreerDemandeForm extends Vue {
  private demandeFormstore = DemandeFormStore();
  private router = useRouter();

  get formatedSysteme() {
    return this.demandeFormstore.listSysteme.systemes.map((systeme: Systeme) => {
      return {
        title: systeme.nom + " - " + systeme.fournisseur,
        value: systeme.id
      }
    })
  }

  get formatedCommande() {
     return this.demandeFormstore.listCommande.commandes.filter((commande: Commande) => commande.affaire.id === this.demandeFormstore.demandeFrom.selectedAffaire?.value).map((commande: Commande) => {
        return {
           title: commande.eureka + " - " + this.demandeFormstore.listSysteme.systemes.find((systeme: Systeme) => systeme.id === commande.systeme.id)?.nom,
           value: commande.id
        }
     });
  }

  get formatedAffaire() {
    return this.demandeFormstore.listAffaire.affaires.map((affaire: Affaire) => {
      return {
        title: affaire.numero + " - " + affaire.nom,
        value: affaire.id
      }
    });
  }

  async onSelectCommande(){
     const commande = this.demandeFormstore.listCommande.commandes.find((commande: Commande) => commande.id === this.demandeFormstore.demandeFrom.selectedCommande?.value);
     if (commande) {
        this.demandeFormstore.demandeFrom.demandeDemande.commande = commande;
        const ArticlesCouches = await getArticleCoucheForDemande(this.demandeFormstore.demandeFrom.demandeDemande.commande);
        for (const articleCouche of ArticlesCouches) {
           this.demandeFormstore.demandeFrom.demandeDemande.surfaceCouches.push(createDefaultSurfaceCouche({
              id: this.demandeFormstore.demandeFrom.demandeDemande.surfaceCouches.length,
              articleCouche: articleCouche
           }));
        }
     }
  }


  @Watch('demandeFormstore.demandeFrom.demandeDemande.surface', {deep: true, immediate: true})
  public updateSurface(newValue: number, oldValue: number) {
    for (const surfaceCouche of this.demandeFormstore.demandeFrom.demandeDemande.surfaceCouches) {
      if (surfaceCouche.surface == oldValue) {
        surfaceCouche.surface = newValue;
      }
    }
  }

  async submitForm() {
    try {
      this.demandeFormstore.demandeFrom.demandeDemande.date = this.demandeFormstore.demandeFrom.dateDemande ? this.demandeFormstore.demandeFrom.dateDemande : String(new Date());
      if (await this.demandeFormstore.listDemande.add(this.demandeFormstore.demandeFrom.demandeDemande)) {
        useAlert().alert('Demande créée avec succès !');
        this.demandeFormstore.clearDemandeFrom();
        this.router.push({name: 'listDemande'});
      } else {
        useAlert().alert('Erreur lors de la création de la demande.');
      }
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
              <v-combobox
                  label="Affaires"
                  :items="formatedAffaire"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="this.demandeFormstore.demandeFrom.selectedAffaire"
                  return-object
              ></v-combobox>
              <v-combobox
                  v-if="this.demandeFormstore.demandeFrom.selectedAffaire"
                  label="Commande"
                  :items="formatedCommande"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="this.demandeFormstore.demandeFrom.selectedCommande"
                  @update:model-value="onSelectCommande"
                  return-object
              />
              <v-col align-self="center" justify="center">
                <v-row align="center" justify="center">
                  <v-text-field
                      label="Numero de la demande"
                      v-model="this.demandeFormstore.demandeFrom.demandeDemande.numero"
                      outlined
                      dense
                      prepend-icon="mdi-briefcase-outline"
                  ></v-text-field>
                </v-row>
                <v-date-picker
                    v-model="this.demandeFormstore.demandeFrom.dateDemande"
                    label="Date de la demande"
                    outlined
                    dense
                    prepend-icon="mdi-calendar"
                ></v-date-picker>
                 <v-checkbox
                     label="reservation peinture"
                     v-model="demandeFormstore.demandeFrom.demandeDemande.reservation"
                 ></v-checkbox>
                <v-number-input
                    v-model="this.demandeFormstore.demandeFrom.demandeDemande.surface"
                    label="surface"
                    outlined
                    dense
                ></v-number-input>
                <v-number-input
                    v-model="this.demandeFormstore.demandeFrom.demandeDemande.nombrePiece"
                    label="nombre de pièces"
                    variant="outlined"
                    dense
                ></v-number-input>
                <div v-for="surfaceCouche in this.demandeFormstore.demandeFrom.demandeDemande.surfaceCouches"
                     :key="surfaceCouche.id">
                  <ModifDemandeCouche :surface-couche="surfaceCouche"/>
                </div>
                <v-btn
                    color="primary"
                    class="mt-4"
                    block
                    size="large"
                    @click="submitForm"
                >
                  <v-icon left>mdi-check-circle</v-icon>
                  Créer Demande
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