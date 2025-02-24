import {createDefaultSemaine, Semaine} from "@/models/types/semaine";
import {Consommation} from "@/models/types/consommation";
import {createDefaultDemandesCalendar, DemandesCalendar} from "@/models/calendar/DemandesCalendar";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";

export interface OfCalendar {
    id: number;
    cabineOF: string;
    avancementOf: string;
    jourOf: string;
    semaineOf: Semaine;
    idDemandeOf: DemandesCalendar;
    consommationOf: Consommation[];
    avancements: AvancementSurfaceCouche[];
    order: number;
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
        avancements: [],
        order: 1,
        ...overrides
    };
}