import {apiClient} from "@/stores/apiClient";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import Semainemapper from "@/mappers/Semainemapper";
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

export const getSemainesByAnnesAndMois = async (annee: number, mois: number): Promise<Semaine[]> => {
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
        const response = await apiClient.get<ApiResponseCollection>(`/semaines?annees=${semaine.annee}&semaine=${semaine.semaine}`);
        return Semainemapper.mapArraySemaine(response.data.member)[0]
    } catch (error) {
        console.log('erreur lors de la récupération de la semaine:', error);
        throw error;
    }
}

/**
 * Permet de passer modif une semaine, les info requise sont le num de l'année et le num du mois
 * @param semaine
 * @returns Semaine
 */
export const updateSemaine = async (semaine: Semaine): Promise<Semaine> => {
    try {
        const response = await apiClient.patch(`/semaines/${semaine.id}`, Semainemapper.mapSemaines(semaine));
        return Semainemapper.mapSemaine(response.data);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la semaine:', error);
        throw error;
    }
}