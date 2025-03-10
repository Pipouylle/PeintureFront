import {Systeme} from "@/models/types/systeme";
import {Couche, createDefaultCouche} from "@/models/types/couche";

export interface ListSystemeModel {
    systemes: Systeme[];
    selectCouche: Couche;
    filter: string;

}

export function createDefaultListSystemeModel(overrides: Partial<ListSystemeModel> = {}): ListSystemeModel {
    return {
        systemes: [],
        selectCouche: createDefaultCouche(),
        filter: "",
        ...overrides
    };
}