import {createDefaultDemandesCalendar, DemandesCalendar} from "@/models/calendar/DemandesCalendar";
import {createDefaultOfCalendar, OfCalendar} from "@/models/calendar/OfCalendar";

export interface CalendarViewModel {
    headerListJour: {title: string, value: string}[];
    headerListDemande: {title: string, value: string}[];
    demandeClone: DemandesCalendar;
    ofClone: OfCalendar;
    jour: string[];
    cabines: string[];
    cabine: string;
}

export function createDefaultCalendarViewModel(overrides: Partial<CalendarViewModel> = {}) : CalendarViewModel {
    return {
        headerListJour: [
            {title: '', value: 'drag'},
            {title: "numéro Affaire", value: "idDemandeOf.numeroAffaire"},
            {title: "nom Affaire", value: "idDemandeOf.nomAffaire"},
            {title: "numéro Demande", value: "idDemandeOf.numeroDemande"},
            {title: "systeme", value: "idDemandeOf.nomSysteme"},
            {title: "surface", value: "idDemandeOf.surfaceDemande"},
            {title: "date besoin", value: "idDemandeOf.dateDemande"},
        ],
        headerListDemande: [
            {title: '', value: 'drag'},
            {title: "numéro Affaire", value: "numeroAffaire"},
            {title: "nom Affaire", value: "nomAffaire"},
            {title: "numéro Demande", value: "numeroDemande"},
            {title: "systeme", value: "nomSysteme"},
            {title: "surface", value: "surfaceDemande"},
            {title: "date besoin", value: "dateDemande"},
        ],
        demandeClone: createDefaultDemandesCalendar(),
        ofClone: createDefaultOfCalendar(),
        jour: ["lundi","mardi","mercredi","jeudi","vendredi"],
        cabines: ["cabine 1","cabine 2"],
        cabine: "",
    }
}