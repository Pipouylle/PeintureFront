import {Systeme, createDefaultSysteme} from "@/models/types/systeme";
import {Selected} from "@/models/common/Selected";

export interface SystemeModifModel {
    systeme: Systeme;
    nbCouche: number;
    selectGrenaillage: Selected | null;
    selectFournisseur: Selected | null;
}

export function createDefaultSystemeModifModel(overrides : Partial<SystemeModifModel> = {}) : SystemeModifModel {
    return {
        systeme: createDefaultSysteme(),
        nbCouche: 1,
        selectGrenaillage: null,
        selectFournisseur: null,
        ...overrides
    }
}