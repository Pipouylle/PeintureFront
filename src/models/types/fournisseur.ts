import {Systeme} from "@/models/types/systeme";
import {Article} from "@/models/types/article";

export interface Fournisseur {
    id: number;
    nom: string;
    systemes: Systeme[];
    articles: Article[];
}

export function createDefaultFournisseur(overrides: Partial<Fournisseur> = {}): Fournisseur {
    return {
        id: 0,
        nom: "",
        systemes: [],
        articles: [],
        ...overrides
    };
}