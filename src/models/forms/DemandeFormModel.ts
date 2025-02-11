import {Systeme} from "@/models/types/systeme";
import {Affaire} from "@/models/types/affaire";
import {Commande, createDefaultCommande} from "@/models/types/commande";

export interface DemandeFormModel {
    numeroDemande: string,
    systemes: Systeme[],
    selectedSysteme: { title: string; value: number } | null;
    affaires: Affaire[],
    selectedAffaire: { title: string; value: number } | null;
    dateDemande: string | null,
    commandeDemande: Commande,
    surfaceDemande: number,
    nombrePieceDemande: number
}

export function createDefaultDemandeFormModel(override: Partial<DemandeFormModel> = {}): DemandeFormModel {
    return {
        numeroDemande: '',
        systemes: [],
        selectedSysteme: null,
        affaires: [],
        selectedAffaire: null,
        dateDemande: null,
        commandeDemande: createDefaultCommande(),
        surfaceDemande: 0,
        nombrePieceDemande: 0,
        ...override
    }
}