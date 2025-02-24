import {Article} from "@/models/types/article";
import {creerArticle, updateArticle} from "@/services/ArticlesService";

export interface ListArticleModel {
    articles: Article[];
    filter: string;
    modif: (article: Article) => Promise<boolean>;
    add: (article: Article) => Promise<boolean>;
}

export function createDefaultListArticleModel(overrides: Partial<ListArticleModel> = {}): ListArticleModel {
    const listArticle = {
        articles: [],
        filter: "",
        modif: async (article: Article): Promise<boolean> => {
            try {
                await updateArticle(article);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        add: async (article: Article): Promise<boolean> => {
          try {
              const response = await creerArticle(article);
              listArticle.articles.push(response);
              return true;
          } catch (e) {
                console.error(e);
                return false;
          }
        },
        ...overrides
    }
    return listArticle
}