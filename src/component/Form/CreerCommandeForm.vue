<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import SelectArticleComponent from "@/component/SelectArticleComponent.vue";
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {getAllSystemes} from "@/services/SystemesService";
import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {getAllAffaires} from "@/services/AffairesService";
import {createDefaultCommande} from "@/models/types/commande";
import {creerCommmande} from "@/services/CommandesService";

@Component({
  components: {CreerCoucheForm, SelectArticleComponent}
})
export default class CreerCommandeForm extends Vue {
  private Systemes: Systeme[] = [];
  private selectedSysteme: { title: string; value: number } | null = null;
  private Affaires: Affaire[] = [];
  private selectedAffaire: { title: string; value: number } | null = null;
  private commentaire: string = '';
  private eureka: string = '';
  private FicheH: boolean = false;
  private tarifFicheH: number = 0;
  private pvCommande: boolean = false;

  public async mounted() {
    this.Affaires = await getAllAffaires();
  }

  get formatedSysteme() {
    return this.Systemes.map((systeme: Systeme) => {
      return {
        title: systeme.nomSysteme,
        value: systeme.id
      }
    })
  }

  get formatedAffaire() {
    return this.Affaires.map((affaire: Affaire) => {
      return {
        title: affaire.numeroAffaire + ' - ' + affaire.nomAffaire,
        value: affaire.id
      }
    });
  }

  async onAffaireSelected() {
    if (this.selectedAffaire) {
      this.Systemes = await getAllSystemes();
    }
  }

  public submitForm() {
    try {
      if (!this.selectedAffaire || !this.selectedSysteme) {
        throw new Error('Veuillez selectionner une affaire');
      }
      const commande = createDefaultCommande({
        eurekaCommande: this.eureka,
        commentaireCommande: this.commentaire,
        ficheHcommande: this.FicheH,
        tarifFicheHCommande: this.FicheH ? this.tarifFicheH : 0,
        idAffaireCommande: createDefaultAffaire({id: this.selectedAffaire.value}),
        idSystemeCommande: createDefaultSysteme({id: this.selectedSysteme.value}),
      });
      creerCommmande(commande);

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
                  @update:model-value="onAffaireSelected"
              ></v-combobox>
              <v-combobox
                  v-if="selectedAffaire"
                  label="Systemes"
                  :items="formatedSysteme"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="selectedSysteme"
                  return-object
              />

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
              <v-number-input
                  v-if="FicheH"
                  type="number"
                  label="tarif Fiche H"
                  v-model="tarifFicheH"
                  outlined
              ></v-number-input>
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