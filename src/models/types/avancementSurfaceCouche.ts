import {createDefaultSurfaceCouche, SurfaceCouche} from "@/models/types/surfaceCouche";
import {createDefaultOf, Of} from "@/models/types/of";

export interface AvancementSurfaceCouche {
    id: number;
    surfaceCouches: SurfaceCouche;
    avancement: number;
    of: Of;
}

export function createDefaultAvancementSurfaceCouche(overrides: Partial<AvancementSurfaceCouche> = {}): AvancementSurfaceCouche {
    return {
        id: 0,
        surfaceCouches: createDefaultSurfaceCouche(),
        avancement: 0,
        of: createDefaultOf(),
        ...overrides
    };
}