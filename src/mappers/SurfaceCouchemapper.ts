import {SurfaceCouches} from "@/models/objectsApi/surfaceCouches";
import {SurfaceCouche} from "@/models/types/surfaceCouche";
import {createDefaultDemande} from "@/models/types/demande";
import {createDefaultArticleCouche} from "@/models/types/articleCouche";

export class SurfaceCouchemapper {
    static mapSurfaceCouche(obj: SurfaceCouches): SurfaceCouche {
        return {
            id: obj.id,
            articleCouche: createDefaultArticleCouche({id : parseInt(obj.articleCoucheSurfaceCouche.split("/")[3]),}),
            demande: createDefaultDemande({id : parseInt(obj.demandeSurfaceCouche.split("/")[3]),}),
            surface: parseFloat(obj.surface),
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