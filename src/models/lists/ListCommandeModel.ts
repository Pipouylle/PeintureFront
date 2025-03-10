import {Commande, createDefaultCommande} from "@/models/types/commande";

export interface ListCommandeModel {
    commandes : Commande[],
    modifCommande: Commande,
    filter: string,
}

export function createDefaultListCommandeModel(overrides : Partial<ListCommandeModel> = {}): ListCommandeModel {
    return {
        commandes: [],
        filter: "",
        modifCommande: createDefaultCommande(),
        ...overrides
    };
}