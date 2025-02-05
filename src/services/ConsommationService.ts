import {apiClient} from "@/stores/apiClient";
import {Consommation} from "@/models/types/consommation";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import Consommationsmapper from "@/mappers/Consommationsmapper";
import {Consommations} from "@/models/objectsApi/Consommations";
import {Semaine} from "@/models/types/semaine";

export const getAllConsommations = async (): Promise<Consommation[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/consommations');
        return Consommationsmapper.mapArrayConsommation(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des consommations:', error);
        throw error;
    }
}

export const creerConsommation = async (consommation: Consommation): Promise<Consommation> => {
    try {
        const consommations = Consommationsmapper.mapConsommations(consommation);
        const response = await apiClient.post<Consommations>('/consommations', consommations);
        return Consommationsmapper.mapConsommation(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération de la consommation:', error);
        throw error;
    }
}

export const getAllConsommationBySemaine = async (semaine: Semaine): Promise<Consommation[]> => {
    try {
        const response = await apiClient.get<Consommations[]>(`/consommationsSemaine/${semaine.id}`);
        return Consommationsmapper.mapArrayConsommation(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des consommations:', error);
        throw error;
    }
}