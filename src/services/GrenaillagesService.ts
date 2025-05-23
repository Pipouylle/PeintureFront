import axios from "axios";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {Grenaillage} from "@/models/types/Grenaillage";
import {Grenaillagemapper} from "@/mappers/Grenaillagemapper";

import {apiClient} from "@/stores/apiClient";

export const getAllGrenaillage = async (): Promise<Grenaillage[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/grenaillages');
        return Grenaillagemapper.mapArrayGrenaillage(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        throw error;
    }
};