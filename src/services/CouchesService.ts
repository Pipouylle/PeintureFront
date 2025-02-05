import App from "@/App.vue";
import axios from 'axios';
import {ref} from 'vue';
import {Couche} from "@/models/types/couche";
import {Couches} from "@/models/objectsApi/Couches";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import Couchemapper from "@/mappers/Couchemapper";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL de votre API Symfony
    headers: {
        'Content-Type': 'application/ld+json',
    },
});

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