import {apiClient} from "@/stores/apiClient";
import {SurfaceCouche} from "@/models/types/surfaceCouche";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {SurfaceCouchemapper} from "@/mappers/SurfaceCouchemapper";
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
        console.log(surfaceCouches);
        const response = await apiClient.post<SurfaceCouches>('/surface_couches', surfaceCouches);
        return SurfaceCouchemapper.mapSurfaceCouche(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des surfaceCouches:', error);
        throw error;
    }
}