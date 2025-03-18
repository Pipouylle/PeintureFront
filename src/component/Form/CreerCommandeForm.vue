<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {Systeme} from "@/models/types/systeme";
import {Affaire} from "@/models/types/affaire";
import ModifCoucheForCommande from "@/component/Form/ModifCoucheForCommande.vue";
import {createDefaultModifCoucheCommandeModel} from "@/models/forms/CreerCommande/ModifCoucheCommandeModel";
import {createDefaultArticleCouche} from "@/models/types/articleCouche";
import {getCouchesBySysteme} from "@/services/CouchesService";
import {createDefaultSelectArticles} from "@/models/forms/CreerCommande/SelectArticles";
import {useRouter} from "vue-router";
import {creationCommandeStore, listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import NotificationHandler from "@/services/NotificationHandler";
import {listGrenaillageStore} from "@/stores/GrenaillageStore";

@Component({
   components: {ModifCommandeCouche: ModifCoucheForCommande, CreerCoucheForm}
})

export default class CreerCommandeForm extends Vue {
   private store = creationCommandeStore();
   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private fournisseurStore = listFournisseurStore();
   private grenaillageStore = listGrenaillageStore();

   private router = useRouter();

   async mounted() {
      await this.store.load();
   };

   get formatedSysteme() {
      return this.systemeStore.listSysteme.systemes.map((systeme: Systeme) => {
         return {
            title: systeme.nom + " - " + this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === systeme.fournisseur.id)?.nom,
            value: systeme.id
         }
      })
   }

   get formatedAffaire() {
      return this.affaireStore.listAffaire.affaires.map((affaire: Affaire) => {
         return {
            title: affaire.numero + " - " + affaire.nom,
            value: affaire.id
         }
      });
   }

   get formatedRAl() {
      //TODO : récupére tou les ral de la bd ent les mettre là
      return true;
   }


   async onSystemeSelected() {
      const systeme = this.systemeStore.listSysteme.systemes.find((systeme: Systeme) => systeme.id === this.store.commandeFrom.selectedSysteme?.value);
      const verifCommande = this.commandeStore.listCommande.commandes.find((commande) => commande.affaire.id === this.store.commandeFrom.selectedAffaire?.value && commande.systeme.id === this.store.commandeFrom.selectedSysteme?.value);
      if (verifCommande) {
         NotificationHandler.showNewNotification('Une commande existe déjà pour cette affaire et ce système.');
         this.store.commandeFrom.selectedSysteme = null;
         return;
      }
      if (systeme) {
         this.store.listModifCouche = [];
         const couches = (await getCouchesBySysteme(systeme.id)).sort((a, b) => a.id - b.id);
         for (let i = 0; i < couches.length; i++) {
            this.store.addModifCouche(createDefaultModifCoucheCommandeModel({
               id: i,
               articleCouche: createDefaultArticleCouche({
                  couche: couches[i],
                  tarif: couches[i].tarif
               }),
               articles: [createDefaultSelectArticles()],
            }))
         }
      }
   }

   public async submitForm() {
      if (!this.store.commandeFrom.selectedAffaire || !this.store.commandeFrom.selectedSysteme) {
         alert("c'est vide")
         return;
      }
      this.store.commandeFrom.commande.affaire.id = this.store.commandeFrom.selectedAffaire.value;
      this.store.commandeFrom.commande.systeme.id = this.store.commandeFrom.selectedSysteme.value;
      this.store.commandeFrom.commande.regieSFP = this.systemeStore.listSysteme.systemes.find(systeme => systeme.id === this.store.commandeFrom.commande.systeme.id)?.refieSFP ?? 0;
      this.store.commandeFrom.commande.regieFP = this.systemeStore.listSysteme.systemes.find(systeme => systeme.id === this.store.commandeFrom.commande.systeme.id)?.refieFP ?? 0;
      this.store.commandeFrom.commande.grenaillage = this.grenaillageStore.listGrenaillage.find(grenaillage => grenaillage.id === this.systemeStore.listSysteme.systemes.find(system => system.id === this.store.commandeFrom.commande.systeme.id)?.grenaillage?.id)?.tarif ?? 0;
      this.store.commandeFrom.commande.articles = this.store.listModifCouche.map(modifCouche => {
         modifCouche.articleCouche.commande = this.store.commandeFrom.commande;
         return modifCouche.articleCouche;
      });
      if (await this.store.create(this.store.commandeFrom.commande)) {
         NotificationHandler.showNewNotification('Commande créée avec succès !');
         this.store.clear();
         this.router.push({name: 'listCommande'});
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la création de la commande.', true);
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
                         label="Affaire"
                         :items="formatedAffaire"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.commandeFrom.selectedAffaire"
                         return-object
                     ></v-combobox>
                     <v-combobox
                         label="Systeme"
                         :items="formatedSysteme"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.commandeFrom.selectedSysteme"
                         return-object
                         @update:model-value="onSystemeSelected"
                     />
                     <div v-for="ModifCommandeCouche in store.listModifCouche"
                          :key="ModifCommandeCouche.id">
                        <ModifCommandeCouche :modifCommandeCouche="ModifCommandeCouche"></ModifCommandeCouche>
                     </div>

                     <v-divider class="mt-4"></v-divider>
                     <v-text-field
                         clearable
                         label="Eureka"
                         variant="outlined"
                         v-model="this.store.commandeFrom.commande.eureka"
                     ></v-text-field>
                     <v-number-input
                         v-model="this.store.commandeFrom.commande.surface"
                         label="Surface"
                         :min="0"
                         variant="outlined"
                         dense
                     ></v-number-input>
                     <v-combobox
                         v-if="false"
                         variant="outlined"
                         label="RAL de le commande"
                         :items="formatedRAl"
                         v-model="this.store.commandeFrom.commande.ral"
                     ></v-combobox>

                     <v-number-input
                         variant="outlined"
                         label="RAL de le commande"
                         type="number"
                         v-model="this.store.commandeFrom.commande.ral"
                     ></v-number-input>
                     <v-textarea
                         clearable
                         label="Commentire"
                         variant="outlined"
                         v-model="this.store.commandeFrom.commande.commentaire"
                     ></v-textarea>
                     <v-divider class="mt-4"></v-divider>
                     <v-checkbox
                         v-model="this.store.commandeFrom.commande.ficheH"
                         label="Fiche H"
                     ></v-checkbox>
                     <v-checkbox
                         v-model="this.store.commandeFrom.commande.pvPeinture"
                         label="PV peinture"
                     ></v-checkbox>
                     <v-btn
                         color="primary"
                         class="mt-4"
                         block
                         size="large"
                         @click="submitForm"
                     >
                        <v-icon left>mdi-check-circle</v-icon>
                        Créer Commande
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