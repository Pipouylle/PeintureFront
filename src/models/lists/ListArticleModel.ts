import {Article} from "@/models/types/article";
import {creerArticle, deleteArticle, updateArticle} from "@/services/ArticlesService";

export interface ListArticleModel {
    articles: Article[];
    filter: string;
    modif: (article: Article) => Promise<boolean>;
    add: (article: Article) => Promise<boolean>;
    remove: (article: Article) => void;
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
        remove: async (article: Article) => {
            const index = listArticle.articles.findIndex(a => a.id === article.id);
            if (index !== -1) {
                await deleteArticle(article);
                listArticle.articles.splice(index, 1);
            }
        },
        ...overrides
    }
    return listArticle
}