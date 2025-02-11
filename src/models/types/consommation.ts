import {Article, createDefaultArticle} from "@/models/types/article";

import {createDefaultOf, Of} from "@/models/types/of";

export interface Consommation {
    id: number;
    quantiter: number;
    of: Of;
    article: Article;
}

export function createDefaultConsommation(overrides: Partial<Consommation> = {}): Consommation {
    return {
        id: 0,
        quantiter: 0,
        of: createDefaultOf(),
        article: createDefaultArticle(),
        ...overrides
    };
}