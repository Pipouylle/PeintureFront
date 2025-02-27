import {Article} from "@/models/types/article";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import {Articles} from "@/models/objectsApi/Articles";
import Articlemapper from "@/mappers/Articlemapper";
import {getArticlesByIdArticleCouche} from "@/services/ArticleCoucheService";
import {ArticleCouche} from "@/models/types/articleCouche";
import {apiClient, apiClientPatch} from "@/stores/apiClient";




export const getAllArticles = async (): Promise<Article[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/articles');
        return Articlemapper.mapArrayArticle(response.data.member);
    } catch (error) {
        // Log des erreurs dans la console
        console.error('Erreur lors de la récupération des articles:', error);
        throw error;
    }
};

export const getArticleByCode = async (code: string): Promise<Article[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/articles/${code}`);


        return Articlemapper.mapArrayArticle(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article:', error);
        throw error;
    }
};

export const getIDArticleByDemande = async (demandeId: number): Promise<Article[]> => {
    try {
        const response = await apiClient.get<Articles[]>(`/articleCouche/${demandeId}`);
        return Articlemapper.mapArrayArticle(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article:', error);
        throw error;
    }
}

export const getArticlesByArticleCouche = async (articleCouche: ArticleCouche): Promise<Article[]> => {
    try {
        const responseIds = await getArticlesByIdArticleCouche(articleCouche);
        const responseArticles :Articles[] = [];
        for (const responseId of responseIds.articlesArticleCouche) {
            responseArticles.push((await apiClient.get<Articles>(`/articles/${responseId.split('/').pop()}`)).data);
        }
        return Articlemapper.mapArrayArticle(responseArticles);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const creerArticle = async (article: Article): Promise<Article> => {
    try {
        const articles = Articlemapper.mapArticles(article);
        const response = await apiClient.post<Articles>('/articles', articles);
        return Articlemapper.mapArticle(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        throw error;
    }
}

export const updateArticle = async (article: Article): Promise<Article> => {
    try {
        const articles = Articlemapper.mapArticles(article);
        console.log(articles);
        const response = await apiClientPatch.patch(`/articles/${article.id}`, articles);
        return Articlemapper.mapArticle(response.data);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const deleteArticle = async (article: Article) => {
    try {
        await apiClient.delete(`/articles/${article.id}`);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error);
        throw error;
    }
}