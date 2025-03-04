import {Selected} from "@/models/common/Selected";
import {Commande, createDefaultCommande} from "@/models/types/commande";

export interface CommandeModifModel {
    selectedSysteme: Selected | null;
    selectedAffaire: Selected | null;
    commande: Commande,
}

export function createDefaultCommandeModifModel(override: Partial<CommandeModifModel> = {}): CommandeModifModel {
    return {
        selectedSysteme: null,
        selectedAffaire: null,
        commande: createDefaultCommande(),
        ...override,
    };
}