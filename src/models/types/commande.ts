import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {Demande} from "@/models/types/demande";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {ArticleCouche} from "@/models/types/articleCouche";

export interface Commande {
    id: number;
    eureka: string;
    commentaire: string;
    surface: number;
    ficheH: boolean;
    pvPeinture: boolean;
    regieSFP: number;
    regieFP: number;
    grenaillage: number;
    ral: number;
    affaire: Affaire;
    systeme: Systeme;
    demandes: Demande[];
    articles: ArticleCouche[];
}

export function createDefaultCommande(overrides: Partial<Commande> = {}): Commande {
    return {
        id: 0,
        eureka: "",
        commentaire: "",
        surface: 0,
        ficheH: false,
        pvPeinture: false,
        regieSFP: 0,
        regieFP: 0,
        grenaillage: 0,
        ral: 0,
        affaire: createDefaultAffaire(),
        systeme: createDefaultSysteme(),
        demandes: [],
        articles: [],
        ...overrides
    };
}