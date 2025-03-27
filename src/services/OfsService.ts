import {apiClient, apiClientPatch} from "@/stores/apiClient";
import Ofsmapper from "@/mappers/Ofsmapper";
import {Of} from "@/models/types/of";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import {Ofs} from "@/models/objectsApi/Ofs";
import {Semaine} from "@/models/types/semaine";
import {getJourEnumValue} from "@/enums/Jour";

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
        console.log(of);
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
        const response = await apiClientPatch.patch<Ofs>(`/o_fs/${of.id}`, ofs);
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

export const deleteOf = async (of: Of) => {
    try {
        await apiClient.delete(`/o_fs/${of.id}`);
    } catch (error) {
        console.error('Erreur lors de la récupération des ofs:', error);
        throw error;
    }
}

export const updateOfOrder = async (of: Of): Promise<Of> => {
    try {
        const ofs = Ofsmapper.mapOfs(of);
        const response = await apiClientPatch.patch<Ofs>(`/ofsOrder/${of.id}`, ofs);
        return Ofsmapper.mapOf(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des ofs:', error);
        throw error;
    }
}

export const getOfBySemaineAndJour = async (jour: string, semaine: Semaine): Promise<Of[]> => {
    try {
        const jourValue = getJourEnumValue(jour)
        const response = await apiClient.get<ApiResponseCollection>(`/o_fs?semaine_of=${semaine.id}&jour_of=${jourValue}`);
        return Ofsmapper.mapArrayOf(response.data.member);
    } catch (e) {
        console.error('Erreur lors de la récupération des ofs par la semaine et le jour:', e);
        throw e;
    }
}

export const getOfBySemaine = async (semaine: Semaine): Promise<Of[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/o_fs?semaine_of=${semaine.id}`);
        return Ofsmapper.mapArrayOf(response.data.member);
    } catch (e) {
        console.error('Erreur lors de la récupération des ofs par la semaine et le jour:', e);
        throw e;
    }
}

export const updateAvancementOf = async (of: Of): Promise<Of> => {
    try {
        const ofs = Ofsmapper.mapOfs(of);
        const response = await apiClientPatch.patch<Ofs>(`/ofsAvancement/${of.id}`, ofs);
        return Ofsmapper.mapOf(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des ofs:', error);
        throw error;
    }
}

export const getOfForSortie = async (): Promise<Of[]> => {
    try {
        const response = await apiClient.get<Ofs[]>('/ofsForSortieStock');
        return Ofsmapper.mapArrayOf(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des ofs:', error);
        throw error;
    }
}