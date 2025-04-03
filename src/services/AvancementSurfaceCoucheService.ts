import {apiClient, apiClientPatch} from "@/stores/apiClient";
import {AvancementSurfaceCouchemapper} from "@/mappers/AvancementSurfaceCouchemapper";
import {AvancementSurfaceCouches} from "@/models/objectsApi/AvancementSurfaceCouches";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";

export const getAllAvancementSurfaceCouches = async (): Promise<AvancementSurfaceCouche[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/avancement_surface_couches');
        return AvancementSurfaceCouchemapper.mapArrayAvancementSurfaceCouche(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des avancement surface couches:', error);
        throw error;
    }
}

export const creerAvancementSurfaceCouche = async (avancementSurfaceCouche: AvancementSurfaceCouche): Promise<AvancementSurfaceCouche> => {
    try {
        const avancementSurfaceCouches = AvancementSurfaceCouchemapper.mapAvancementSurfaceCouches(avancementSurfaceCouche);
        const response = await apiClient.post<AvancementSurfaceCouches>('/avancement_surface_couches', avancementSurfaceCouches);
        return AvancementSurfaceCouchemapper.mapAvancementSurfaceCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des avancement surface couches:', error);
        throw error;
    }
}

export const updateAvancementSurfaceCouche = async (avancementSurfaceCouche: AvancementSurfaceCouche): Promise<AvancementSurfaceCouche> => {
    try {
        const avancementSurfaceCouches = AvancementSurfaceCouchemapper.mapAvancementSurfaceCouches(avancementSurfaceCouche);
        const response = await apiClientPatch.patch<AvancementSurfaceCouches>(`/modifAvancement/${avancementSurfaceCouche.id}`,
            {avancementAvancement : avancementSurfaceCouches.avancementAvancement}
        );
        return AvancementSurfaceCouchemapper.mapAvancementSurfaceCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des avancement surface couches:', error);
        throw error;
    }
}

export const deleteAvancementSurfaceCouche = async (avancementSurfaceCouche: AvancementSurfaceCouche) => {
    try {
        await apiClient.delete(`/avancement_surface_couches/${avancementSurfaceCouche.id}`);
    } catch (error) {
        console.error('Erreur lors de la récupération des avancement surface couches:', error);
        throw error;
    }
}

export const getAllAvancementSurfaceCoucheBySemaine = async (id: number): Promise<AvancementSurfaceCouche[]> => {
    try {
        const response = await apiClient.get<AvancementSurfaceCouches[]>(`/allAvancementSemaine/${id}`);
        return AvancementSurfaceCouchemapper.mapArrayAvancementSurfaceCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des avancement surface couches:', error);
        throw error;
    }
}

export const getAvancementSurfaceCoucheByOf = async (ofId: number): Promise<AvancementSurfaceCouche[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/avancement_surface_couches?of_avancement=${ofId}`);
        return AvancementSurfaceCouchemapper.mapArrayAvancementSurfaceCouche(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des avancement surface couches:', error);
        throw error;
    }
}

export const updateAvancementAvancementSurfaceCouche = async (avancementSurfaceCouche: AvancementSurfaceCouche) => {
    try {
        const avancementSurfaceCouches = AvancementSurfaceCouchemapper.mapAvancementSurfaceCouches(avancementSurfaceCouche);
        const response = await apiClientPatch.patch<AvancementSurfaceCouches>(`/avancement/avancementSurfaceCouches/${avancementSurfaceCouche.id}`,
            {avancementAvancement : avancementSurfaceCouches.avancementAvancement}
        );
        return AvancementSurfaceCouchemapper.mapAvancementSurfaceCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des avancement surface couches:', error);
        throw error;
    }
}