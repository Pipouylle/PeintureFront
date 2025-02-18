import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {Grenaillage} from "@/models/types/Grenaillage";
import {Grenaillagemapper} from "@/mappers/Grenaillagemapper";

import {apiClient, apiClientPatch} from "@/stores/apiClient";

export const getAllGrenaillage = async (): Promise<Grenaillage[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/grenaillages');
        return Grenaillagemapper.mapArrayGrenaillage(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des grennaillage:', error);
        throw error;
    }
};

export const updateGrenaillage = async (grenaillage : Grenaillage): Promise<Grenaillage> => {
    try {
        const grenaillages = Grenaillagemapper.mapGrenaillages(grenaillage);
        const reponse = await apiClientPatch.patch('/grenaillages/'+grenaillages.id, grenaillages);
        return Grenaillagemapper.mapGrenaillage(reponse.data);
    } catch (error) {
        console.error('Erreur lors de la modif du grennaillage:', error);
        throw error;
    }
}