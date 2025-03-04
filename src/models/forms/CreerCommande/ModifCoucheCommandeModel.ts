import {ArticleCouche, createDefaultArticleCouche} from "@/models/types/articleCouche";
import {SelectArticles} from "@/models/forms/CreerCommande/SelectArticles";

export interface ModifCoucheCommandeModel {
    id: number;
    articleCouche: ArticleCouche;
    articles: SelectArticles[];
}

export function createDefaultModifCoucheCommandeModel(override: Partial<ModifCoucheCommandeModel> = {}): ModifCoucheCommandeModel {
    return {
        id: 0,
        articles: [],
        articleCouche: createDefaultArticleCouche({}),
        ...override
    }
}