import {Couche, createDefaultCouche} from "@/models/types/couche";
import {createDefaultDemande, Demande} from "@/models/types/demande";

export interface SurfaceCouche {
    "id": number,
    "coucheSurfaceCouche": Couche,
    "demandeSurfaceCouche": Demande,
    "surface": number,
}

export function createDefaultSurfaceCouche(overrides : Partial<SurfaceCouche> = {}): SurfaceCouche {
    return {
        "id": 0,
        "coucheSurfaceCouche": createDefaultCouche(),
        "demandeSurfaceCouche": createDefaultDemande(),
        "surface": 0,
        ...overrides
    }
}