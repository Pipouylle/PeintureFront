import {Systeme} from "@/models/types/systeme";
import {Affaire} from "@/models/types/affaire";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import {createDefaultDemande, Demande} from "@/models/types/demande";
import {Selected} from "@/models/common/Selected";

export interface DemandeFormModel {
    selectedAffaire: Selected | null;
    selectedCommande: Selected | null;
    dateDemande: string | null,
    demande: Demande,
}

export function createDefaultDemandeFormModel(override: Partial<DemandeFormModel> = {}): DemandeFormModel {
    return {
        selectedAffaire: null,
        selectedCommande: null,
        dateDemande: null,
        demande: createDefaultDemande(),
        ...override
    }
}