import {Commande, createDefaultCommande} from "@/models/types/commande";

import {Of} from "@/models/types/of";
import {SurfaceCouche} from "@/models/types/surfaceCouche";

export interface Demande {
    id: number;
    numero: string;
    etat: string;
    surface: number;
    date: string;
    nombrePiece: number;
    reservation: boolean;
    commande: Commande;
    ofs: Of[];
    surfaceCouches: SurfaceCouche[];
}

export function createDefaultDemande(overrides: Partial<Demande> = {}): Demande {
    return {
        id: 0,
        numero: "",
        etat: "pas commencer",
        surface: 0,
        date: "",
        nombrePiece: 0,
        reservation: false,
        commande: createDefaultCommande(),
        ofs: [],
        surfaceCouches: [],
        ...overrides
    };
}