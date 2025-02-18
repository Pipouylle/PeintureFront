import {Article} from "@/models/types/article";
import {updateArticle} from "@/services/ArticlesService";

export interface ListArticleModel {
    articles: Article[];
    filter: string;
    modif: (article: Article) => Promise<boolean>;
}

export function createDefaultListArticleModel(overrides: Partial<ListArticleModel> = {}): ListArticleModel {
    return {
        articles: [],
        filter: "",
        modif: async (article): Promise<boolean> => {
            try {
                await updateArticle(article);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        ...overrides
    };
}