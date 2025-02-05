import {Commande, createDefaultCommande} from "@/models/types/commande";

import {Of} from "@/models/types/of";

export interface Demande {
    id: number;
    numeroDemande: string;
    numeroPhaseDemande: string;
    etatDemande: string;
    surfaceDemande: number;
    nombrePieceDemande: number;
    idCommandeDemande: Commande;
    ofDemande: Of[];
}

export function createDefaultDemande(overrides: Partial<Demande> = {}): Demande {
    return {
        id: 0,
        numeroDemande: "",
        numeroPhaseDemande: "",
        etatDemande: "pas commencer",
        surfaceDemande: 0,
        nombrePieceDemande: 0,
        idCommandeDemande: createDefaultCommande(),
        ofDemande: [],
        ...overrides
    };
}