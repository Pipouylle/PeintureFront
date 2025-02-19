import {defineStore} from "pinia";
import {CreerCoucheFormModel} from "@/models/forms/CreerCoucheFormModel";
import {createDefaultDemandeFormModel, DemandeFormModel} from "@/models/forms/DemandeFormModel";
import {ModifDemandeCoucheModel} from "@/models/forms/ModifDemandeCoucheModel";
import {getAllDemandeCalendar, getAllDemandes} from "@/services/DemandesService";
import {createDefaultDemandesCalendar, DemandesCalendar} from "@/models/calendar/DemandesCalendar";
import {CalendarModel, createDefaultCalendarModel} from "@/models/calendar/CalendarModel";
import {createDefaultOf} from "@/models/types/of";
import {creerOf, getAllOfbySemaine, updateOF} from "@/services/OfsService";
import {Semaine} from "@/models/types/semaine";
import {OfCalendar} from "@/models/calendar/OfCalendar";
import {OfCalendarmapper} from "@/mappers/OfCalendarmapper";
import {getAllSemaines} from "@/services/SemainesService";
import {creerConsommation, getAllConsommationBySemaine} from "@/services/ConsommationService";
import {createDefaultDemande} from "@/models/types/demande";
import {Consommation, createDefaultConsommation} from "@/models/types/consommation";
import {creerCouche, getAllCouches} from "@/services/CouchesService";
import {
    createDefaultCreerCommandeFormModel,
    CreerCommandeFormModel
} from "@/models/forms/CreerCommande/creerCommandeFormModel";
import {ModifCommandeCoucheModel} from "@/models/forms/CreerCommande/ModifCommandeCoucheModel";
import {getAllArticles, getIDArticleByDemande} from "@/services/ArticlesService";
import {createDefaultListAffaireModel} from "@/models/lists/ListAffaireModel";
import {creerAffaire, getAllAffaires} from "@/services/AffairesService";
import {createDefaultListDemandeModel} from "@/models/lists/ListDemandeModel";
import {createDefaultListSystemeModel} from "@/models/lists/ListSystemeModel";
import {creerSysteme, getAllSystemes} from "@/services/SystemesService";
import {createDefaultListCommandeModel} from "@/models/lists/ListCommandeModel";
import {getAllCommandes} from "@/services/CommandesService";
import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {Grenaillage} from "@/models/types/Grenaillage";
import {getAllGrenaillage} from "@/services/GrenaillagesService";
import {createDefaultCreerSystemeFormModel} from "@/models/forms/CreerSysteme/CreerSystemeFormModel";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {createDefaultCouche} from "@/models/types/couche";
import {createDefaultListGrenaillageModel} from "@/models/lists/ListGrenaillageModel";
import {createDefaultListArticleModel} from "@/models/lists/ListArticleModel";

export const useColorStore = defineStore('colorStore', {
    state: () => ({
        isLightTheme: false,
    }),
    getters: {
        getTheme: (state) => state.isLightTheme ? 'light' : 'dark',
    },
    actions: {
        toggleTheme() {
            this.isLightTheme = !this.isLightTheme;
            document.documentElement.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
        },
    },
});

export const alertStore = defineStore('alertStore', {
    state: () => ({
        alertPossible: false as boolean,
    }),
    actions: {
        alert: (message: String) => {
            if (alertStore().alertPossible) {
                alert(message)
            }
        },
    },
});
export const AffaireFormStore = defineStore('AffaireFromStore', {
    state: () => ({
        affaire: createDefaultAffaire(),
    }),
    getters: {
        listAffaire: (state) => {
            const list = ListStore();
            return list.ListAffaire;
        }
    },
    actions: {
        clear() {
            this.affaire = createDefaultAffaire();
        },
        async addAffaire(affaire: Affaire) {
            return await this.listAffaire.add(affaire);
        }
    }
})
export const DemandeFormStore = defineStore('demandeFromStore', {
    state: () => ({
        demandeFrom: createDefaultDemandeFormModel() as DemandeFormModel,
        modifCouchesDemande: [] as ModifDemandeCoucheModel[],
    }),
    getters: {
        listAffaire: (state) => {
            const list = ListStore();
            return list.ListAffaire;
        },
        listSysteme: (state) => {
            const list = ListStore();
            return list.ListSysteme;
        },
        listCommande: (state) => {
            const list = ListStore();
            return list.ListCommande;
        },
        listDemande: (state) => {
            const list = ListStore();
            return list.ListDemande;
        }
    },
    actions: {
        clearDemandeFrom() {
            this.demandeFrom = createDefaultDemandeFormModel();
            this.clearModifCoucheDemande();
        },
        clearModifCoucheDemande() {
            this.modifCouchesDemande = [];
        },
    },
});
export const CommandeFormStore = defineStore('commandeFromStore', {
    state: () => ({
        commandeFrom: createDefaultCreerCommandeFormModel() as CreerCommandeFormModel,
        modifCouchesCommande: [] as ModifCommandeCoucheModel[],
    }),
    getters: {
        listAffaire: (state) => {
            const list = ListStore();
            return list.ListAffaire;
        },
        listSysteme: (state) => {
            const list = ListStore();
            return list.ListSysteme;
        },
        listArticle: (state) => {
            const list = ListStore();
            return list.ListArticle;
        },
        listCommande: (state) => {
            const list = ListStore();
            return list.ListCommande;
        },
        listCommandeCalendar: (state) => {
            const list = ListStore();
            return list.ListDemandeCalendar;
        },
    },
    actions: {
        clearAll() {
            this.clearCommandeFrom();
            this.clearModifCoucheCommande();
        },
        clearCommandeFrom() {
            this.commandeFrom = createDefaultCreerCommandeFormModel();
        },
        addModifCoucheCommande(modifCouche: ModifCommandeCoucheModel) {
            this.modifCouchesCommande.push(modifCouche);
        },
        clearModifCoucheCommande() {
            this.modifCouchesCommande = [];
        },
    },
});

