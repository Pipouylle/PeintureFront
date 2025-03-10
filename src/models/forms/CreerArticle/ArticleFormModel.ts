import {Selected} from "@/models/common/Selected";
import {Article, createDefaultArticle} from "@/models/types/article";

export interface ArticleFormModel {
    article: Article;
    selectFournisseur: Selected | null;
}

export function createDefaultArticleFormModel(overrides: Partial<ArticleFormModel> = {}): ArticleFormModel {
    return {
        article: createDefaultArticle(),
        selectFournisseur: null,
        ...overrides
    }
}