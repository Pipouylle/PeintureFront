import {SurfaceCouches} from "@/models/objectsApi/surfaceCouches";
import {SurfaceCouche} from "@/models/types/surfaceCouche";
import {createDefaultDemande, Demande} from "@/models/types/demande";
import {createDefaultArticleCouche, ArticleCouche} from "@/models/types/articleCouche";
import ArticleCouchemapper from "@/mappers/ArticleCouchemapper";
import DemandeMapper from "@/mappers/Demandesmapper";

export default class SurfaceCouchemapper {
    static mapSurfaceCouche(obj: SurfaceCouches): SurfaceCouche {
        return {
            id: obj?.id ?? 0,
            articleCouche: obj?.articleCoucheSurfaceCouche ? typeof obj.articleCoucheSurfaceCouche === 'object' ? ArticleCouchemapper.mapArticleCouche(obj.articleCoucheSurfaceCouche) : createDefaultArticleCouche({id : parseInt(obj.articleCoucheSurfaceCouche.split("/")[3]),}) : createDefaultArticleCouche(),
            demande: obj?.demandeSurfaceCouche ? typeof obj.demandeSurfaceCouche === 'object' ? DemandeMapper.mapDemande(obj.demandeSurfaceCouche) : createDefaultDemande({id : parseInt(obj.demandeSurfaceCouche.split("/")[3]),}) : createDefaultDemande(),
            surface: parseFloat(obj?.surface ?? "0"),
        }
    }

    static mapArraySurfaceCouche(dataArray: SurfaceCouches[]): SurfaceCouche[]{
        console.log(dataArray);
        return dataArray.map(this.mapSurfaceCouche);
    }

    static mapSurfaceCouches(obj: SurfaceCouche): SurfaceCouches {
        return {
            id: obj.id,
            articleCoucheSurfaceCouche: "/api/article_couches/" + obj.articleCouche.id,
            demandeSurfaceCouche: "/api/demandes/" + obj.demande.id,
            surface: String(obj.surface).replace(/,/g, '.'),
        }
    }

    static mapArraySurfaceCouches(dataArray: SurfaceCouche[]): SurfaceCouches[]{
        return dataArray.map(this.mapSurfaceCouches);
    }
}