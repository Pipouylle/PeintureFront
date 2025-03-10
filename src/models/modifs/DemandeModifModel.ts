import {Demande, createDefaultDemande} from "@/models/types/demande";
import {Selected} from "@/models/common/Selected";
export interface DemandeModifModel {
    demande: Demande;
    selectedAffaire: Selected | null;
    selectedCommande: Selected | null;
    selectedDate: Date | null;
}

export function createDefaultDemandeModif(override: Partial<DemandeModifModel> = {}): DemandeModifModel {
    return {
        demande: createDefaultDemande(),
        selectedAffaire: null,
        selectedCommande: null,
        selectedDate: null,
        ...override,
    };
}