import {createDefaultDemandesCalendar, DemandesCalendar} from "@/models/calendar2_0/DemandesCalendar";
import {createDefaultOfCalendar, OfCalendar} from "@/models/calendar2_0/OfCalendar";
import {Of, createDefaultOf} from "@/models/types/of";
import {Demande, createDefaultDemande} from "@/models/types/demande";
import {Semaine, createDefaultSemaine} from "@/models/types/semaine";

export interface PlaningModel {
    headerListOf: {title: string, value: string}[];
    headerListDemande: {title: string, value: string}[];
    listDemande: Demande[];
    listOf: Of[];
    demandeClone: Demande;
    ofClone: Of;
    temp: string[];
    jour: string[];
    cabines: string[];
    cabine: string;
    semaine: Semaine;
}

export function createDefaultPlaningModel(override: Partial<PlaningModel> = {}): PlaningModel {
    return {
        headerListOf: [
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
        listOf: [],
        listDemande: [],
        demandeClone: createDefaultDemande(),
        ofClone: createDefaultOf(),
        temp: ["matin","après-midi","nuit"],
        jour: ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],
        cabines: ["cabine 1","cabine 2"],
        cabine: "",
        semaine: createDefaultSemaine(),
        ...override,
    };
}