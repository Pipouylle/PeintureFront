import {createDefaultSurfaceCouche, SurfaceCouche} from "@/models/types/surfaceCouche";

export interface ModifDemandeCoucheModel {
    id: number;
    SurfaceCouche: SurfaceCouche;
    surface: number;
}

export function createDefaultModifDemandeCoucheModel(override: Partial<ModifDemandeCoucheModel> = {}): ModifDemandeCoucheModel {
    return {
        id: 0,
        SurfaceCouche: createDefaultSurfaceCouche(),
        surface: 0,
        ...override
    }
}