import {createDefaultDemande, Demande} from "@/models/types/demande";

export interface ListDemandeModel{
    demandes: Demande[];
    demandesModif: Demande;
    filter: string;
}

export function createDefaultListDemandeModel(overrides: Partial<ListDemandeModel> = {}): ListDemandeModel {
    return {
        demandes: [],
        filter: "",
        demandesModif: createDefaultDemande(),
        ...overrides
    };
}