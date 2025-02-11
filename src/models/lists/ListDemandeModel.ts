import {createDefaultDemande, Demande} from "@/models/types/demande";

export interface ListDemandeModel{
    demandes: Demande[];
    demandesModif: Demande;
}

export function createDefaultListDemandeModel(overrides: Partial<ListDemandeModel> = {}): ListDemandeModel {
    return {
        demandes: [],
        demandesModif: createDefaultDemande(),
        ...overrides
    }
}