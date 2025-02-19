import axios from "axios";
import {Systeme} from "@/models/types/systeme";
import {creerCouche} from "@/services/CouchesService";
import {Systemes} from "@/models/objectsApi/Systemes";
import Systememapper from "@/mappers/Systememapper";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {apiClient, apiClientPatch} from "@/stores/apiClient";


export const getAllSystemes = async (): Promise<Systeme[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/systemes');
        return Systememapper.mapArraySysteme(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des systemes:', error);
        throw error;
    }
};

export const creerSysteme = async (systeme: Systeme) : Promise<Systeme> => {
    try {
        console.log(systeme);
        const systemes = Systememapper.mapSystemes(systeme);
        console.log(systemes);
        const response = await apiClient.post<Systemes>('/systemes', systemes);
        console.log(response.data);
        return Systememapper.mapSysteme(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des systemes:', error);
        throw error;
    }
}

export const creerSystemeWithCouche = async (systeme: Systeme) : Promise<Systeme> => {
    try {
        const systemes = Systememapper.mapSystemes(systeme);
        const response = await apiClient.post<Systemes>('/systemes', systemes);
        const systeme1 = Systememapper.mapSysteme(response.data);
        for (let i = 0; i < systeme.couches.length; i++) {
            systeme.couches[i].systeme = systeme1;
            systeme.couches[i] = await creerCouche(systeme.couches[i]);
        }
        return systeme1;
    } catch (error) {
        console.error('Erreur lors de la récupération des systemes:', error);
        throw error;
    }
}

export const deleteSysteme = async (systeme : Systeme)=> {
    try {
        await apiClient.delete(`/systemes/${systeme.id}`);
    } catch (error) {
        console.error('Erreur lors de la récupération des systemes:', error);
        throw error;
    }
}

export const updateSysteme = async (systeme : Systeme): Promise<Systeme> => {
    try {
        const systemes = Systememapper.mapSystemes(systeme);
        const response = await apiClientPatch.patch<Systemes>(`/systemes/${systeme.id}`, systemes);
        return Systememapper.mapSysteme(response.data);
    } catch (error) {
        console.error('Erreur lors de l\'update des systemes:', error);
        throw error;
    }
}