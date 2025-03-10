import {Affaire, createDefaultAffaire} from "@/models/types/affaire";

export interface ListAffaireModel {
    affaires: Affaire[];
    affairesModif: Affaire;
    filter: string;
}

export function createDefaultListAffaireModel(overrides: Partial<ListAffaireModel> = {}): ListAffaireModel {
    return {
        affaires: [],
        affairesModif: createDefaultAffaire(),
        filter: "",
        ...overrides
    };
}

