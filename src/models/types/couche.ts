import {Article, createDefaultArticle} from "@/models/types/article";

import {createDefaultSysteme, Systeme} from "@/models/types/systeme";

export interface Couche {
    id: number;
    epaisseurCouche: number;
    tarifCouche: number;
    codeArticleCouche: Article;
    systemeCouche: Systeme;
}

export function createDefaultCouche(overrides: Partial<Couche> = {}): Couche {
    return {
        id: 0,
        epaisseurCouche: 0,
        tarifCouche: 0,
        codeArticleCouche: createDefaultArticle(),
        systemeCouche: createDefaultSysteme(),
        ...overrides
    };
}