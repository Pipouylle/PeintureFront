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
import {getAllCouches} from "@/services/CouchesService";
import {getJourEnumValue} from "@/enums/Jour";
import {createCreerAffaireFormModel} from "@/models/forms/CreerAffaireFormModel";
import {
    createDefaultCreerCommandeFormModel,
    CreerCommandeFormModel
} from "@/models/forms/CreerCommande/creerCommandeFormModel";
import {ModifCommandeCoucheModel} from "@/models/forms/CreerCommande/ModifCommandeCoucheModel";
import {getAllArticles, getIDArticleByDemande} from "@/services/ArticlesService";
import {createDefaultListAffaireModel} from "@/models/lists/ListAffaireModel";
import {getAllAffaires} from "@/services/AffairesService";
import {createDefaultListDemandeModel} from "@/models/lists/ListDemandeModel";
import {createDefaultListSystemeModel} from "@/models/lists/ListSystemeModel";
import {getAllSystemes} from "@/services/SystemesService";
import {createDefaultListCommandeModel} from "@/models/lists/ListCommandeModel";
import {getAllCommandes} from "@/services/CommandesService";

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
export const AffaireFormStore = defineStore('AffaireFromStore', {
    state: () => ({
        affaireform: createCreerAffaireFormModel(),
    }),
    actions: {
        clear() {
            this.affaireform = createCreerAffaireFormModel();
        }
    }
})
export const CoucheFormStore = defineStore('coucheFromStore', {
    state: () => ({
        coucheFroms: [] as CreerCoucheFormModel[],
    }),
    getters: {
        getnbCoucheForm: (state) => state.coucheFroms.length,
    },
    actions: {
        addCoucheFrom(coucheFrom: CreerCoucheFormModel) {
            this.coucheFroms.push(coucheFrom);
        },
        deleteCoucheFrom(index: number) {
            this.coucheFroms.splice(index, 1);
        },
    },
});
export const DemandeFormStore = defineStore('demandeFromStore', {
    state: () => ({
        demandeFrom: createDefaultDemandeFormModel() as DemandeFormModel,
        modifCouchesDemande: [] as ModifDemandeCoucheModel[],
    }),
    actions: {
        async initialiser() {
            this.modifCouchesDemande = [];
            this.demandeFrom.affaires = await getAllAffaires();
            this.demandeFrom.systemes = await getAllSystemes()
        },
        clearDemandeFrom() {
            this.demandeFrom = createDefaultDemandeFormModel();
            this.clearModifCoucheDemande();
        },
        addModifCoucheDemande(modifCouche: ModifDemandeCoucheModel) {
            this.modifCouchesDemande.push(modifCouche);
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
    actions: {
        clearCommandeFrom() {
            this.commandeFrom = createDefaultCreerCommandeFormModel();
            this.clearModifCoucheCommande();
        },
        async setAllArticle() {
            this.commandeFrom.articles = await getAllArticles();
        },
        addModifCoucheCommande(modifCouche: ModifCommandeCoucheModel) {
            this.modifCouchesCommande.push(modifCouche);
        },
        clearModifCoucheCommande() {
            this.modifCouchesCommande = [];
        },
    },
});


export const CalendarStore = defineStore('calendarStore', {
    state: () => ({
        demandesCalendar: [] as DemandesCalendar[],
        ofsCalendar: [] as OfCalendar[],
        calendarModel: createDefaultCalendarModel() as CalendarModel,
    }),
    actions: {
        async setDemandesCalendar() {
            this.demandesCalendar = await getAllDemandeCalendar();
        },
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
                this.ofsCalendar[index].jourOf = jour;
                this.ofsCalendar[index].cabineOF = cabine;
                try {
                    const Of = createDefaultOf({
                        id: ofId,
                        jour: jour,
                        cabine: cabine,
                    });
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
                    jour: String(getJourEnumValue(jour)),
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


        getOFsByLigneEtJour(ligne: string, jour: string) {
            return this.ofsCalendar.filter(of => of.cabineOF === ligne && of.jourOf === jour);
        },

        getOfByJour(jour: string) {
            return this.ofsCalendar.filter(of => of.jourOf === jour && of.cabineOF === this.calendarModel.cabine);
        }

    },
})

export const SemaineStore = defineStore('SemaineStore', {
    state: () => ({
        Semaines: [] as Semaine[],
    }),
    actions: {
        async setSemaines() {
            this.Semaines = await getAllSemaines();
        }
    }
})

export const ListStore = defineStore('ListStore', {
    state: () => ({
        ListAffaire: createDefaultListAffaireModel(),
        ListDemande: createDefaultListDemandeModel(),
        ListSysteme: createDefaultListSystemeModel(),
        ListCommande: createDefaultListCommandeModel(),
    }),
    actions: {
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
            console.log(this.ListSysteme.systemes);
        },
        async setListCommande() {
            this.ListCommande.commandes = await getAllCommandes();
        }
    }
})