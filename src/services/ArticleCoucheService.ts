import {apiClient, apiClientPatch} from "@/stores/apiClient";
import {ArticleCouche} from "@/models/types/articleCouche";
import {ArticleCouches} from "@/models/objectsApi/ArticleCouches";
import ArticleCouchemapper from "@/mappers/ArticleCouchemapper";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import {Commande} from "@/models/types/commande";
import {ArticlesArticleCouche} from "@/models/objectsApi/articlesArticleCouche";
import {Demande} from "@/models/types/demande";
import Articlemapper from "@/mappers/Articlemapper";
import Couchemapper from "@/mappers/Couchemapper";
import {Article} from "@/models/types/article";


export const getAllArticleCouche = async (): Promise<ArticleCouche[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>("/articleCouche");
        return ArticleCouchemapper.mapArrayArticleCouche(response.data.member);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const creerArticleCouche = async (articleCouche: ArticleCouche): Promise<ArticleCouche> => {
    try {
        const articleCouches = ArticleCouchemapper.mapArticleCouches(articleCouche);
        const response = await apiClient.post<ArticleCouches>("/article_couches", articleCouches);
        articleCouche.id = response.data?.id ?? 0;
        await putArticles(articleCouche);
        return ArticleCouchemapper.mapArticleCouche(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getArticleCoucheByCommande = async (commande: Commande): Promise<ArticleCouche[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/article_couches?commande_articleCouche=${commande.id}`);
        return ArticleCouchemapper.mapArrayArticleCouche(response.data.member);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const putArticles = async (articleCouche: ArticleCouche) => {
    try {
        const articles = {
            articlesArticleCouche: articleCouche.articles.map((article) => {
                return "/api/articles/" + article.id;
            })
        };
        const response = await apiClientPatch.patch(`/articlesArticleCouche/${articleCouche.id}`, articles)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getArticlesByIdArticleCouche = async (articleCouche: ArticleCouche): Promise<ArticlesArticleCouche> => {
    try {
        const response = await apiClient.get<ArticlesArticleCouche>(`/articlesArticleCouche/${articleCouche.id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getArticleCoucheForDemande = async (commande: Commande): Promise<ArticleCouche[]> => {
    try {
        const response = await apiClient.get<any>(`/articleCoucheDemande/${commande.id}`);
        const ArticleCouches = ArticleCouchemapper.mapArrayArticleCouche(response.data);
        for (let i = 0; i < ArticleCouches.length; i++) {
            ArticleCouches[i].articles = Articlemapper.mapArrayArticle(response.data[i].articlesArticleCouche);
            ArticleCouches[i].commande = commande;
            ArticleCouches[i].couche = Couchemapper.mapCouche(response.data[i].coucheArticleCouche);
        }
        return ArticleCouches;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getArticleCoucheBySystemeAndCommande = async (systemeId: number, commandeId: number): Promise<ArticleCouche[]> => {
    try {
        const response = await apiClient.get<any>(`/articleCoucheBySystemeAndCommande/${systemeId}/${commandeId}`);
        const ArticleCouches = ArticleCouchemapper.mapArrayArticleCouche(response.data);
        for (let i = 0; i < ArticleCouches.length; i++) {
            ArticleCouches[i].articles = Articlemapper.mapArrayArticle(response.data[i].articlesArticleCouche);
        }
        return ArticleCouches;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateArticleArticleCouche = async (articleCouche: ArticleCouche): Promise<ArticleCouche> => {
    try {
        //TODO: check for api wath  nead to be updated because the structure of update only article
        const listArticle = Articlemapper.mapArrayArticles(articleCouche.articles);
        const response = await apiClientPatch.patch<any>(`/articlesArticleCouche/${articleCouche.id}`, {
            articlesArticleCouche: listArticle.map((article) => {
                return "/api/articles/" + article.id;
            })
        });
        console.log(response.data);
        return ArticleCouchemapper.mapArticleCouche(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}