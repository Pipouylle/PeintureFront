    import {Couche, createDefaultCouche} from "@/models/types/couche";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import {SurfaceCouche} from "@/models/types/surfaceCouche";
import {Article} from "@/models/types/article";

export interface ArticleCouche {
    id: number;
    couche: Couche;
    tarif: number;
    commande: Commande;
    articles : Article[];
    surfaces: SurfaceCouche[];
}

export function createDefaultArticleCouche(override: Partial<ArticleCouche> = {}): ArticleCouche {
    return {
        id: 0,
        tarif: 0,
        couche: createDefaultCouche(),
        commande: createDefaultCommande(),
        articles: [],
        surfaces: [],
        ...override,
    };
}