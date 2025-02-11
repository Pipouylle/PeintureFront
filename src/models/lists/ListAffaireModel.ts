import {Affaire, createDefaultAffaire} from "@/models/types/affaire";

export interface ListAffaireModel {
    affaires: Affaire[];
    affairesModif: Affaire;
}

export function createDefaultListAffaireModel(overrides: Partial<ListAffaireModel> = {}): ListAffaireModel {
    return {
        affaires: [],
        affairesModif: createDefaultAffaire(),
        ...overrides
    }
}