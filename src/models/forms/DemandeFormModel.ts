import {Systeme} from "@/models/types/systeme";
import {Affaire} from "@/models/types/affaire";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import {createDefaultDemande, Demande} from "@/models/types/demande";

export interface DemandeFormModel {
    selectedSysteme: { title: string; value: number } | null;
    selectedAffaire: { title: string; value: number } | null;
    dateDemande: string | null,
    demandeDemande: Demande,
}

export function createDefaultDemandeFormModel(override: Partial<DemandeFormModel> = {}): DemandeFormModel {
    return {
        selectedSysteme: null,
        selectedAffaire: null,
        dateDemande: null,
        demandeDemande: createDefaultDemande(),
        ...override
    }
}