export const SystemeFormStore = defineStore('systemeFromStore', {
    state: () => ({
        systemesForm: createDefaultCreerSystemeFormModel(),
    }),
    getters: {
        listgrenaillages: (state) => {
            const list = ListStore();
            return list.ListGrenaillage;
        },
        listSystemes: (state) => {
            const list = ListStore();
            return list.ListSysteme;
        },
        nbCouches: (state): number => state.systemesForm.systeme.couches.length,
    },
    actions: {
        clearAll() {
            this.clearForm();
            this.clearCouche();
        },
        clearForm() {
            this.systemesForm = createDefaultCreerSystemeFormModel()
        },
        clearCouche() {
            this.systemesForm.systeme.couches = [createDefaultCouche(
                {id: 1}
            )];
        },
        addCouche(nb: number) {
            for (let i = 0; i < nb; i++) {
                this.systemesForm.systeme.couches.push(createDefaultCouche({id: i + this.nbCouches}));
            }
        },
        removeCouche(nb: number) {
            for (let i = 0; i < nb; i++) {
                this.systemesForm.systeme.couches.pop();
            }
        },
        async addSysteme(systeme: Systeme): Promise<boolean> {
            try {
                const responseSysteme = await creerSysteme(systeme);
                //TODO : refaire car c'est de la merde car ça peut créer des problme dans l'ordre des id
                await Promise.all(systeme.couches.map(async (couche) => {
                    couche.systeme = responseSysteme;
                    responseSysteme.couches.push(await creerCouche(couche));
                }))
                this.listSystemes.systemes.push(responseSysteme);
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
});

export const ModifSystemeStore = defineStore('modifSystemeStore', {
    state: () => ({
        systeme: createDefaultSysteme() as Systeme,
        selectGrenaillage: null as { title: string, value: number } | null,
    }),
    getters: {
        listgrenaillages: (state) => {
            const list = ListStore();
            return list.ListGrenaillage;
        },
        listSystemes: (state) => {
            const list = ListStore();
            return list.ListSysteme;
        },
        clearAll() {
            this.systeme = createDefaultSysteme();
            this.selectGrenaillage = null;
        }
    },
    actions: {},
})

export const CalendarStore = defineStore('calendarStore', {
    state: () => ({
        ofsCalendar: [] as OfCalendar[],
        calendarModel: createDefaultCalendarModel() as CalendarModel,
    }),
    getters: {
        demandesCalendar: (state) => {
            const list = ListStore();
            return list.ListDemandeCalendar;
        }
    },
    actions: {

        addDemandeCalendar(demande: DemandesCalendar) {
            this.demandesCalendar.push(demande);
        },
        addOfCalendar(of: OfCalendar) {
            this.ofsCalendar.push(of);
        },

        async setOfsCalendar(semaine: Semaine) {
            const reponseOf = await getAllOfbySemaine(semaine);
            const responseConsommation = await getAllConsommationBySemaine(semaine);
            this.ofsCalendar = OfCalendarmapper.mapArrayOfCalendar(reponseOf);
            for (const ofCalendar of this.ofsCalendar) {
                const demande = this.demandesCalendar.find(d => d.idDemande === ofCalendar.idDemandeOf.idDemande);
                ofCalendar.idDemandeOf = demande ? demande : ofCalendar.idDemandeOf;
                ofCalendar.consommationOf = responseConsommation.filter(c => c.of.id === ofCalendar.id);
            }
            console.log(this.ofsCalendar);
        },

        async updateOfCalendar(ofId: number, jour: string, cabine: string) {
            const index = this.ofsCalendar.findIndex(o => o.id === ofId);
            if (index !== -1) {
                if (this.ofsCalendar[index].jourOf === jour && this.ofsCalendar[index].cabineOF === cabine) {
                    console.log('fausse manip');
                    return;
                }
                this.ofsCalendar[index].jourOf = jour;
                this.ofsCalendar[index].cabineOF = cabine;
                try {
                    console.log(this.ofsCalendar[index]);
                    const Of = OfCalendarmapper.mapOf(this.ofsCalendar[index]);
                    console.log(Of);
                    await updateOF(Of);
                } catch (error) {
                    console.error('Erreur lors de la mise à jour de l’OF', error);
                }
            }
        },

        async creerOfCalendar(demandeId: number, jour: string, cabine: string) {
            try {
                const Of = createDefaultOf({
                    demande: createDefaultDemande({
                        id: demandeId,
                    }),
                    jour: jour,
                    cabine: cabine,
                });
                Of.avancement = "0";
                Of.semaine = CalendarStore().calendarModel.semaine;
                const responseOf = await creerOf(Of);
                const responseArticle = await getIDArticleByDemande(demandeId);
                const consommations: Consommation[] = [];
                for (const id of responseArticle) {
                    const consommation = createDefaultConsommation();
                    consommation.of.id = responseOf.id;
                    consommation.article.id = id["id"];
                    const responseConsommation = await creerConsommation(consommation);
                    consommations.push(responseConsommation);
                }
                responseOf.consommations = consommations;
                const ofmapper = OfCalendarmapper.mapOfCalendar(responseOf)
                ofmapper.idDemandeOf = this.demandesCalendar.find(d => d.idDemande === demandeId) || createDefaultDemandesCalendar();
                this.addOfCalendar(ofmapper);
                console.log(this.ofsCalendar);
            } catch (error) {
                console.error('Erreur lors de la création de l’OF', error);
            }
        },

        getOfByJour(jour: string) {
            return this.ofsCalendar.filter(of => of.jourOf === jour && of.cabineOF === this.calendarModel.cabine);
        }

    },
})

export const ListStore = defineStore('ListStore', {
    state: () => ({
        ListAffaire: createDefaultListAffaireModel(),
        ListDemande: createDefaultListDemandeModel(),
        ListSysteme: createDefaultListSystemeModel(),
        ListCommande: createDefaultListCommandeModel(),
        ListGrenaillage: createDefaultListGrenaillageModel(),
        ListArticle: createDefaultListArticleModel(),
        ListDemandeCalendar: [] as DemandesCalendar[],
        ListSemaine: [] as Semaine[],
        listloaded: false,
    }),
    actions: {
        async loadList() {
            if (!this.listloaded) {
                await this.setListAffaire();
                await this.setSemaines();
                await this.setListGrenaillage();
                await this.setListArticle();
                await this.setListSysteme();
                await this.setListCommande();
                await this.setListDemande();
                await this.setDemandesCalendar();
                this.listloaded = true;
            }
        },
        async setListAffaire() {
            this.ListAffaire.affaires = await getAllAffaires();
        },
        async setListDemande() {
            this.ListDemande.demandes = await getAllDemandes();
        },
        async setListSysteme() {
            this.ListSysteme.systemes = await getAllSystemes();
            const responseCouche = await getAllCouches()
            for (const systeme of this.ListSysteme.systemes) {
                systeme.couches = responseCouche.filter(c => c.systeme.id === systeme.id);
            }
            for (const systeme of this.ListSysteme.systemes) {
                systeme.grenaillage = this.ListGrenaillage.grenaillages.find(g => g.id === systeme.grenaillage?.id) ?? systeme.grenaillage;
            }
            console.log(this.ListSysteme.systemes);
        },
        async setListCommande() {
            this.ListCommande.commandes = await getAllCommandes();
            for (const commande of this.ListCommande.commandes) {
                commande.systeme = this.ListSysteme.systemes.find(s => s.id === commande.systeme.id) ?? commande.systeme;
                commande.affaire = this.ListAffaire.affaires.find(a => a.id === commande.affaire.id) ?? commande.affaire;
            }
        },
        async setListGrenaillage() {
            this.ListGrenaillage.grenaillages = await getAllGrenaillage();
        },
        async setListArticle() {
            this.ListArticle.articles = await getAllArticles();
        },
        async setDemandesCalendar() {
            const response = await getAllDemandeCalendar();
            const demandeCendar = [];
            for (const responseelement of response) {
                demandeCendar.push(createDefaultDemandesCalendar(responseelement));
            }
            this.ListDemandeCalendar = demandeCendar;
        },
        async setSemaines() {
            this.ListSemaine = await getAllSemaines();
        },


        getCurrentSemaine() {
            const currentDate = new Date();
            for (const semaine of this.ListSemaine) {
                const dateDebut = new Date(semaine.dateDebut);
                const dateFin = new Date(semaine.dateFin);
                if (currentDate >= dateDebut && currentDate <= dateFin) {
                    return semaine;
                }
            }
            return null;
        },
    }
})

export function useListStore() {
    return ListStore();
}

export function useAlert() {
    return alertStore();
}