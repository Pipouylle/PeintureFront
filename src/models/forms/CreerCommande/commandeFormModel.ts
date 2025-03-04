import {Article} from "@/models/types/article";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import {Selected} from "@/models/common/Selected";

export interface CommandeFormModel {
    selectedSysteme: Selected | null;
    selectedAffaire: Selected | null;
    commande: Commande,
}

export function createDefaultCommandeFormModel(override: Partial<CommandeFormModel> = {}): CommandeFormModel {
    return {
        selectedSysteme: null,
        selectedAffaire: null,
        commande: createDefaultCommande(),
        ...override,
    };
}