import {createDefaultDemande, Demande} from "@/models/types/demande";
import {Consommation} from "@/models/types/consommation";
import {createDefaultSemaine, Semaine} from "@/models/types/semaine";

export interface Of {
    id: number;
    cabineOf: string;
    dateOf: string;
    avancementOf: string;
    jourOf: string;
    semaineOf: Semaine;
    idDemandeOf: Demande;
    consommationOf: Consommation[];
}

export function createDefaultOf(overrides: Partial<Of> = {}): Of {
    return {
        id: 0,
        cabineOf: "",
        dateOf: "",
        jourOf: "",
        semaineOf: createDefaultSemaine(),
        avancementOf: "0",
        idDemandeOf: createDefaultDemande(),
        consommationOf: [],
        ...overrides
    };
}