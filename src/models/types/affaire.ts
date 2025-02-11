import {Commande} from "@/models/types/commande";
import {Systeme} from "@/models/types/systeme";

export interface Affaire {
    id: number;
    numero: string;
    nom: string;
    commandes: Commande[];
    systemes: Systeme[];
}

export function createDefaultAffaire (overrides: Partial<Affaire> = {}): Affaire {
    return {
        id: 0,
        numero: "",
        nom: "",
        commandes: [],
        systemes: [],
        ...overrides
    };
}

