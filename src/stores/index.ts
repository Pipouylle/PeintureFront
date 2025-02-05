import {defineStore} from "pinia";
import {CoucheFormModel} from "src/models/forms/CoucheFormModel";
import {createDefaultDemandeFormModel, DemandeFormModel} from "@/models/forms/DemandeFormModel";
import {ModifDemandeCoucheModel} from "@/models/forms/ModifDemandeCoucheModel";
import {getAllDemandeCalendar} from "@/services/DemandesService";
import {DemandesCalendar} from "@/models/calendar/DemandesCalendar";
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
import {getArticlesCoucheByDemande} from "@/services/CouchesService";
import {getJourEnumValue} from "@/enums/Jour";

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

export const CoucheFormStore = defineStore('coucheFromStore', {
    state: () => ({
        coucheFroms: [] as CoucheFormModel[],
    }),
    getters: {
        getnbCoucheForm: (state) => state.coucheFroms.length,
    },
    actions: {
        addCoucheFrom(coucheFrom: CoucheFormModel) {
            this.coucheFroms.push(coucheFrom);
        },
        deleteCoucheFrom(index: number) {
            this.coucheFroms.splice(index, 1);
        },
    },
});

export const nbCoucheFromStore = defineStore('nbCoucheFromStore', {
    state: () => ({
        nbCoucheFrom: 0,
    }),
    actions: {
        setNbCoucheFrom(nb: number) {
            this.nbCoucheFrom = nb;
        },
    },
});

export const DemandeFormStore = defineStore('demandeFromStore',
    {
        state: () => ({
            demandeFrom: createDefaultDemandeFormModel() as DemandeFormModel,
            modifCouchesDemande: [] as ModifDemandeCoucheModel[],
        }),
        actions: {
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
                ofCalendar.consommationOf = responseConsommation.filter(c => c.idOfConsommation.id === ofCalendar.id);
            }
        },

        async updateOfCalendar(ofId: number, jour: string, cabine: string) {
            const index = this.ofsCalendar.findIndex(o => o.id === ofId);
            if (index !== -1) {
                this.ofsCalendar[index].jourOf = jour;
                this.ofsCalendar[index].cabineOF = cabine;
                try {
                    const Of = createDefaultOf({
                        id: ofId,
                        jourOf: jour,
                        cabineOf: cabine,
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
                    idDemandeOf: createDefaultDemande({
                        id: demandeId,
                    }),
                    dateOf: new Date().toISOString().split('T')[0],
                    jourOf: String(getJourEnumValue(jour)),
                    cabineOf: cabine,
                });
                Of.avancementOf = "0";
                Of.semaineOf = CalendarStore().calendarModel.semaine;
                const responseOf = await creerOf(Of);
                const responseArticle = await getArticlesCoucheByDemande(demandeId);
                const consommations: Consommation[] = [];
                for (const id of responseArticle) {
                    const consommation = createDefaultConsommation();
                    consommation.idOfConsommation.id = responseOf.id;
                    consommation.codeArticleConsommation.id = id["id"];
                    const responseConsommation = await creerConsommation(consommation);
                    consommations.push(responseConsommation);
                }
                responseOf.consommationOf = consommations;
                this.addOfCalendar(OfCalendarmapper.mapOfCalendar(responseOf));
            } catch (error) {
                console.error('Erreur lors de la création de l’OF', error);
            }
        },


        getOFsByLigneEtJour(ligne: string, jour: string) {
            return this.ofsCalendar.filter(of => of.cabineOF === ligne && of.jourOf === jour);
        },

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