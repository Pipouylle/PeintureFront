import {createDefaultSemaine, Semaine} from "@/models/types/semaine";
import {Consommation} from "@/models/types/consommation";
import {createDefaultDemandesCalendar, DemandesCalendar} from "@/models/calendar/DemandesCalendar";

export interface OfCalendar {
    id: number;
    cabineOF: string;
    avancementOf: string;
    jourOf: string;
    semaineOf: Semaine;
    idDemandeOf: DemandesCalendar;
    consommationOf: Consommation[];
}

export function createDefaultOfCalendar(overrides: Partial<OfCalendar> = {}): OfCalendar {
    return {
        id: 0,
        cabineOF: "",
        jourOf: "",
        semaineOf: createDefaultSemaine(),
        avancementOf: "",
        idDemandeOf: createDefaultDemandesCalendar(),
        consommationOf: [],
        ...overrides
    };
}