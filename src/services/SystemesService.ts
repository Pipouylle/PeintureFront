import axios from "axios";
import {Couche} from "@/models/types/couche";
import {Systeme} from "@/models/types/systeme";
import {creerCouche} from "@/services/CouchesService";
import {Systemes} from "@/models/objectsApi/Systemes";
import Systememapper from "@/mappers/Systememapper";
import Couchemapper from "@/mappers/Couchemapper";
import {ApiResponseCollection} from "@/models/ApiResponseCollection";
import {Affaire} from "@/models/types/affaire";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL de votre API Symfony
    headers: {
        'Content-Type': 'application/ld+json',
    },
});

export const getAllSystemes = async (): Promise<Systeme[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>('/systemes');
        return Systememapper.mapArraySysteme(response.data.member);
    } catch (error) {
        console.error('Erreur lors de la récupération des systemes:', error);
        throw error;
    }
};

export const creerSystemeWithCouche = async (systeme: Systeme) : Promise<Systeme> => {
    try {
        const systemes = Systememapper.mapSystemes(systeme);
        console.log(systemes);
        const response = await apiClient.post<Systemes>('/systemes', systemes);
        const systeme1 = Systememapper.mapSysteme(response.data);
        for (let i = 0; i < systeme.coucheSysteme.length; i++) {
            systeme.coucheSysteme[i].systemeCouche = systeme1;
            systeme.coucheSysteme[i] = await creerCouche(systeme.coucheSysteme[i]);
        }
        return systeme1;
    } catch (error) {
        console.error('Erreur lors de la récupération des systemes:', error);
        throw error;
    }
}

