<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {getAllSystemes} from "@/services/SystemesService";
import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {getAllAffaires} from "@/services/AffairesService";
import {createDefaultCommande} from "@/models/types/commande";
import {creerCommmande} from "@/services/CommandesService";
import ModifCoucheForCommande from "@/component/Form/ModifCoucheForCommande.vue";
import {CommandeFormStore} from "@/stores";
import {createDefaultModifCommandeCoucheModel} from "@/models/forms/CreerCommande/ModifCommandeCoucheModel";
import {createDefaultArticleCouche} from "@/models/types/articleCouche";
import {getCouchesBySysteme} from "@/services/CouchesService";
import {creerArticleCouche} from "@/services/ArticleCoucheService";
import {createDefaultSelectArticles} from "@/models/forms/CreerCommande/SelectArticles";

@Component({
  components: {ModifCommandeCouche: ModifCoucheForCommande, CreerCoucheForm}
})
//TODO: restock le prix mdr qui est dans tarif
export default class CreerCommandeForm extends Vue {
  private Systemes: Systeme[] = [];
  private selectedSysteme: { title: string; value: number } | null = null;
  private Affaires: Affaire[] = [];
  private selectedAffaire: { title: string; value: number } | null = null;
  private commentaire: string = '';
  private eureka: string = '';
  private FicheH: boolean = false;
  private pvCommande: boolean = false;

  private CommandeFormStore = CommandeFormStore();

  public async mounted() {
    this.Affaires = await getAllAffaires();
    await this.CommandeFormStore.setAllArticle();
    this.Systemes = await getAllSystemes();
  }

  get formatedSysteme() {
    return this.Systemes.map((systeme: Systeme) => {
      return {
        title: systeme.nom + " - " + systeme.fournisseur,
        value: systeme.id
      }
    })
  }

  get formatedAffaire() {
    return this.Affaires.map((affaire: Affaire) => {
      return {
        title: affaire.numero + " - " + affaire.nom,
        value: affaire.id
      }
    });
  }


  async onSystemeSelected() {
    const systeme = this.Systemes.find((systeme: Systeme) => systeme.id === this.selectedSysteme?.value);
    if (systeme) {
      this.CommandeFormStore.clearModifCoucheCommande();
      const couches = (await getCouchesBySysteme(systeme.id)).sort((a, b) => a.id - b.id);
      for (let i = 0; i < couches.length; i++) {
        this.CommandeFormStore.addModifCoucheCommande(createDefaultModifCommandeCoucheModel({
          id: i,
          articleCouche: createDefaultArticleCouche({
            couche: couches[i]
          }),
          articles: [createDefaultSelectArticles()]
        }))
      }
      console.log('il est correcte');
    }
  }

  public async submitForm() {
    try {
      if (!this.selectedAffaire || !this.selectedSysteme) {
        alert("c'est vide")
        return;
      }
      const commande = createDefaultCommande({
        eureka: this.eureka,
        commentaire: this.commentaire,
        ficheH: this.FicheH,
        pvPeinture: this.pvCommande,
        affaire: createDefaultAffaire({id: this.selectedAffaire.value}),
        systeme: createDefaultSysteme({id: this.selectedSysteme.value}),
      });
      const reponseCommande = await creerCommmande(commande);
      for (const modifCouche of this.CommandeFormStore.modifCouchesCommande) {
        modifCouche.articleCouche.commande = reponseCommande;
        await creerArticleCouche(modifCouche.articleCouche);
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
          <v-card-title class="form-title">Créer une nouvelle commande</v-card-title>
          <v-card-text>
            <v-form>
              <v-combobox
                  label="Affaires"
                  :items="formatedAffaire"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="selectedAffaire"
                  return-object
              ></v-combobox>
              <v-combobox
                  label="Systemes"
                  :items="formatedSysteme"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="selectedSysteme"
                  return-object
                  @update:model-value="onSystemeSelected"
              />
              <div v-for="ModifCommandeCouche in CommandeFormStore.modifCouchesCommande" :key="ModifCommandeCouche.id">
                <ModifCommandeCouche :modifCommandeCouche="ModifCommandeCouche"></ModifCommandeCouche>
              </div>

              <v-divider class="mt-4"></v-divider>
              <v-text-field
                  clearable
                  label="eureka"
                  variant="outlined"
                  v-model="eureka"
              ></v-text-field>
              <v-textarea
                  clearable
                  label="commentaire"
                  variant="outlined"
                  v-model="commentaire"
              ></v-textarea>
              <v-divider class="mt-4"></v-divider>
              <v-checkbox
                  v-model="FicheH"
                  label="Fiche H"
              ></v-checkbox>
              <v-checkbox
                  v-model="pvCommande"
                  label="pv commande"
              ></v-checkbox>
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