import {apiClient} from "@/stores/apiClient";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {Semainemapper} from "@/mappers/Semainemapper";
import {Semaine} from "@/models/types/semaine";

export const getAllSemaines = async (): Promise<Semaine[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/semaines');
        return Semainemapper.mapArraySemaine(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des semaines:', error);
        throw error;
    }
}

export const getSemianesByAnnesAndMois = async (annee: number, mois: number): Promise<Semaine[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/semaines?annee=${annee}&mois=${mois}`);
        return Semainemapper.mapArraySemaine(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des semaines:', error);
        throw error;
    }
}

export const getSemaineByInfo = async (semaine : Semaine): Promise<Semaine> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/semaines?annees=${semaine.annee}&mois=${semaine.mois}&semaine=${semaine.semaine}`);
        return Semainemapper.mapArraySemaine(response.data.member)[0]
    } catch (error) {
        console.log('erreur lors de la récupération de la semaine:', error);
        throw error;
    }
}