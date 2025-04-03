import {apiClient, apiClientPatch} from "@/stores/apiClient";
import {SurfaceCouche} from "@/models/types/surfaceCouche";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import SurfaceCouchemapper from "@/mappers/SurfaceCouchemapper";
import {SurfaceCouches} from "@/models/objectsApi/surfaceCouches";

export const getAllSurfaceCouches = async (): Promise<SurfaceCouche[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/surface_couches');
        return SurfaceCouchemapper.mapArraySurfaceCouche(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des surfaceCouches:', error);
        throw error;
    }
}

export const creerSurfaceCouche = async (surfaceCouche: SurfaceCouche) : Promise<SurfaceCouche> => {
    try {
        const surfaceCouches = SurfaceCouchemapper.mapSurfaceCouches(surfaceCouche);
        const response = await apiClient.post<SurfaceCouches>('/surface_couches', surfaceCouches);
        return SurfaceCouchemapper.mapSurfaceCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des surfaceCouches:', error);
        throw error;
    }
}

export const deleteSurfaceCouche = async (surfaceCouche: SurfaceCouche) => {
    try {
        await apiClient.delete(`/surface_couches/${surfaceCouche.id}`);
    } catch (error) {
        console.error('Erreur lors de la récupération des surfaceCouches:', error);
        throw error;
    }
}

export const getSurfaceCoucheByDemande = async (id: number): Promise<SurfaceCouche[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/surface_couches?demande_surfaceCouche=/api/demandes/${id}`);
        return SurfaceCouchemapper.mapArraySurfaceCouche(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des surfaceCouches:', error);
        throw error;
    }
}

export const updateSurfaceCouche = async (surfaceCouche: SurfaceCouche): Promise<SurfaceCouche> => {
    try {
        const surfaceCouches = SurfaceCouchemapper.mapSurfaceCouches(surfaceCouche);
        console.log('surfaceCouches :', surfaceCouches);
        const response = await apiClientPatch.patch<SurfaceCouches>(`/surface_couches/${surfaceCouche.id}`, surfaceCouches);
        return SurfaceCouchemapper.mapSurfaceCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des surfaceCouches:', error);
        throw error;
    }
}

export const getSurfaceCoucheById = async (id: number): Promise<SurfaceCouche> => {
    try {
        const response = await apiClient.get<SurfaceCouches>(`/surface_couches/${id}`);
        return SurfaceCouchemapper.mapSurfaceCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des surfaceCouches:', error);
        throw error;
    }
}