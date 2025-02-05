import {Consommation, createDefaultConsommation} from "@/models/types/consommation";
import {Couche} from "@/models/types/couche";

export interface Article {
    id: number;
    nomArticle: string;
    rALArticle: string;
    quantiterArticle: number;
    typeArticle: string;
    fournisseurArticle: string;
    consommations: Consommation[];
    couches: Couche[];
}

export function createDefaultArticle (overrides: Partial<Article> = {}): Article {
    return {
        id: 0,
        nomArticle: "",
        rALArticle: "",
        quantiterArticle: 0,
        typeArticle: "",
        fournisseurArticle: "",
        consommations: [],
        couches: [],
        ...overrides
    };
}