import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Selected} from "@/models/common/Selected";

export interface systemeFormModel {
    systeme: Systeme;
    nbCouche: number;
    selectGrenaillage: Selected | null;
    selectFournisseur: Selected | null;
}

export function createDefaultSystemeFormModel(overrides : Partial<systemeFormModel> = {}) : systemeFormModel {
    return {
        systeme: createDefaultSysteme(),
        nbCouche: 1,
        selectGrenaillage: null,
        selectFournisseur: null,
        ...overrides
    }
}