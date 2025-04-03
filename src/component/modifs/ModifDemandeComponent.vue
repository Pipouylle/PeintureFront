<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import {useRouter} from "vue-router";
import {useAlert} from "@/stores";
import {getArticleCoucheForDemande} from "@/services/ArticleCoucheService";
import ModifDemandeCouche from "@/component/Form/ModifCoucheForDemande.vue";
import {Systeme} from "@/models/types/systeme";
import {getSurfaceCoucheByDemande} from "@/services/SurfaceCouchesService";
import {createDefaultArticleCouche} from "@/models/types/articleCouche";
import {creationDemandeStore, modifDemandeStore} from "@/stores/DemandeStore";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import NotificationHandler from "@/services/NotificationHandler";

@Component({
   components: {ModifDemandeCouche}
})
export default class ModifDemandeComponent extends Vue {
   private store = modifDemandeStore();
   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private router = useRouter();


   async mounted() {
      await this.store.load();
      this.store.modifDemande.selectedDate = new Date(this.store.modifDemande.demande.date);
      this.store.modifDemande.selectedAffaire = this.affaireStore.listAffaire.affaires.filter((affaire) => affaire.id === this.commandeStore.listCommande.commandes.find((commande) => commande.id === this.store.modifDemande.demande.commande.id)?.affaire.id).map((affaire) => {
         return {
            title: affaire.numero + " - " + affaire.nom,
            value: affaire.id
         }
      })[0];
      this.store.modifDemande.selectedCommande = this.commandeStore.listCommande.commandes.filter((commande) => commande.id === this.store.modifDemande.demande.commande.id).map((commande) => {
         return {
            title: commande.eureka + " - " + this.systemeStore.listSysteme.systemes.find((systeme: Systeme) => systeme.id === commande.systeme.id)?.nom,
            value: commande.id
         }
      })[0];
      this.store.modifDemande.demande.surfaceCouches = [];
      const ArticlesCouches = await getArticleCoucheForDemande(this.store.modifDemande.demande.commande);
      this.store.modifDemande.demande.surfaceCouches = await getSurfaceCoucheByDemande(this.store.modifDemande.demande.id);
      for (const surfaceCouche of this.store.modifDemande.demande.surfaceCouches) {
         surfaceCouche.articleCouche = ArticlesCouches.find(articleCouche => articleCouche.id === surfaceCouche.articleCouche.id) ?? createDefaultArticleCouche();
      }
   }


   @Watch('store.modifDemande.demande.surface', {deep: true, immediate: true})
   public updateSurface(newValue: number, oldValue: number) {
      for (const surfaceCouche of this.store.modifDemande.demande.surfaceCouches) {
         if (surfaceCouche.surface == oldValue) {
            surfaceCouche.surface = newValue;
         }
      }
   }

   private async submitForm(){
      try {
         this.store.modifDemande.demande.date = this.store.modifDemande.selectedDate ? this.store.modifDemande.selectedDate.toISOString() : String(new Date());
         if (await this.store.update(this.store.modifDemande.demande)) {
            NotificationHandler.showNewNotification('Demande modifiée avec succès !');
            this.router.push({name: 'listDemande'});
         } else {
            NotificationHandler.showNewNotification('Erreur lors de la création de la demande.', true);
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
                         v-model="this.store.modifDemande.selectedAffaire"
                         return-object
                     ></v-combobox>
                     <v-combobox
                         disabled
                         label="Commande"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.modifDemande.selectedCommande"
                         return-object
                     />
                     <v-col align-self="center" justify="center">
                        <v-row align="center" justify="center">
                           <v-text-field
                               label="Numero de la demande"
                               v-model="this.store.modifDemande.demande.numero"
                               outlined
                               dense
                               prepend-icon="mdi-briefcase-outline"
                           ></v-text-field>
                        </v-row>
                        <v-date-picker
                            v-model="this.store.modifDemande.selectedDate"
                            label="Date de la demande"
                            outlined
                            dense
                            prepend-icon="mdi-calendar"
                        ></v-date-picker>
                        <v-textarea
                            label="commentaire"
                            variant="outlined"
                            v-model="this.store.modifDemande.demande.commentaire">
                        </v-textarea>
                        <v-checkbox
                            label="reservation peinture"
                            v-model="this.store.modifDemande.demande.reservation"
                        ></v-checkbox>
                        <v-number-input
                            v-model="this.store.modifDemande.demande.surface"
                            label="surface"
                            :min="0"
                            variant="outlined"
                            dense
                        ></v-number-input>
                        <v-number-input
                            v-model="this.store.modifDemande.demande.nombrePiece"
                            label="nombre de pièces"
                            :min="0"
                            variant="outlined"
                            dense
                        ></v-number-input>
                        <div v-for="surfaceCouche in this.store.modifDemande.demande.surfaceCouches"
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