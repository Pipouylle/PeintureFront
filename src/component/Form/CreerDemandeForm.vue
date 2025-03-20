<script lang="ts">
import {Component, Vue, Watch} from 'vue-facing-decorator';
import ModifCoucheForDemande from "@/component/Form/ModifCoucheForDemande.vue";
import {useAlert} from "@/stores";
import {createDefaultSurfaceCouche} from "@/models/types/surfaceCouche";
import {getArticleCoucheForDemande} from "@/services/ArticleCoucheService";
import {Systeme} from "@/models/types/systeme";
import {Affaire} from "@/models/types/affaire";
import {Commande} from "@/models/types/commande";
import {useRouter} from "vue-router";
import {creationDemandeStore} from "@/stores/DemandeStore";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import NotificationHandler from "@/services/NotificationHandler";


@Component({
   components: {ModifDemandeCouche: ModifCoucheForDemande}
})

export default class CreerDemandeForm extends Vue {
   private store = creationDemandeStore();
   private commandeStore = listCommandeStore();
   private affaireStore = listAffaireStore();
   private systemeStore = listSystemeStore();
   private router = useRouter();


   async mounted(){
      await this.store.load();
   }
   get formatedCommande() {
      return this.commandeStore.listCommande.commandes.filter((commande: Commande) => commande.affaire.id === this.store.demandeForm.selectedAffaire?.value).map((commande: Commande) => {
         return {
            title: commande.eureka + " - " + this.systemeStore.listSysteme.systemes.find((systeme: Systeme) => systeme.id === commande.systeme.id)?.nom,
            value: commande.id
         }
      });
   }

   onSelectedAffaire() {
      this.store.demandeForm.demande.surfaceCouches = [];
      this.store.demandeForm.selectedCommande = null;
   }

   get formatedAffaire() {
      return this.affaireStore.listAffaire.affaires.map((affaire: Affaire) => {
         return {
            title: affaire.numero + " - " + affaire.nom,
            value: affaire.id
         }
      });
   }

   async onSelectCommande() {
      const commande = this.commandeStore.listCommande.commandes.find((commande: Commande) => commande.id === this.store.demandeForm.selectedCommande?.value);
      if (commande) {
         this.store.demandeForm.demande.commande = commande;
         this.store.demandeForm.demande.surfaceCouches = [];
         const ArticlesCouches = await getArticleCoucheForDemande(this.store.demandeForm.demande.commande);
         for (const articleCouche of ArticlesCouches) {
            this.store.demandeForm.demande.surfaceCouches.push(createDefaultSurfaceCouche({
               id: this.store.demandeForm.demande.surfaceCouches.length,
               articleCouche: articleCouche
            }));
         }
      }
   }


   @Watch('store.demandeForm.demande.surface', {deep: true, immediate: true})
   public updateSurface(newValue: number, oldValue: number) {
      for (const surfaceCouche of this.store.demandeForm.demande.surfaceCouches) {
         if (surfaceCouche.surface == oldValue) {
            surfaceCouche.surface = newValue;
         }
      }
   }

   async submitForm() {
      try {
         this.store.demandeForm.demande.date = this.store.demandeForm.dateDemande ? this.store.demandeForm.dateDemande : String(new Date());
         if (await this.store.create(this.store.demandeForm.demande)) {
            NotificationHandler.showNewNotification('Demande créée avec succès !');
            this.store.clear();
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
                         v-model="this.store.demandeForm.selectedAffaire"
                         @update:model-value="onSelectedAffaire"
                         return-object
                     ></v-combobox>
                     <v-combobox
                         v-if="this.store.demandeForm.selectedAffaire"
                         label="Commande"
                         :items="formatedCommande"
                         item-title="title"
                         item-value="value"
                         variant="outlined"
                         v-model="this.store.demandeForm.selectedCommande"
                         @update:model-value="onSelectCommande"
                         return-object
                     />
                     <v-col align-self="center" justify="center">
                        <v-row align="center" justify="center">
                           <v-text-field
                               label="Numero de la demande"
                               v-model="this.store.demandeForm.demande.numero"
                               outlined
                               dense
                               prepend-icon="mdi-briefcase-outline"
                           ></v-text-field>
                        </v-row>
                        <v-date-picker
                            v-model="this.store.demandeForm.dateDemande"
                            label="Date de la demande"
                            outlined
                            dense
                            prepend-icon="mdi-calendar"
                        ></v-date-picker>
                        <v-textarea
                            label="commentaire"
                            variant="outlined"
                            v-model="this.store.demandeForm.demande.commentaire">
                        </v-textarea>
                        <v-checkbox
                            label="reservation peinture"
                            v-model="store.demandeForm.demande.reservation"
                        ></v-checkbox>
                        <v-number-input
                            v-model="this.store.demandeForm.demande.surface"
                            label="surface"
                            :min="0"
                            outlined
                            dense
                        ></v-number-input>
                        <v-number-input
                            v-model="this.store.demandeForm.demande.nombrePiece"
                            label="nombre de pièces"
                            :min="0"
                            variant="outlined"
                            dense
                        ></v-number-input>
                        <!--
                        <div v-for="surfaceCouche in this.store.demandeForm.demande.surfaceCouches"
                             :key="surfaceCouche.id">
                           <ModifDemandeCouche :surface-couche="surfaceCouche"/>
                        </div>
                         -->
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