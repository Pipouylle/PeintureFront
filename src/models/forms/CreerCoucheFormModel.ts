import {Couche, createDefaultCouche} from "@/models/types/couche";

export interface CreerCoucheFormModel {
    id: number;
    couche: Couche;

}

export function createDefaultCoucheFormModel(override: Partial<CreerCoucheFormModel>): CreerCoucheFormModel {
    return {
        id: 0,
        couche: createDefaultCouche(),
        ...override,
    };
}
