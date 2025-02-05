import axios from 'axios';


import {Article} from "@/models/types/article";
import {TypesArticles} from "@/models/objectsApi/TypesArticles";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {Articles} from "@/models/objectsApi/Articles";
import Articlemapper from "@/mappers/Articlemapper";
import Affairemappers from "@/mappers/Affairemappers";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL de votre API Symfony
    headers: {
        'Content-Type': 'application/ld+json',
    },
});

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
}

export const getTypesArticles = async (): Promise<TypesArticles[]> => {
    try {
        const response = await apiClient.get<TypesArticles[]>('/articlesTypes');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des categorie:', error);
        throw error;
    }
}

export const getArticleByCategorie = async (type: string): Promise<Article[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/articles?type_article=${type}`);
        const data :Articles[] = response.data.member;
        return Articlemapper.mapArrayArticle(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des affaires:', error);
        throw error;
    }
}
