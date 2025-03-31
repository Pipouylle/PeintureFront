import {apiClient, apiClientPatch} from "@/stores/apiClient";
import {Demande} from "@/models/types/demande";
import Demandesmapper from "@/mappers/Demandesmapper";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import {Demandes} from "@/models/objectsApi/Demandes";
import {Couche} from "@/models/types/couche";
import Couchemapper from "@/mappers/Couchemapper";
import {DemandesCalendar} from "@/models/calendar2_0/DemandesCalendar";
import {Of} from "@/models/types/of";

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
        const response = await apiClientPatch.patch<Demandes>(`/demandes/${demande.id}`, demandes)
        return Demandesmapper.mapDemande(response.data);
    } catch (error) {
        console.log('Erreur lors de la modification de la demande:', error)
        throw error;
    }
}

export const updateEtatDemande = async (demande: Demande): Promise<Demande> => {
    try {
        const demandes = Demandesmapper.mapDemandes(demande);
        const response = await apiClientPatch.patch<Demandes>(`/demandeEtat/${demande.id}`, demandes)
        return Demandesmapper.mapDemande(response.data);
    } catch (error) {
        console.log('Erreur lors de la modification de la demande:', error)
        throw error;
    }
}

export const getPreviousAvancement = async (demandeId: number): Promise<any> => {
    try {
        const response =await apiClient.get<{
            demandeId: number,
            avancement: string
        }>(`/previousAvancement/${demandeId}`);
        return {demandeId: response.data.demandeId, avancement: parseInt(response.data.avancement)};
    } catch (e) {
        throw e;
    }
}

export const getDemandeNotFinish = async (): Promise<Demande[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/demandesNotFinish')
        return Demandesmapper.mapArrayDemande(response.data.member);
    } catch (error) {
        console.log('Erreur lors de la récupération des demandes:', error)
        throw error;
    }
}

export const getAllAvancement = async () => {
    try {
        const response = await apiClient.get<{
            demandeId: number,
            avancement: string
        }[]>('/allAvancements');
        return response.data.map(item => ({
            demandeId: item.demandeId,
            avancement: parseInt(item.avancement)
        }));
    } catch (error) {
        console.log('Erreur lors de la récupération de tous les avancements:', error)
        throw error;
    }
}
