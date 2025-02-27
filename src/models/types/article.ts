import {ArticleCouche} from "@/models/types/articleCouche";
import {createDefaultFournisseur, Fournisseur} from "@/models/types/fournisseur";

export interface Article {
    id: number;
    descriptif: string;
    ral: string;
    couches: ArticleCouche[];
    fournisseur: Fournisseur;
}

export function createDefaultArticle (overrides: Partial<Article> = {}): Article {
    return {
        id: 0,
        descriptif: "",
        ral: "",
        couches: [],
        fournisseur: createDefaultFournisseur(),
        ...overrides
    };
}