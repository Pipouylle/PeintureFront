import axios from "axios";
import {Demande} from "@/models/types/demande";
import Demandesmapper from "@/mappers/Demandesmapper";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {Demandes} from "@/models/objectsApi/Demandes";
import {Couche} from "@/models/types/couche";
import Couchemapper from "@/mappers/Couchemapper";
import {DemandesCalendar} from "@/models/calendar/DemandesCalendar";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL de votre API Symfony
    headers: {
        'Content-Type': 'application/ld+json',
    },
});

export const getAllDemandes = async (): Promise<Demande[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/demandes')
        return Demandesmapper.mapArrayDemande(response.data.member);
    } catch (error) {
        console.log('Erreur lors de la récupération des demandes:', error)
        throw error;
    }
}

export const creerDemande = async (demande: Demande): Promise<Demande> => {
    try {
        const demandes = Demandesmapper.mapDemandes(demande);
        console.log(demandes)
        const response = await apiClient.post<Demandes>('/demandes', demandes)
        return Demandesmapper.mapDemande(response.data);
    } catch (error) {
        console.log('Erreur lors de la récupération de la demande:', error)
        throw error;
    }
}

export const getAllDemandeCalendar = async (): Promise<DemandesCalendar[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/demandesCalendar')
        return response.data.member;
    } catch (error) {
        console.log('Erreur lors de la récupération des demandes:', error)
        throw error;
    }
}

export const getDemandeCalendarNotEnd = async (): Promise<Demande[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/demandesCalendarNotEnd')
        return Demandesmapper.mapArrayDemande(response.data.member);
    } catch (error) {
        console.log('Erreur lors de la récupération des demandes:', error)
        throw error;
    }
}

export const getCouchesDemande = async (idSysteme: number): Promise <Couche[]> => {
    try {
        const reponse = await apiClient.get<ApiResponseCollection>('/couches?Systemes_couche=/api/systemes/' + idSysteme)
        return Couchemapper.mapArrayCouche(reponse.data.member)
    } catch (error) {
        console.log('Erreur lors de la récupération des couches:', error)
        throw error;
    }
}