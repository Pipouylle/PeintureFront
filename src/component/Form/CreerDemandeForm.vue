<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import ModifCoucheForDemande from "@/component/Form/ModifCoucheForDemande.vue";
import {getCommandeByAffaireAndSysteme} from "@/services/CommandesService";
import {DemandeFormStore} from "@/stores";
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

@Component({
  components: {ModifDemandeCouche: ModifCoucheForDemande}
})
export default class CreerDemandeForm extends Vue {
  private demandeFormstore = DemandeFormStore();

  mounted() {
    this.demandeFormstore.initialiser();
  }

  get formatedSysteme() {
    return this.demandeFormstore.demandeFrom.systemes.map((systeme: Systeme) => {
      return {
        title: systeme.nom + " - " + systeme.fournisseur,
        value: systeme.id
      }
    })
  }

  get formatedAffaire() {
    return this.demandeFormstore.demandeFrom.affaires.map((affaire: Affaire) => {
      return {
        title: affaire.numero + " - " + affaire.nom,
        value: affaire.id
      }
    });
  }

  onSelectAffaire() {
    const affaire = this.demandeFormstore.demandeFrom.affaires.find((affaire: Affaire) => affaire.id === this.demandeFormstore.demandeFrom.selectedAffaire?.value);
    if (affaire) {
      //TODO : filtrer les systemes avec l'affaire
    }
  }

  async onSelectSysteme(){
    const systeme = this.demandeFormstore.demandeFrom.systemes.find((systeme: Systeme) => systeme.id === this.demandeFormstore.demandeFrom.selectedSysteme?.value);
    const affaire = this.demandeFormstore.demandeFrom.affaires.find((affaire: Affaire) => affaire.id === this.demandeFormstore.demandeFrom.selectedAffaire?.value);
    if (systeme && affaire){
      this.demandeFormstore.demandeFrom.commandeDemande = await getCommandeByAffaireAndSysteme(affaire, systeme);
      const ArticlesCouches = await getArticleCoucheForDemande(this.demandeFormstore.demandeFrom.commandeDemande);
      for (const articleCouche of ArticlesCouches) {
        this.demandeFormstore.addModifCoucheDemande(createDefaultModifDemandeCoucheModel({
          id: this.demandeFormstore.modifCouchesDemande.length,
          SurfaceCouche: createDefaultSurfaceCouche({
            articleCouche: articleCouche
          }),
        }))
      }
    }
    /*if (systeme && affaire) {
      this.demandeFormstore.demandeFrom.commandeDemande = await getCommandeByAffaireAndSysteme(affaire, systeme);
      this.demandeFormstore.demandeFrom.commandeDemande.articles = await getArticleCoucheByCommande(this.demandeFormstore.demandeFrom.commandeDemande);
      const responseCouches = await getCouchesBySysteme(systeme.id);
      this.demandeFormstore.clearModifCoucheDemande();
      for (let i = 0; i < this.demandeFormstore.demandeFrom.commandeDemande.articles.length; i++) {
        this.demandeFormstore.demandeFrom.commandeDemande.articles[i].commande = this.demandeFormstore.demandeFrom.commandeDemande;
        this.demandeFormstore.demandeFrom.commandeDemande.articles[i].articles = await getArticlesByArticleCouche(this.demandeFormstore.demandeFrom.commandeDemande.articles[i]);
        //this.demandeFormstore.demandeFrom.commandeDemande.articles[i].couche = await getCoucheById(this.demandeFormstore.demandeFrom.commandeDemande.articles[i].couche.id);
        const couches = responseCouches.find(c => c.id == this.demandeFormstore.demandeFrom.commandeDemande.articles[i].couche.id)
        this.demandeFormstore.demandeFrom.commandeDemande.articles[i].couche = couches ? couches : this.demandeFormstore.demandeFrom.commandeDemande.articles[i].couche;
        this.demandeFormstore.addModifCoucheDemande(createDefaultModifDemandeCoucheModel({
          id: i,
          SurfaceCouche: createDefaultSurfaceCouche({
            articleCouche: this.demandeFormstore.demandeFrom.commandeDemande.articles[i]
          })
        }))
      }
    }*/
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
      const demande = createDefaultDemande({
        id: 0,
        numero: this.demandeFormstore.demandeFrom.numeroDemande,
        surface: this.demandeFormstore.demandeFrom.surfaceDemande,
        date: this.demandeFormstore.demandeFrom.dateDemande ? this.demandeFormstore.demandeFrom.dateDemande : String(new Date()),
        nombrePiece: this.demandeFormstore.demandeFrom.nombrePieceDemande,
        commande: this.demandeFormstore.demandeFrom.commandeDemande
      });
      const responseDemande = await creerDemande(demande);
      const responseSurfacecouche: SurfaceCouche[] = [];
      for (const modifCouche of this.demandeFormstore.modifCouchesDemande) {
        modifCouche.SurfaceCouche.demande = responseDemande;
        responseSurfacecouche.push(await creerSurfaceCouche(modifCouche.SurfaceCouche));
      }
      console.log(responseSurfacecouche);
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
                  label="Systemes"
                  :items="formatedSysteme"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="this.demandeFormstore.demandeFrom.selectedSysteme"
                  @update:model-value="onSelectSysteme"
                  return-object
              />
              <v-col align-self="center" justify="center">
                <v-row align="center" justify="center">
                  <v-text-field
                      label="Numero de la demande"
                      v-model="this.demandeFormstore.demandeFrom.numeroDemande"
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
                <v-number-input
                    v-model="this.demandeFormstore.demandeFrom.surfaceDemande"
                    label="surface"
                    outlined
                    dense
                ></v-number-input>
                <v-number-input
                    v-model="this.demandeFormstore.demandeFrom.nombrePieceDemande"
                    label="nombre de pièces"
                    variant="outlined"
                    dense
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