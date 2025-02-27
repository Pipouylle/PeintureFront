import {Affaire} from "@/models/types/affaire";
import {Affaires} from "@/models/objectsApi/Affaires";
import Affairemappers from "@/mappers/Affairemappers";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import {apiClient, apiClientPatch} from "@/stores/apiClient";



export const getAllAffaires = async (): Promise<Affaire[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/affaires');
        return Affairemappers.mapArrayAffaire(response.data.member);
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
export const updateAffaire = async (affaire : Affaire): Promise<Affaire> => {
    try {
        const affaires = Affairemappers.mapAffaires(affaire);
        const response = await apiClientPatch.patch(`/affaires/${affaire.id}`, affaires);
        return Affairemappers.mapAffaire(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des affaires:', error);
        throw error;
    }
}

export const deleteAffaire = async (affaire : Affaire)=> {
    try {
        await apiClient.delete(`/affaires/${affaire.id}`);
    } catch (error) {
        console.error('Erreur lors de la récupération des affaires:', error);
        throw error;
    }
}
