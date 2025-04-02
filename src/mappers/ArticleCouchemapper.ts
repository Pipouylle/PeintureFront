import {ArticleCouches} from "@/models/objectsApi/ArticleCouches";
import {ArticleCouche} from "@/models/types/articleCouche";
import {createDefaultCouche} from "@/models/types/couche";
import {createDefaultCommande} from "@/models/types/commande";
import Articlemapper from "@/mappers/Articlemapper";
import Couchemapper from "@/mappers/Couchemapper";
import Commandemapper from "@/mappers/Commandemapper";
import {createDefaultArticle} from "@/models/types/article";
import SurfaceCouchemapper from "@/mappers/SurfaceCouchemapper";
import {createDefaultSurfaceCouche, SurfaceCouche} from "@/models/types/surfaceCouche";
import {Article} from "@/models/types/article";

export default class ArticleCouchemapper {
    static mapArticleCouche(obj: ArticleCouches): ArticleCouche {
        return {
            id: obj?.id ?? 0,
            tarif: parseFloat(obj?.tarifArticleCouche ?? "0"),
            couche: obj?.coucheArticleCouche ? typeof obj.coucheArticleCouche === 'object' ? Couchemapper.mapCouche(obj.coucheArticleCouche) : createDefaultCouche({id: parseInt(obj.coucheArticleCouche.split("/")[3])}) : createDefaultCouche(),
            commande: obj?.commandeArticleCouche ? typeof obj.commandeArticleCouche === 'object' ? Commandemapper.mapCommande(obj.commandeArticleCouche) : createDefaultCommande({id: parseInt(obj.commandeArticleCouche.split("/")[3])}) : createDefaultCommande(),
            articles: obj?.articlesArticleCouche ? Object.values(obj.articlesArticleCouche).map((article: string | object) => typeof article === 'object' ? Articlemapper.mapArticle(article) : createDefaultArticle({id: parseInt(article.split("T")[3])})) : [],
            surfaces: obj?.surfaceCouchesArticleCouche ? obj.surfaceCouchesArticleCouche.map((sc: string | object) => typeof sc === 'object' ? SurfaceCouchemapper.mapSurfaceCouche(sc) : createDefaultSurfaceCouche({id: parseInt(sc.split("/")[3])})) : [],
        }
    }

    static mapArrayArticleCouche(dataArray: ArticleCouches[]): ArticleCouche[] {
        return dataArray.map(this.mapArticleCouche);
    }

    static mapArticleCouches(obj: ArticleCouche): ArticleCouches {
        return {
            id: obj.id,
            tarifArticleCouche: String(obj.tarif).replace(/,/g, '.'),
            coucheArticleCouche: "/api/couches/" + obj.couche.id,
            commandeArticleCouche: "/api/commandes/" + obj.commande.id,
            articlesArticleCouche: obj.articles.map((article: Article) => "/api/articles/" + article.id),
            surfaceCouchesArticleCouche: obj.surfaces.map((sc: SurfaceCouche) => "/api/surface_couches/" + sc.id),
        }
    }

    static mapArrayArticleCouches(dataArray: ArticleCouche[]): ArticleCouches[] {
        return dataArray.map(this.mapArticleCouches);
    }
}