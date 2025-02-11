import {apiClient} from "@/stores/apiClient";
import {Couche} from "@/models/types/couche";
import {Couches} from "@/models/objectsApi/Couches";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import Couchemapper from "@/mappers/Couchemapper";

export const getAllCouches = async (): Promise<Couche[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/couches');
        const data : Couches[] = response.data.member;
        return Couchemapper.mapArrayCouche(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des affaires:', error);
        throw error;
    }
};

export const creerCouche = async (couche : Couche) => {
    try {
        const couches = Couchemapper.mapCouches(couche);
        const response = await apiClient.post<Couches>('/couches', couches);
        return Couchemapper.mapCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des couches:', error);
        throw error;
    }
}

export const getArticlesCoucheByDemande = async (id: number) => {
    try {
        const response = await apiClient.get(`/articleCouchesByDemande/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des id des articles:', error);
        throw error;
    }
}

export const getCouchesBySysteme = async (id: number): Promise<Couche[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/couches?systeme_couche=/api/systemes/${id}`);
        return Couchemapper.mapArrayCouche(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        throw error;
    }
}

export const getCoucheById = async (id: number): Promise<Couche> => {
    try {
        const response = await apiClient.get<Couches>(`/couches/${id}`);
        return Couchemapper.mapCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        throw error;
    }
}