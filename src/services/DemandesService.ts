import {apiClient} from "@/stores/apiClient";
import {Demande} from "@/models/types/demande";
import Demandesmapper from "@/mappers/Demandesmapper";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import {Demandes} from "@/models/objectsApi/Demandes";
import {Couche} from "@/models/types/couche";
import Couchemapper from "@/mappers/Couchemapper";
import {DemandesCalendar} from "@/models/calendar2_0/DemandesCalendar";

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

export const getCouchesDemande = async (idSysteme: number): Promise<Couche[]> => {
    try {
        const reponse = await apiClient.get<ApiResponseCollection>('/couches?Systemes_couche=/api/systemes/' + idSysteme)
        return Couchemapper.mapArrayCouche(reponse.data.member)
    } catch (error) {
        console.log('Erreur lors de la récupération des couches:', error)
        throw error;
    }
}

export const deleteDemande = async (demande: Demande) => {
    try {
        await apiClient.delete(`/demandes/${demande.id}`)
    } catch (error) {
        console.log('Erreur lors de la suppression de la demande:', error)
        throw error;
    }
}

export const updateDemande = async (demande: Demande): Promise<Demande> => {
    try {
        const demandes = Demandesmapper.mapDemandes(demande);
        const response = await apiClient.patch<Demandes>(`/demandes/${demande.id}`, demandes)
        return Demandesmapper.mapDemande(response.data);
    } catch (error) {
        console.log('Erreur lors de la modification de la demande:', error)
        throw error;
    }
}

export const updateEtatDemande = async (demande: Demande): Promise<Demande> => {
    try {
        const demandes = Demandesmapper.mapDemandes(demande);
        const response = await apiClient.patch<Demandes>(`/demandesEtat/${demande.id}`, demandes)
        return Demandesmapper.mapDemande(response.data);
    } catch (error) {
        console.log('Erreur lors de la modification de la demande:', error)
        throw error;
    }
}
