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
        console.log(consommations);
        const response = await apiClient.post<Consommations>('/consommations', consommations);
        return Consommationsmapper.mapConsommation(response.data);
    } catch (error) {
        console.error('Erreur lors de la création de la consommation:', error);
        throw error;
    }
}

export const getAllConsommationBySemaine = async (semaine: Semaine): Promise<Consommation[]> => {
    try {
        const response = await apiClient.get<Consommations[]>(`/consommationsSemaine/${semaine.id}`);
        console.log(response.data);
        return Consommationsmapper.mapArrayConsommation(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des consommations:', error);
        throw error;
    }
}

export const updateConsommation = async (consommation: Consommation): Promise<Consommation> => {
    try {
        const consommations = Consommationsmapper.mapConsommations(consommation);
        const response = await apiClient.patch<Consommations>(`/consommations/${consommation.id}`, consommations);
        return Consommationsmapper.mapConsommation(response.data);
    } catch (error) {
        console.error('Erreur lors de la modification de la consommation:', error);
        throw error;
    }
}