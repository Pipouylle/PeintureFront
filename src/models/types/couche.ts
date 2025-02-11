
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {ArticleCouche} from "@/models/types/articleCouche";

export interface Couche {
    id: number;
    epaisseur: number;
    nom:string;
    tarif: number;
    article: ArticleCouche[];
    systeme: Systeme;
}

export function createDefaultCouche(overrides: Partial<Couche> = {}): Couche {
    return {
        id: 0,
        epaisseur: 0,
        nom: "",
        tarif: 0,
        article: [],
        systeme: createDefaultSysteme(),
        ...overrides
    };
}