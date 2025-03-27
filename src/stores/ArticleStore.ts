import {defineStore} from "pinia";
import {Article, createDefaultArticle} from "@/models/types/article";
import {getAllArticles, creerArticle, updateArticle, deleteArticle} from "@/services/ArticlesService";
import {ListArticleModel, createDefaultListArticleModel} from "@/models/lists/ListArticleModel";
import {getStockNotSortie} from "@/services/StockService";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import {ArticleFormModel, createDefaultArticleFormModel} from "@/models/forms/CreerArticle/ArticleFormModel";

export const listArticleStore = defineStore("listArticleStore", {
    state: () => ({
        listArticle: createDefaultListArticleModel() as ListArticleModel,
        isLoad: false as boolean,
    }),
    actions: {
        async load() {
            await listFournisseurStore().load();
            if (!this.isLoad) {
                await this.getAll();
                await this.setStock();
            }
        },
        unLoad() {
            this.isLoad = true;
        },
        async getAll(): Promise<boolean> {
            try {
                this.listArticle.articles = await getAllArticles();
                return true;
            } catch (e) {
                return false;
            }
        },
        async setStock() {
            const response = await getStockNotSortie();
            this.listArticle.stock = [];
            for (const article of this.listArticle.articles) {
                const number = response.filter((stock) => stock.article.id === article.id).length;
                if (number > 0) {
                    this.listArticle.stock.push({idArticle: article.id, quantite: number});
                } else {
                    this.listArticle.stock.push({idArticle: article.id, quantite: 0});
                }
            }
        },
        async delete(article: Article): Promise<boolean> {
            try {
                const index = listArticleStore().listArticle.articles.findIndex((a: Article) => a.id === article.id);
                if (index > -1) {
                    await deleteArticle(article);
                    listArticleStore().listArticle.articles.splice(index, 1);
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }
    }
});

export const creationArticleStore = defineStore("creationArticleStore", {
    state: () => ({
        articleForm: createDefaultArticleFormModel() as ArticleFormModel,
    }),
    actions: {
        async load() {
            await listArticleStore().load();
        },
        async create(): Promise<boolean> {
            try {
                const response = await creerArticle(this.articleForm.article);
                listArticleStore().listArticle.articles.push(response);
                this.clear();
                return true;
            } catch (e) {
                return false;
            }
        },
        clear() {
            this.articleForm.article = createDefaultArticle();
            this.articleForm.selectFournisseur = null;
        }
    }
});

export const updateArticleStore = defineStore("updateArticleStore", {
    state: () => ({
        articleForm: createDefaultArticleFormModel() as ArticleFormModel,
    }),
    actions: {
        async load() {
            await listArticleStore().load();
        },
        async update(): Promise<boolean> {
            try {
                await updateArticle(this.articleForm.article);
                const index = listArticleStore().listArticle.articles.findIndex((a: Article) => a.id === this.articleForm.article.id);
                listArticleStore().listArticle.articles[index] = this.articleForm.article;
                return true;
            } catch (e) {
                return false;
            }
        }
    }
});