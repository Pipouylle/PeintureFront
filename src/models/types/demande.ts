import {Commande, createDefaultCommande} from "@/models/types/commande";

import {Of} from "@/models/types/of";

export interface Demande {
    id: number;
    numero: string;
    etat: string;
    surface: number;
    date: string;
    nombrePiece: number;
    commande: Commande;
    ofs: Of[];
}

export function createDefaultDemande(overrides: Partial<Demande> = {}): Demande {
    return {
        id: 0,
        numero: "",
        etat: "pas commencer",
        surface: 0,
        date: "",
        nombrePiece: 0,
        commande: createDefaultCommande(),
        ofs: [],
        ...overrides
    };
}