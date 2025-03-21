import {Selected} from "@/models/common/Selected";
import {createDefaultSemaine, Semaine} from "@/models/types/semaine";

export interface ViewUsineModel {
    cabine: string;
    semaine: Semaine;
    jour: string;
    temp: string;
    date: string;
    jours: string[];
}

export function createDefaultViewUsineModel(overrides: Partial<ViewUsineModel> = {}): ViewUsineModel {
    return {
        cabine: "",
        semaine : createDefaultSemaine(),
        jour: "",
        temp: "",
        date: new Date().toISOString(),
        jours: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
        ...overrides
    };
}