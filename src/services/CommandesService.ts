import axios from "axios";

import {Commande} from "@/models/types/commande";
import {Commandes} from "@/models/objectsApi/Commandes";
import Commandemapper from "@/mappers/Commandemapper";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {CommandesAffairesSystemes} from "@/models/objectsApi/CommandesAffairesSystemes";
import {CommandeAffairesSystemesmapper} from "@/mappers/CommandeAffairesSystemesmapper";


const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL de votre API Symfony
    headers: {
        'Content-Type': 'application/ld+json',
    },
});

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
        console.log(response.data.member)
        return CommandeAffairesSystemesmapper.mapArrayCommandeAffairesSystemes(response.data.member);
    } catch (error) {
        console.log('Erreur lors de la récupération de la commande:', error)
        throw error;
    }
}