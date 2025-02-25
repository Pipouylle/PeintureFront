import {defineStore} from "pinia";
import {createDefaultDemandeFormModel, DemandeFormModel} from "@/models/forms/DemandeFormModel";
import {ModifDemandeCoucheModel} from "@/models/forms/ModifDemandeCoucheModel";
import {getAllDemandeCalendar, getAllDemandes} from "@/services/DemandesService";
import {createDefaultDemandesCalendar, DemandesCalendar} from "@/models/calendar2_0/DemandesCalendar";
import {createDefaultOf} from "@/models/types/of";
import {creerOf, deleteOf, getAllOfbySemaine, updateOF, updateOfOrder} from "@/services/OfsService";
import {Semaine} from "@/models/types/semaine";
import {OfCalendar} from "@/models/calendar2_0/OfCalendar";
import {OfCalendarmapper} from "@/mappers/OfCalendarmapper";
import {getAllSemaines} from "@/services/SemainesService";
import {createDefaultDemande} from "@/models/types/demande";
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
import {createDefaultArticle} from "@/models/types/article";
import {CalendarViewModel, createDefaultCalendarViewModel} from "@/models/calendar2_0/CalendarViewModel";
import {
    creerAvancementSurfaceCouche,
    getAllAvancementSurfaceCoucheBySemaine
} from "@/services/AvancementSurfaceCoucheService";
import {AvancementSurfaceCouche, createDefaultAvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {getSurfaceCoucheByDemande} from "@/services/SurfaceCouchesService";
import {createDefaultSurfaceCouche} from "@/models/types/surfaceCouche";

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
            this.systemesForm.nbCouche = 1;
        },
        addCouche(nb: number) {
            for (let i = 1; i <= nb; i++) {
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

        updateListDemandeCalendar(list: any[]) {
            this.ListDemandeCalendar = list;
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
});

export const CalendarComponentStore = defineStore('calendarComponentStore', {
    state: () => ({
        calendarModel: createDefaultCalendarViewModel() as CalendarViewModel,
        semaine: useListStore().getCurrentSemaine() as Semaine,
        OfCalendar: [] as OfCalendar[],
    }),
    getters: {
        listDemandeCalendar: (state) => {
            const list = ListStore();
            return list.ListDemandeCalendar;
        },
        listSemaine: (state) => {
            const list = ListStore();
            return list.ListSemaine;
        }
    },
    actions: {
        async setOfBySemaine() {
            const responseOfsCalendar = await getAllOfbySemaine(this.semaine);
            const responseAvancement = await getAllAvancementSurfaceCoucheBySemaine(this.semaine.id);
            this.OfCalendar = OfCalendarmapper.mapArrayOfCalendar(responseOfsCalendar);
            for (const ofCalendarElement of this.OfCalendar) {
                ofCalendarElement.idDemandeOf = this.listDemandeCalendar.find((demande: DemandesCalendar) => demande.idDemande === ofCalendarElement.idDemandeOf.idDemande) ?? createDefaultDemandesCalendar();
                ofCalendarElement.avancements = responseAvancement.filter((avancement: AvancementSurfaceCouche) => avancement.of.id === ofCalendarElement.id);
            }
        },
        async creerOfCalendar(demandeId: number, jour: string, temp: string) {
            try {
                const Of = createDefaultOf({
                    demande: createDefaultDemande({
                        id: demandeId,
                    }),
                    temp: temp,
                    jour: jour,
                    cabine: this.calendarModel.cabine,
                    semaine: this.semaine,
                });
                const responseOf = await creerOf(Of);
                const responseSurfaceCouches = await getSurfaceCoucheByDemande(demandeId);
                for (const surfaceCouche of responseSurfaceCouches) {
                    const avancement = createDefaultAvancementSurfaceCouche({
                        of: responseOf,
                        surfaceCouches: responseSurfaceCouches.find(s => s.id === surfaceCouche.id) ?? createDefaultSurfaceCouche({id: surfaceCouche.id}),
                    })
                    responseOf.avancements.push(await creerAvancementSurfaceCouche(avancement));
                }
                const ofmapper = OfCalendarmapper.mapOfCalendar(responseOf)
                ofmapper.idDemandeOf = this.listDemandeCalendar.find(d => d.idDemande === demandeId) || createDefaultDemandesCalendar();
                this.addOf(ofmapper);
            } catch (e) {
                console.error(e);
            }
        },
        addOf(of: OfCalendar) {
            this.OfCalendar.push(of);
        },
        async updateOfCalendar(ofId: number, jour: string, temp: string) {
            const of = this.OfCalendar.find((of: OfCalendar) => of.id === ofId);
            if (of) {
                of.jourOf = jour;
                of.cabineOF = this.calendarModel.cabine;
                of.tempOf = temp;
                try {
                    await updateOF(OfCalendarmapper.mapOf(of));
                } catch (e) {
                    console.error(e);
                }
            }
        },

        async updateOrderOfCalendar(jour: string, list: OfCalendar[]) {
            for (const of of list) {
                if (of.order !== list.indexOf(of) + 1) {
                    of.order = list.indexOf(of) + 1;
                    try {
                        console.log(of);
                        await updateOfOrder(OfCalendarmapper.mapOf(of));
                        this.OfCalendar.find((ofCalendar: OfCalendar) => ofCalendar.id === of.id)!.order = of.order;
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        },
        async deletOf(ofId: number) {
            const index = this.OfCalendar.findIndex((of: OfCalendar) => of.id === ofId);
            console.log(ofId);
            console.log(this.OfCalendar)
            if (index !== -1) {
                try {
                    await deleteOf(createDefaultOf({id: ofId}));
                    this.OfCalendar.splice(index, 1);
                } catch (e) {
                    console.error('erreur lors de la suppression de l\'of', e);
                }
            } else {
                console.error('of introuvable');
            }
        },
        getOfByJour(jour: string): OfCalendar[] {
            return this.OfCalendar.filter(of => of.jourOf === jour && of.cabineOF === this.calendarModel.cabine).sort((a, b) => a.order - b.order);
        },
        getOfByDemiJour(jour: string, temp: string): OfCalendar[] {
            return this.OfCalendar.filter(of => of.jourOf === jour && of.cabineOF === this.calendarModel.cabine && of.tempOf === temp).sort((a, b) => a.order - b.order);
        }
    }
});


export function useListStore() {
    return ListStore();
}

export function useAlert() {
    return alertStore();
}

export function useCalendar() {
    return CalendarComponentStore();
}