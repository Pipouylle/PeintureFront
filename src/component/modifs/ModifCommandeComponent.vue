<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {useAlert} from "@/stores";
import {useRouter} from "vue-router";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {createDefaultArticle} from "@/models/types/article";
import ModifCoucheForCommande from "@/component/Form/ModifCoucheForCommande.vue";
import {createDefaultModifCoucheCommandeModel} from "@/models/forms/CreerCommande/ModifCoucheCommandeModel";
import {createDefaultSelectArticles} from "@/models/forms/CreerCommande/SelectArticles";
import {getArticlesCoucheByDemande} from "@/services/CouchesService";
import {getArticleCoucheBySystemeAndCommande} from "@/services/ArticleCoucheService";
import {updateCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import NotificationHandler from "@/services/NotificationHandler";


@Component({
   components:{ModifCommandeCouche: ModifCoucheForCommande}
})

export default class ModifCommandeComponent extends Vue {
   private store = updateCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private fournisseurStore = listFournisseurStore();
   private router = useRouter();


   async mounted() {
      await this.store.load();
      this.store.commandeModif.selectedAffaire = this.store.commandeModif.commande.affaire ? {
         title: this.affaireStore.listAffaire.affaires.find(affaire => affaire.id === this.store.commandeModif.commande.affaire.id)?.numero + " - " + this.affaireStore.listAffaire.affaires.find(affaire => affaire.id === this.store.commandeModif.commande.affaire.id)?.nom,
         value: this.store.commandeModif.commande.affaire.id
      } : null;
      this.store.commandeModif.selectedSysteme = this.store.commandeModif.commande.systeme ? {
         title: this.systemeStore.listSysteme.systemes.find(systeme => systeme.id === this.store.commandeModif.commande.systeme.id)?.nom + " - " + this.fournisseurStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === this.systemeStore.listSysteme.systemes.find(systeme => systeme.id === this.store.commandeModif.commande.systeme.id)?.fournisseur.id)?.nom,
         value: this.store.commandeModif.commande.systeme.id
      } : null;
      const systeme = this.systemeStore.listSysteme.systemes.find((systeme: Systeme) => systeme.id === this.store.commandeModif.selectedSysteme?.value);
      if (systeme){
         this.store.modifCouches = [];
         const responseSelectArticles = await getArticleCoucheBySystemeAndCommande(systeme.id, this.store.commandeModif.commande.id);
         for (const responseSelectArticle of responseSelectArticles) {
            this.store.addModifCouche(createDefaultModifCoucheCommandeModel({
               id : this.store.modifCouches.length,
               articleCouche: responseSelectArticle,
            }));
            if (responseSelectArticle.articles.length === 0){
               this.store.modifCouches[this.store.modifCouches.length -1].articles.push(createDefaultSelectArticles(
                   {id: this.store.modifCouches[this.store.modifCouches.length -1].articles.length}
               ));
            } else {
               for (const article of responseSelectArticle.articles) {
                  this.store.modifCouches[this.store.modifCouches.length -1].articles.push({
                     id: this.store.modifCouches[this.store.modifCouches.length -1].articles.length,
                     article : {title : article.descriptif, value : article.id},
                  })
               }
            }
         }
      }
   }


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

   async submitForm(){
      this.store.commandeModif.commande.articles = this.store.modifCouches.map(modifCouche => {
         modifCouche.articleCouche.commande = this.store.commandeModif.commande;
         return modifCouche.articleCouche;
      });
      if (await this.store.update(this.store.commandeModif.commande)){
         NotificationHandler.showNewNotification('Commande modifiée avec succès !');
         this.router.push({name: 'listCommande'});
      } else {
         NotificationHandler.showNewNotification('Erreur lors de la modification de la commande.', true);
         useAlert().alert('Erreur lors de la modification de la commande');
         console.error('Erreur lors de la modification de la commande');
      }
   }
}
</script>

<template>
   <v-container>
      <v-row align="center" justify="center" class="form-container">
         <v-col cols="12" md="8" lg="12">
            <v-card elevation="3">
               <v-card-title class="form-title">Modifier une commande</v-card-title>
               <v-card-text>
                  <v-form>
                     <v-combobox
                         disabled
                         label="Affaire"
                         :items="formatedAffaire"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.commandeModif.selectedAffaire"
                         return-object
                     ></v-combobox>
                     <v-combobox
                         disabled
                         label="Systeme"
                         :items="formatedSysteme"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.commandeModif.selectedSysteme"
                         return-object
                     />
                     <div v-for="ModifCommandeCouche in store.modifCouches"
                          :key="ModifCommandeCouche.id">
                        <ModifCommandeCouche :modifCommandeCouche="ModifCommandeCouche"></ModifCommandeCouche>
                     </div>
                     <v-divider class="mt-4"></v-divider>
                     <v-text-field
                         clearable
                         label="eureka"
                         variant="outlined"
                         v-model="this.store.commandeModif.commande.eureka"
                     ></v-text-field>
                     <v-number-input
                         v-model="this.store.commandeModif.commande.surface"
                         label="Surface"
                         variant="outlined"
                         :min="0"
                         dense
                     ></v-number-input>
                     <v-number-input
                         variant="outlined"
                         label="RAL de le commande"
                         type="number"
                         v-model="this.store.commandeModif.commande.ral"
                     ></v-number-input>
                     <v-textarea
                         clearable
                         label="Commentaire"
                         variant="outlined"
                         v-model="this.store.commandeModif.commande.commentaire"
                     ></v-textarea>
                     <v-divider class="mt-4"></v-divider>
                     <v-checkbox
                         v-model="this.store.commandeModif.commande.ficheH"
                         label="Fiche H"
                     ></v-checkbox>
                     <v-checkbox
                         v-model="this.store.commandeModif.commande.pvPeinture"
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
                        Modifier Commande
                     </v-btn>
                  </v-form>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<style scoped>

</style>