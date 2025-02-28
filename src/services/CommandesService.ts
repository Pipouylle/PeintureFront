import {Commande} from "@/models/types/commande";
import {Commandes} from "@/models/objectsApi/Commandes";
import Commandemapper from "@/mappers/Commandemapper";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import {CommandesAffairesSystemes} from "@/models/objectsApi/CommandesAffairesSystemes";
import {CommandeAffairesSystemesmapper} from "@/mappers/CommandeAffairesSystemesmapper";
import {Affaire} from "@/models/types/affaire";
import {Systeme} from "@/models/types/systeme";
import {apiClient, apiClientPatch} from "@/stores/apiClient";





export const getAllCommandes = async (): Promise<Commande[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/commandes')
        return Commandemapper.mapArrayCommande(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        throw error;
    }
}
export const creerCommmande = async (commande : Commande): Promise<Commande> => {
    try {
        const commandes = Commandemapper.mapCommandes(commande);
        const response = await apiClient.post<Commandes>('/commandes', commandes)
        return Commandemapper.mapCommande(response.data);
    } catch (error) {
        console.log('Erreur lors de la récupération de la commande:', error)
        throw error;
    }
}

export const getCommandeAffairesystemes = async (): Promise<CommandesAffairesSystemes[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/commandesAffaires')
        return CommandeAffairesSystemesmapper.mapArrayCommandeAffairesSystemes(response.data.member);
    } catch (error) {
        console.log('Erreur lors de la récupération de la commande:', error)
        throw error;
    }
}

export const getCommandeByAffaireAndSysteme = async (affaire: Affaire, systeme: Systeme): Promise<Commande> => {
    try{
        const response = await apiClient.get<ApiResponseCollection>(`/commandes?affaire_commande=/api/affaires/${affaire.id}&systeme_commande=/api/systemes/${systeme.id}`)
        console.log(response.data.member)
        return Commandemapper.mapArrayCommande(response.data.member)[0];
    } catch (e) {
        throw e;
    }
}

export const deleteCommande = async (commande: Commande) => {
    try {
        await apiClient.delete(`/commandes/${commande.id}`);
    } catch (error) {
        console.error('Erreur lors de la suppression de la commande:', error);
        throw error;
    }
}

export const updateCommande = async (commande : Commande): Promise<Commande> => {
    try {
        const commandes = Commandemapper.mapCommandes(commande);
        console.log(commandes);
        const reponse = await apiClientPatch.patch('/commandes/'+commandes.id, commandes);
        return Commandemapper.mapCommande(reponse.data);
    } catch (error) {
        console.error('Erreur lors de la modif du commande:', error);
        throw error;
    }
}