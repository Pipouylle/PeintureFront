import {Article, createDefaultArticle} from "@/models/types/article";

import {createDefaultOf, Of} from "@/models/types/of";

export interface Consommation {
    id: number;
    quantiterConsommation: number;
    idOfConsommation: Of;
    codeArticleConsommation: Article;
}

export function createDefaultConsommation(overrides: Partial<Consommation> = {}): Consommation {
    return {
        id: 0,
        quantiterConsommation: 0,
        idOfConsommation: createDefaultOf(),
        codeArticleConsommation: createDefaultArticle(),
        ...overrides
    };
}