import axios from 'axios';
import {Affaire} from "@/models/types/affaire";
import {Affaires} from "@/models/objectsApi/Affaires";
import Affairemappers from "@/mappers/Affairemappers";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL de votre API Symfony
    headers: {
        'Content-Type': 'application/ld+json',
    },
});

export const getAllAffaires = async (): Promise<Affaire[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/affaires');

        const data = response.data;
        const affaires: Affaires[] = data.member;
        return Affairemappers.mapArrayAffaire(affaires);
    } catch (error) {
        console.error('Erreur lors de la récupération des affaires:', error);
        throw error;
    }
};

export const creerAffaire = async (affaire : Affaire): Promise<Affaire> => {
    try {
        const affaires = Affairemappers.mapAffaires(affaire);
        const response = await apiClient.post<Affaires>('/affaires', affaires);
        return Affairemappers.mapAffaire(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des affaires:', error);
        throw error;
    }
}
