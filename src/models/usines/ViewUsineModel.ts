import {Selected} from "@/models/common/Selected";
import {createDefaultSemaine, Semaine} from "@/models/types/semaine";

export interface ViewUsineModel {
    cabine: string;
    semaine: Semaine;
    jour: string;
    temp: string;
    date: string;
    cabines: string[];
    jours: string[];
    temps: string[];
}

export function createDefaultViewUsineModel(overrides: Partial<ViewUsineModel> = {}): ViewUsineModel {
    return {
        cabine: "",
        semaine : createDefaultSemaine(),
        jour: "",
        temp: "",
        date: "",
        cabines: ["cabine 1", "cabine 2"],
        jours: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
        temps: ["matin","après-midi","nuit"],
        ...overrides
    };
}