import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Selected} from "@/models/common/Selected";

export interface CreerSystemeFormModel {
    systeme: Systeme;
    nbCouche: number;
    selectGrenaillage: Selected | null;
    selectFournisseur: Selected | null;
}

export function createDefaultCreerSystemeFormModel(overrides : Partial<CreerSystemeFormModel> = {}) : CreerSystemeFormModel {
    return {
        systeme: createDefaultSysteme(),
        nbCouche: 1,
        selectGrenaillage: null,
        selectFournisseur: null,
        ...overrides
    }
}