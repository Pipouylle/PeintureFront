import {Fournisseur} from "@/models/types/fournisseur";
import {apiClient, apiClientPatch} from "@/stores/apiClient";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import FournisseurMapper from "@/mappers/FournisseurMapper";

export const getAllFournisseurs = async (): Promise<Fournisseur[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>("/fournisseurs");
        return FournisseurMapper.mapArraysFournisseur(response.data.member);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const creerFournisseur = async (fournisseur: Fournisseur): Promise<Fournisseur> => {
    try {
        const fournisseurs = FournisseurMapper.mapFournisseurs(fournisseur);
        const response = await apiClient.post("/fournisseurs", fournisseurs);
        return FournisseurMapper.mapFournisseur(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateFournisseur = async (fournisseur: Fournisseur): Promise<Fournisseur> => {
    try {
        const fournisseurs = FournisseurMapper.mapFournisseurs(fournisseur);
        const response = await apiClientPatch.patch(`/fournisseurs/${fournisseur.id}`, fournisseurs);
        return FournisseurMapper.mapFournisseur(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteFournisseur = async (fournisseur: Fournisseur) => {
    try {
        await apiClient.delete(`/fournisseurs/${fournisseur.id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}