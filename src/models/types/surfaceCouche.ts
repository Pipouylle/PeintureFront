import {createDefaultDemande, Demande} from "@/models/types/demande";
import {ArticleCouche, createDefaultArticleCouche} from "@/models/types/articleCouche";

export interface SurfaceCouche {
    "id": number,
    "articleCouche": ArticleCouche,
    "demande": Demande,
    "surface": number,
}

export function createDefaultSurfaceCouche(overrides : Partial<SurfaceCouche> = {}): SurfaceCouche {
    return {
        "id": 0,
        "articleCouche": createDefaultArticleCouche(),
        "demande": createDefaultDemande(),
        "surface": 0,
        ...overrides
    }
}