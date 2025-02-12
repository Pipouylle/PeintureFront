import {createDefaultSysteme, Systeme} from "@/models/types/systeme";

export interface CreerSystemeFormModel {
    systeme: Systeme;
    nbCouche: number;
    selectedGrenaillage: { title: string; value: number } | null;
}

export function createDefaultCreerSystemeFormModel(overrides : Partial<CreerSystemeFormModel> = {}) : CreerSystemeFormModel {
    return {
        systeme: createDefaultSysteme(),
        nbCouche: 1,
        selectedGrenaillage: null,
        ...overrides
    }
}