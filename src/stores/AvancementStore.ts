import {defineStore} from 'pinia'
import {listAffaireStore} from "@/stores/AffaireStore"
import {listCommandeStore} from "@/stores/CommandeStore"
import {ListStore} from "@/stores/index"
import {AvancementModel, createDefaultAvancementModel} from "@/models/avancements/AvancementModel"
import {getOfBySemaineAndJour} from "@/services/OfsService";
import {createDefaultSemaine} from "@/models/types/semaine";
import {getAvancementSurfaceCoucheByOf} from "@/services/AvancementSurfaceCoucheService";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {createDefaultSurfaceCouche} from "@/models/types/surfaceCouche";
import {getSurfaceCoucheById} from "@/services/SurfaceCouchesService";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listDemandeStore} from "@/stores/DemandeStore";

export const avancementStore = defineStore('avancementStore',{
    state: () => ({
        avancementModel: createDefaultAvancementModel() as AvancementModel,
        isLoad: false as boolean,
    }),
    actions: {
        async load(){
            await listAffaireStore().load();
            await listCommandeStore().load();
            await listSystemeStore().load();
            await listDemandeStore().load();
            if(!this.isLoad || this.avancementModel.date != new Date().toISOString()){
                await this.setJour(new Date().toISOString());
                this.isLoad = true;
            }

        },
        async getOf(): Promise<Boolean>{
            try{
                this.avancementModel.listOF = await getOfBySemaineAndJour(this.avancementModel.jour, this.avancementModel.semaine);
                for (const of of this.avancementModel.listOF) {
                    of.avancements = await getAvancementSurfaceCoucheByOf(of.id);
                }
                return true;
            } catch (e) {
                return false;
            }
        },
        async setJour(date: string){
            this.avancementModel.date = date;
            this.avancementModel.semaine = ListStore().getSemaines(date) ?? createDefaultSemaine();
            this.avancementModel.jour = this.avancementModel.jours[new Date(date).getDay()];

            if (!await this.getOf()) {
                console.error("et merde")
            }

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

            console.log("listOf :",this.avancementModel.listOF);
            console.log("listDemande :",this.avancementModel.listDemande);
            console.log("listCommande :",this.avancementModel.listCommande);
            console.log("listAffaire :",this.avancementModel.listAffaire);
            console.log("listSysteme :",this.avancementModel.listSysteme);
            const test = this.avancementModel.listDemande.filter(demande => this.avancementModel.listCommande.some(commande =>commande.affaire.id === this.avancementModel.listAffaire[0].id && commande.id === demande.commande.id));
            console.log("test :",test[0]);
            //TODO: faire les lists
        },
        async previousJour(){
            const newDate = new Date(this.avancementModel.date);
            newDate.setDate(newDate.getDate() - 1);
            await this.setJour(newDate.toISOString());
        },
        async nextJour(){
            const newDate = new Date(this.avancementModel.date);
            newDate.setDate(newDate.getDate() + 1);
            await this.setJour(newDate.toISOString());
        },
        async getSurfaceCoucheByAvancementSurfaceCouche(avancementSurfaceCouche: AvancementSurfaceCouche){
            try {
                return getSurfaceCoucheById(avancementSurfaceCouche.surfaceCouches.id);
            } catch (e) {
                return createDefaultSurfaceCouche();
            }
        }
    }
})