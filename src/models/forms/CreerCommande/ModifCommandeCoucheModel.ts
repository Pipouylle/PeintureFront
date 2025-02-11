import {ArticleCouche, createDefaultArticleCouche} from "@/models/types/articleCouche";
import {SelectArticles} from "@/models/forms/CreerCommande/SelectArticles";

export interface ModifCommandeCoucheModel {
    id: number;
    articleCouche: ArticleCouche;
    articles: SelectArticles[];
}

export function createDefaultModifCommandeCoucheModel(override: Partial<ModifCommandeCoucheModel> = {}): ModifCommandeCoucheModel {
    return {
        id: 0,
        articles: [],
        articleCouche: createDefaultArticleCouche({}),
        ...override
    }
}