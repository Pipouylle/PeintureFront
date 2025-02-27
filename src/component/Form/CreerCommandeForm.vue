<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import CreerCoucheForm from "@/component/Form/CreerCoucheForm.vue";
import {Systeme} from "@/models/types/systeme";
import {Affaire} from "@/models/types/affaire";
import ModifCoucheForCommande from "@/component/Form/ModifCoucheForCommande.vue";
import {CommandeFormStore, useAlert} from "@/stores";
import {createDefaultModifCommandeCoucheModel} from "@/models/forms/CreerCommande/ModifCommandeCoucheModel";
import {createDefaultArticleCouche} from "@/models/types/articleCouche";
import {getCouchesBySysteme} from "@/services/CouchesService";
import {createDefaultSelectArticles} from "@/models/forms/CreerCommande/SelectArticles";
import {useRouter} from "vue-router";

@Component({
   components: {ModifCommandeCouche: ModifCoucheForCommande, CreerCoucheForm}
})

//TODO : faire en sorte d'afficher un message d'erreur si une commande existe déjà pour cette affaire et ce systeme ou juste ne pas l'aficher avec un filtre
export default class CreerCommandeForm extends Vue {
   private CommandeFormStore = CommandeFormStore();
   private router = useRouter();

   get formatedSysteme() {
      return this.CommandeFormStore.listSysteme.systemes.map((systeme: Systeme) => {
         return {
            title: systeme.nom + " - " + this.CommandeFormStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === systeme.fournisseur.id)?.nom,
            value: systeme.id
         }
      })
   }

   get formatedAffaire() {
      return this.CommandeFormStore.listAffaire.affaires.map((affaire: Affaire) => {
         return {
            title: affaire.numero + " - " + affaire.nom,
            value: affaire.id
         }
      });
   }


   async onSystemeSelected() {
      const systeme = this.CommandeFormStore.listSysteme.systemes.find((systeme: Systeme) => systeme.id === this.CommandeFormStore.commandeFrom.selectedSysteme?.value);
      const verifCommande = this.CommandeFormStore.listCommande.commandes.find((commande) => commande.affaire.id === this.CommandeFormStore.commandeFrom.selectedAffaire?.value && commande.systeme.id === this.CommandeFormStore.commandeFrom.selectedSysteme?.value);
      if (verifCommande) {
         useAlert().alert('Une commande existe déjà pour cette affaire et ce système.');
         this.CommandeFormStore.commandeFrom.selectedSysteme = null;
         return;
      }
      if (systeme) {
         this.CommandeFormStore.clearModifCoucheCommande();
         const couches = (await getCouchesBySysteme(systeme.id)).sort((a, b) => a.id - b.id);
         for (let i = 0; i < couches.length; i++) {
            this.CommandeFormStore.addModifCoucheCommande(createDefaultModifCommandeCoucheModel({
               id: i,
               articleCouche: createDefaultArticleCouche({
                  couche: couches[i],
                  tarif: couches[i].tarif
               }),
               articles: [createDefaultSelectArticles()],
            }))
         }
         console.log('il est correcte');
      }
   }

   public async submitForm() {
      close();
      try {
         if (!this.CommandeFormStore.commandeFrom.selectedAffaire || !this.CommandeFormStore.commandeFrom.selectedSysteme) {
            alert("c'est vide")
            return;
         }
         this.CommandeFormStore.commandeFrom.commande.affaire.id = this.CommandeFormStore.commandeFrom.selectedAffaire.value;
         this.CommandeFormStore.commandeFrom.commande.systeme.id = this.CommandeFormStore.commandeFrom.selectedSysteme.value;
         this.CommandeFormStore.commandeFrom.commande.articles = this.CommandeFormStore.modifCouchesCommande.map(modifCouche => {
            modifCouche.articleCouche.commande = this.CommandeFormStore.commandeFrom.commande;
            return modifCouche.articleCouche;
         });
         //TODO : ajouter les commandeCalendar
         if (await this.CommandeFormStore.listCommande.add(this.CommandeFormStore.commandeFrom.commande)) {
            useAlert().alert('Commande créée avec succès !');
            this.CommandeFormStore.clearAll();
            this.router.push({name: 'listCommande'});
         } else {
            useAlert().alert('Erreur lors de la création de la commande.');
         }
      } catch (error) {
         console.error(error);
         useAlert().alert('Erreur lors de la création de la commande.');
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
                         v-model="this.CommandeFormStore.commandeFrom.selectedAffaire"
                         return-object
                     ></v-combobox>
                     <v-combobox
                         label="Systemes"
                         :items="formatedSysteme"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.CommandeFormStore.commandeFrom.selectedSysteme"
                         return-object
                         @update:model-value="onSystemeSelected"
                     />
                     <div v-for="ModifCommandeCouche in CommandeFormStore.modifCouchesCommande"
                          :key="ModifCommandeCouche.id">
                        <ModifCommandeCouche :modifCommandeCouche="ModifCommandeCouche"></ModifCommandeCouche>
                     </div>

                     <v-divider class="mt-4"></v-divider>
                     <v-text-field
                         clearable
                         label="Eureka"
                         variant="outlined"
                         v-model="this.CommandeFormStore.commandeFrom.commande.eureka"
                     ></v-text-field>
                     <v-number-input
                        v-model="this.CommandeFormStore.commandeFrom.commande.surface"
                        label="Surface"
                        :min="0"
                        variant="outlined"
                        dense
                     ></v-number-input>
                     <v-textarea
                         clearable
                         label="commentaire"
                         variant="outlined"
                         v-model="this.CommandeFormStore.commandeFrom.commande.commentaire"
                     ></v-textarea>
                     <v-divider class="mt-4"></v-divider>
                     <v-checkbox
                         v-model="this.CommandeFormStore.commandeFrom.commande.ficheH"
                         label="Fiche H"
                     ></v-checkbox>
                     <v-checkbox
                         v-model="this.CommandeFormStore.commandeFrom.commande.pvPeinture"
                         label="pv Peinture"
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