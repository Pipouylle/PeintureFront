import {createDefaultDemande, Demande} from "@/models/types/demande";
import {createDefaultSemaine, Semaine} from "@/models/types/semaine";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";

export interface Of {
    id: number;
    cabine: string;
    avancement: number;
    jour: string;
    regieSFP: number;
    regieFP: number;
    semaine: Semaine;
    demande: Demande;
    temp: string;
    avancements: AvancementSurfaceCouche[];
    order: number;
}

export function createDefaultOf(overrides: Partial<Of> = {}): Of {
    return {
        id: 0,
        cabine: "",
        jour: "",
        semaine: createDefaultSemaine(),
        regieSFP: 0,
        regieFP: 0,
        avancement: 0,
        temp: "",
        demande: createDefaultDemande(),
        avancements: [],
        order: 1,
        ...overrides
    };
}