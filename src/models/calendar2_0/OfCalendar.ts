import {createDefaultSemaine, Semaine} from "@/models/types/semaine";
import {createDefaultDemandesCalendar, DemandesCalendar} from "@/models/calendar2_0/DemandesCalendar";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";

export interface OfCalendar {
    id: number;
    cabineOF: string;
    avancementOf: number;
    jourOf: string;
    regieFPOf: string;
    regieSFPOf: string;
    semaineOf: Semaine;
    tempOf: string;
    idDemandeOf: DemandesCalendar;
    avancements: AvancementSurfaceCouche[];
    order: number;
}

export function createDefaultOfCalendar(overrides: Partial<OfCalendar> = {}): OfCalendar {
    return {
        id: 0,
        cabineOF: "",
        jourOf: "",
        semaineOf: createDefaultSemaine(),
        regieFPOf: "",
        regieSFPOf: "",
        avancementOf: 0,
        tempOf: "",
        idDemandeOf: createDefaultDemandesCalendar(),
        avancements: [],
        order: 1,
        ...overrides
    };
}