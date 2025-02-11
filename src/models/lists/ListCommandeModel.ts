import {Commande, createDefaultCommande} from "@/models/types/commande";

export interface ListCommandeModel {
    commandes : Commande[],
    modifCommande: Commande
}

export function createDefaultListCommandeModel(overrides : Partial<ListCommandeModel> = {}): ListCommandeModel {
    return {
        commandes : [],
        modifCommande: createDefaultCommande(),
        ...overrides
    }
}