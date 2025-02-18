import {Article} from "@/models/types/article";
import {Commande, createDefaultCommande} from "@/models/types/commande";

export interface CreerCommandeFormModel {
    selectedSysteme: { title: string; value: number } | null;
    selectedAffaire: { title: string; value: number } | null;
    commande: Commande,
}

export function createDefaultCreerCommandeFormModel(override: Partial<CreerCommandeFormModel> = {}): CreerCommandeFormModel {
    return {
        selectedSysteme: null,
        selectedAffaire: null,
        commande: createDefaultCommande(),
        ...override,
    };
}