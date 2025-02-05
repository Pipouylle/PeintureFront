import {Couche, createDefaultCouche} from "@/models/types/couche";
import {createDefaultSurfaceCouche, SurfaceCouche} from "@/models/types/surfaceCouche";

export interface ModifDemandeCoucheModel {
    id: number;
    SurfaceCouche: SurfaceCouche;
    surface: number;
    getValue: () => {
        SurfaceCouche: SurfaceCouche;
        surface: number;
    };
}

export function createDefaultModifDemandeCoucheModel(override: Partial<ModifDemandeCoucheModel>): ModifDemandeCoucheModel {
    return {
        id: 0,
        SurfaceCouche: createDefaultSurfaceCouche({}),
        surface: 0,
        getValue() {
            return {
                SurfaceCouche: this.SurfaceCouche,
                surface: this.surface
            };
        },
        ...override
    }
}