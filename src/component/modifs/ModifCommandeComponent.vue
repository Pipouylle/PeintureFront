<script lang="ts">
import {Vue, Component} from 'vue-facing-decorator';
import {ModifCommandeStore, useAlert} from "@/stores";
import {useRouter} from "vue-router";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {createDefaultArticle} from "@/models/types/article";
import ModifCoucheForCommande from "@/component/Form/ModifCoucheForCommande.vue";
import {createDefaultModifCommandeCoucheModel} from "@/models/forms/CreerCommande/ModifCommandeCoucheModel";
import {createDefaultSelectArticles} from "@/models/forms/CreerCommande/SelectArticles";
import {getArticlesCoucheByDemande} from "@/services/CouchesService";
import {getArticleCoucheBySystemeAndCommande} from "@/services/ArticleCoucheService";


@Component({
   components:{ModifCommandeCouche: ModifCoucheForCommande}
})

//TODO: faire la modif de des articels de couche
export default class ModifCommandeComponent extends Vue {
   private modifStore = ModifCommandeStore();
   private router = useRouter();


   async mounted() {
      this.modifStore.selectAffaire = this.modifStore.commande.affaire ? {
         title: this.modifStore.commande.affaire.numero + " - " + this.modifStore.commande.affaire.nom,
         value: this.modifStore.commande.affaire.id
      } : null;
      this.modifStore.selectSysteme = this.modifStore.commande.systeme ? {
         title: this.modifStore.commande.systeme.nom + " - " + this.modifStore.commande.systeme.fournisseur,
         value: this.modifStore.commande.systeme.id
      } : null;
      const systeme = this.modifStore.listSysteme.systemes.find((systeme: Systeme) => systeme.id === this.modifStore.selectSysteme?.value);
      if (systeme){
         this.modifStore.clearModifCoucheCommande();
         const responseSelectArticles = await getArticleCoucheBySystemeAndCommande(systeme.id, this.modifStore.commande.id);
         for (const responseSelectArticle of responseSelectArticles) {
            this.modifStore.addModifCouche(createDefaultModifCommandeCoucheModel({
               id : this.modifStore.modifCouchesCommande.length,
               articleCouche: responseSelectArticle,
            }));
            for (const article of responseSelectArticle.articles) {
               this.modifStore.modifCouchesCommande[this.modifStore.modifCouchesCommande.length -1].articles.push({
                  id: this.modifStore.modifCouchesCommande[this.modifStore.modifCouchesCommande.length -1].articles.length,
                  article : {title : article.descriptif, value : article.id},
               })
            }
         }
      }
   }


   get formatedSysteme() {
      return this.modifStore.listSysteme.systemes.map((systeme: Systeme) => {
         return {
            title: systeme.nom + " - " + this.modifStore.listFournisseur.fournisseurs.find(fournisseur => fournisseur.id === systeme.fournisseur.id)?.nom,
            value: systeme.id
         }
      })
   }

   get formatedAffaire() {
      return this.modifStore.listAffaire.affaires.map((affaire: Affaire) => {
         return {
            title: affaire.numero + " - " + affaire.nom,
            value: affaire.id
         }
      });
   }

   async submitForm(){
      this.modifStore.commande.articles = this.modifStore.modifCouchesCommande.map(modifCouche => {
         modifCouche.articleCouche.commande = this.modifStore.commande;
         return modifCouche.articleCouche;
      });
      if (await this.modifStore.listCommande.modif(this.modifStore.commande)){
         this.modifStore.clearAll();
         this.router.push({name: 'listCommande'});
      } else {
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
                         label="Affaires"
                         :items="formatedAffaire"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.modifStore.selectAffaire"
                         return-object
                     ></v-combobox>
                     <v-combobox
                         disabled
                         label="Systemes"
                         :items="formatedSysteme"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.modifStore.selectSysteme"
                         return-object
                     />
                     <div v-for="ModifCommandeCouche in modifStore.modifCouchesCommande"
                          :key="ModifCommandeCouche.id">
                        <ModifCommandeCouche :modifCommandeCouche="ModifCommandeCouche"></ModifCommandeCouche>
                     </div>

                     <v-divider class="mt-4"></v-divider>
                     <v-text-field
                         clearable
                         label="eureka"
                         variant="outlined"
                         v-model="this.modifStore.commande.eureka"
                     ></v-text-field>
                     <v-textarea
                         clearable
                         label="commentaire"
                         variant="outlined"
                         v-model="this.modifStore.commande.commentaire"
                     ></v-textarea>
                     <v-divider class="mt-4"></v-divider>
                     <v-checkbox
                         v-model="this.modifStore.commande.ficheH"
                         label="Fiche H"
                     ></v-checkbox>
                     <v-checkbox
                         v-model="this.modifStore.commande.pvPeinture"
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