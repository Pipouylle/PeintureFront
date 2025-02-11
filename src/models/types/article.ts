import {Consommation} from "@/models/types/consommation";
import {ArticleCouche} from "@/models/types/articleCouche";

export interface Article {
    id: number;
    descriptif: string;
    consommations: Consommation[];
    couches: ArticleCouche[];
}

export function createDefaultArticle (overrides: Partial<Article> = {}): Article {
    return {
        id: 0,
        descriptif: "",
        consommations: [],
        couches: [],
        ...overrides
    };
}