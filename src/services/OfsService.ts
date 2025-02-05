import {apiClient} from "@/stores/apiClient";
import Ofsmapper from "@/mappers/Ofsmapper";
import {Of} from "@/models/types/of";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {Ofs} from "@/models/objectsApi/Ofs";
import {Semaines} from "@/models/objectsApi/Semaines";
import {Semaine} from "@/models/types/semaine";

export const getAllOfs = async (): Promise<Of[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/o_fs');
        return Ofsmapper.mapArrayOf(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des ofs:', error);
        throw error;
    }
}

export const creerOf = async (of: Of) : Promise<Of> => {
    try {
        const ofs = Ofsmapper.mapOfs(of);
        console.log(ofs);
        const response = await apiClient.post<Ofs>('/o_fs', ofs);
        return Ofsmapper.mapOf(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des ofs:', error);
        throw error;
    }
}

export const updateOF = async (of: Of): Promise<Of> => {
    try {
        const ofs = Ofsmapper.mapOfs(of);
        const response = await apiClient.put<Ofs>(`/o_fs/${of.id}`, ofs);
        return Ofsmapper.mapOf(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des ofs:', error);
        throw error;
    }
}

export const getAllOfbySemaine = async (semaine : Semaine) : Promise<Of[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/o_fs?semaine_of=/api/semaines/${semaine.id}`);
        return Ofsmapper.mapArrayOf(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des ofs:', error);
        throw error;
    }
}