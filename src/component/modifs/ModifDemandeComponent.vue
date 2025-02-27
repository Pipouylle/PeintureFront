<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {ModifDemandeStore, useAlert} from "@/stores";
import {getArticleCoucheForDemande} from "@/services/ArticleCoucheService";
import {createDefaultSurfaceCouche} from "@/models/types/surfaceCouche";
import ModifDemandeCouche from "@/component/Form/ModifCoucheForDemande.vue";
import {Systeme} from "@/models/types/systeme";
import {getSurfaceCoucheByDemande} from "@/services/SurfaceCouchesService";
import {createDefaultArticle} from "@/models/types/article";
import {createDefaultArticleCouche} from "@/models/types/articleCouche";

@Component({
   components: {ModifDemandeCouche}
})
export default class ModifDemandeComponent extends Vue {
   private router = useRouter();
   private modifStore = ModifDemandeStore();


   async mounted() {
      this.modifStore.selectDate = new Date(this.modifStore.demande.date);
      this.modifStore.selectAffaire = this.modifStore.listAffaire.affaires.filter((affaire) => affaire.id === this.modifStore.listCommande.commandes.find((commande) => commande.id === this.modifStore.demande.commande.id)?.affaire.id).map((affaire) => {
         return {
            title: affaire.numero + " - " + affaire.nom,
            value: affaire.id
         }
      })[0];
      this.modifStore.selectCommande = this.modifStore.listCommande.commandes.filter((commande) => commande.id === this.modifStore.demande.commande.id).map((commande) => {
         return {
            title: commande.eureka + " - " + this.modifStore.listSysteme.systemes.find((systeme: Systeme) => systeme.id === commande.systeme.id)?.nom,
            value: commande.id
         }
      })[0];
      //TODO: mettre la surface car je la récup pas
      this.modifStore.demande.surfaceCouches = [];
      const ArticlesCouches = await getArticleCoucheForDemande(this.modifStore.demande.commande);
      this.modifStore.demande.surfaceCouches = await getSurfaceCoucheByDemande(this.modifStore.demande.id);
      for (const surfaceCouche of this.modifStore.demande.surfaceCouches) {
         surfaceCouche.articleCouche = ArticlesCouches.find(articleCouche => articleCouche.id === surfaceCouche.articleCouche.id) ?? createDefaultArticleCouche();
      }
   }


   @Watch('modifStore.demande.surface', {deep: true, immediate: true})
   public updateSurface(newValue: number, oldValue: number) {
      for (const modifCouche of this.modifStore.modifCouches) {
         if (modifCouche.SurfaceCouche.surface == oldValue) {
            modifCouche.SurfaceCouche.surface = newValue;
         }
      }
   }

   private async submitForm(){
      try {
         this.modifStore.demande.date = this.modifStore.selectDate ? this.modifStore.selectDate.toISOString() : String(new Date());
         if (await this.modifStore.listDemande.modif(this.modifStore.demande)) {
            useAlert().alert('Demande créée avec succès !');
            this.modifStore.clearAll();
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
                  Modifier une demande
               </v-card-title>
               <v-card-text>
                  <v-form>
                     <v-combobox
                         disabled
                         label="Affaires"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.modifStore.selectAffaire"
                         return-object
                     ></v-combobox>
                     <v-combobox
                         disabled
                         label="Commande"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.modifStore.selectCommande"
                         return-object
                     />
                     <v-col align-self="center" justify="center">
                        <v-row align="center" justify="center">
                           <v-text-field
                               label="Numero de la demande"
                               v-model="this.modifStore.demande.numero"
                               outlined
                               dense
                               prepend-icon="mdi-briefcase-outline"
                           ></v-text-field>
                        </v-row>
                        <v-date-picker
                            v-model="this.modifStore.selectDate"
                            label="Date de la demande"
                            outlined
                            dense
                            prepend-icon="mdi-calendar"
                        ></v-date-picker>
                        <v-textarea
                            label="commentaire"
                            variant="outlined"
                            v-model="this.modifStore.demande.commentaire">
                        </v-textarea>
                        <v-checkbox
                            label="reservation peinture"
                            v-model="this.modifStore.demande.reservation"
                        ></v-checkbox>
                        <v-number-input
                            v-model="this.modifStore.demande.surface"
                            label="surface"
                            :min="0"
                            outlined
                            dense
                        ></v-number-input>
                        <v-number-input
                            v-model="this.modifStore.demande.nombrePiece"
                            label="nombre de pièces"
                            :min="0"
                            variant="outlined"
                            dense
                        ></v-number-input>
                        <div v-for="surfaceCouche in this.modifStore.demande.surfaceCouches"
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
                           Modifier Demande
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

</style>