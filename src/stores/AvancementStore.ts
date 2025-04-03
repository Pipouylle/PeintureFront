import {defineStore} from 'pinia'
import {listAffaireStore} from "@/stores/AffaireStore"
import {listCommandeStore} from "@/stores/CommandeStore"
import {AvancementModel, createDefaultAvancementModel} from "@/models/avancements/AvancementModel"
import {getOfBySemaine, getOfForAvancement, updateAvancementOf} from "@/services/OfsService";
import {createDefaultSemaine} from "@/models/types/semaine";
import {
    getAvancementSurfaceCoucheByOf,
    updateAvancementAvancementSurfaceCouche
} from "@/services/AvancementSurfaceCoucheService";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {createDefaultSurfaceCouche} from "@/models/types/surfaceCouche";
import {getSurfaceCoucheById} from "@/services/SurfaceCouchesService";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listDemandeStore} from "@/stores/DemandeStore";
import {getPreviousAvancement} from "@/services/DemandesService";
import NotificationHandler from "@/services/NotificationHandler";
import {listSemaineStore} from "@/stores/SemaineStore";
import {Semaine} from "@/models/types/semaine"

export const avancementStore = defineStore('avancementStore',{
    state: () => ({
        avancementModel: createDefaultAvancementModel() as AvancementModel,
        isLoad: false as boolean,
    }),
    actions: {
        async load(){
            await listSemaineStore().load();
            if(!this.isLoad){
                await this.setSemaine(listSemaineStore().getCurrentSemaine() ?? createDefaultSemaine());
                this.isLoad = true;
            }
            console.log(this.avancementModel.listOF);
        },
        unLoad(){
            this.isLoad = false;
        },
        async getOf(): Promise<Boolean>{
            try{
                this.avancementModel.listOF = await getOfForAvancement(this.avancementModel.semaine.id);
                return true;
            } catch (e) {
                return false;
            }
        },
        async setSemaine(semaine: Semaine){
            this.avancementModel.semaine = semaine;

            if (!await this.getOf()) {
                console.error("et merde")
            }

            this.avancementModel.listDemande = [];
            this.avancementModel.listCommande = [];
            this.avancementModel.listAffaire = [];
            this.avancementModel.listSysteme = [];
            this.avancementModel.listPrevious = [];
            /**
             * On récupère les demandes, commandes, affaires et systèmes uniquement en lien avec les of
             * l'on remplit aussi la list des avancement précedent
             */

            for (const of of this.avancementModel.listOF) {
                const demande = of.demande;
                const test = this.avancementModel.listDemande.findIndex(d => d.id === demande.id);
                if (test === -1) {
                    this.avancementModel.listDemande.push(demande);
                    try {
                        this.avancementModel.listPrevious.push(await getPreviousAvancement(demande.id, of.id));
                    } catch (e) {
                        NotificationHandler.showNewNotification('je n\'ai pas pu récupérer les avancements précédents', true);
                    }
                }
            }

            for (const demande of this.avancementModel.listDemande) {
                const commande = demande.commande;
                const test = this.avancementModel.listCommande.findIndex(c => c.id === commande.id);
                if (test === -1) {
                    this.avancementModel.listCommande.push(commande);
                }
            }

            for (const commande of this.avancementModel.listCommande) {
                const systeme = commande.systeme;
                const affaire = commande.affaire;
                const testSysteme = this.avancementModel.listSysteme.findIndex(s => s.id === systeme.id);
                const testAffaire = this.avancementModel.listAffaire.findIndex(a => a.id === affaire.id);
                if (testSysteme === -1) {
                    this.avancementModel.listSysteme.push(systeme);
                }
                if (testAffaire === -1) {
                    this.avancementModel.listAffaire.push(affaire);
                }
            }
            console.log(this.avancementModel.listPrevious);
        },

        async previousSemaine(){
            await this.setSemaine(listSemaineStore().listSemaine.semaines.find(semaine => semaine.id === (this.avancementModel.semaine.id - 1)) ?? createDefaultSemaine());
        },
        async nextSemaine(){
            await this.setSemaine(listSemaineStore().listSemaine.semaines.find(semaine => semaine.id === (this.avancementModel.semaine.id + 1)) ?? createDefaultSemaine());
        },
        async updateOf(): Promise<boolean>{
            try {
                for (const of of this.avancementModel.listOF) {
                    await updateAvancementOf(of);
                    for (const avancement of of.avancements) {
                        await updateAvancementAvancementSurfaceCouche(avancement);
                    }
                }
                listCommandeStore().unLoad();
                return true;
            } catch (e) {
                return false;
            }
        }
    }
})