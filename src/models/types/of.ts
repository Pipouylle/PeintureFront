import {createDefaultDemande, Demande} from "@/models/types/demande";
import {Consommation} from "@/models/types/consommation";
import {createDefaultSemaine, Semaine} from "@/models/types/semaine";

export interface Of {
    id: number;
    cabine: string;
    avancement: string;
    jour: string;
    semaine: Semaine;
    demande: Demande;
    consommations: Consommation[];
}

export function createDefaultOf(overrides: Partial<Of> = {}): Of {
    return {
        id: 0,
        cabine: "",
        jour: "",
        semaine: createDefaultSemaine(),
        avancement: "0",
        demande: createDefaultDemande(),
        consommations: [],
        ...overrides
    };
}