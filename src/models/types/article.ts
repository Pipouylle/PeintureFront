import {ArticleCouche} from "@/models/types/articleCouche";

export interface Article {
    id: number;
    descriptif: string;
    couches: ArticleCouche[];
}

export function createDefaultArticle (overrides: Partial<Article> = {}): Article {
    return {
        id: 0,
        descriptif: "",
        couches: [],
        ...overrides
    };
}