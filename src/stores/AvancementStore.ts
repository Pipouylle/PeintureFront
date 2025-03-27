import {defineStore} from 'pinia'
import {listAffaireStore} from "@/stores/AffaireStore"
import {listCommandeStore} from "@/stores/CommandeStore"
import {AvancementModel, createDefaultAvancementModel} from "@/models/avancements/AvancementModel"
import {getOfBySemaine, updateAvancementOf} from "@/services/OfsService";
import {createDefaultSemaine} from "@/models/types/semaine";
import {getAvancementSurfaceCoucheByOf} from "@/services/AvancementSurfaceCoucheService";
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
            await listDemandeStore().load();
            if(!this.isLoad){
                await this.setSemaine(listSemaineStore().getCurrentSemaine() ?? createDefaultSemaine());
                this.isLoad = true;
            }
        },
        unLoad(){
            this.isLoad = false;
        },
        async getOf(): Promise<Boolean>{
            try{
                this.avancementModel.listOF = await getOfBySemaine(this.avancementModel.semaine);
                for (const of of this.avancementModel.listOF) {
                    of.avancements = await getAvancementSurfaceCoucheByOf(of.id);
                }
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
            /**
             * On récupère les demandes, commandes, affaires et systèmes uniquement en lien avec les of
             * l'on remplit aussi la list des avancement précedent
             */
            for (const of of this.avancementModel.listOF) {
                const demande = listDemandeStore().listDemande.demandes.find(demande => demande.id === of.demande.id);
                if (demande) {
                    const demandeTest = this.avancementModel.listDemande.find(d => d.id === demande.id);
                    if (!demandeTest){
                        this.avancementModel.listDemande.push(demande);
                    }
                }

            }
            for (const demande of this.avancementModel.listDemande) {
                const commande = listCommandeStore().listCommande.commandes.find(commande => commande.id === demande.commande.id);
                if (commande) {
                    const commandeTest = this.avancementModel.listCommande.find(c => c.id === commande.id);
                    if (!commandeTest){
                        this.avancementModel.listCommande.push(commande);
                    }
                }
                const of = this.avancementModel.listOF.filter(of => of.demande.id === demande.id)[0];
                if (of) {
                    try {
                        this.avancementModel.listPrevious.push(await getPreviousAvancement(of.demande.id));
                    } catch (e) {
                        NotificationHandler.showNewNotification('je n\'ai pas pu récupérer les avancements précédents', true);
                    }
                }
            }
            for (const commande of this.avancementModel.listCommande) {
                const systeme = listSystemeStore().listSysteme.systemes.find(systeme => systeme.id === commande.systeme.id);
                if (systeme) {
                    const systemeTest = this.avancementModel.listSysteme.find(s => s.id === systeme.id);
                    if (!systemeTest){
                        this.avancementModel.listSysteme.push(systeme);
                    }
                }
                const affaire = listAffaireStore().listAffaire.affaires.find(affaire => affaire.id === commande.affaire.id);
                if (affaire) {
                    const affaireTest = this.avancementModel.listAffaire.find(a => a.id === affaire.id);
                    if (!affaireTest){
                        this.avancementModel.listAffaire.push(affaire);
                    }
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
        async getSurfaceCoucheByAvancementSurfaceCouche(avancementSurfaceCouche: AvancementSurfaceCouche){
            try {
                return getSurfaceCoucheById(avancementSurfaceCouche.surfaceCouches.id);
            } catch (e) {
                return createDefaultSurfaceCouche();
            }
        },
        async updateOf(): Promise<boolean>{
            try {
                for (const of of this.avancementModel.listOF) {
                    await updateAvancementOf(of);
                }
                listCommandeStore().unLoad();
                return true;
            } catch (e) {
                return false;
            }
        }
    }
})