import {SurfaceCouches} from "@/models/objectsApi/surfaceCouches";
import {SurfaceCouche} from "@/models/types/surfaceCouche";
import {createDefaultCouche} from "@/models/types/couche";
import {createDefaultDemande} from "@/models/types/demande";

export class SurfaceCouchemapper {
    static mapSurfaceCouche(obj: SurfaceCouches): SurfaceCouche {
        return {
            id: obj.id,
            coucheSurfaceCouche: createDefaultCouche({id : parseInt(obj.coucheSurfaceCouche.split("/")[3]),}),
            demandeSurfaceCouche: createDefaultDemande({id : parseInt(obj.demandeSurfaceCouche.split("/")[3]),}),
            surface: parseFloat(obj.surface),
        }
    }

    static mapArraySurfaceCouche(dataArray: SurfaceCouches[]): SurfaceCouche[]{
        return dataArray.map(this.mapSurfaceCouche);
    }

    static mapSurfaceCouches(obj: SurfaceCouche): SurfaceCouches {
        return {
            id: obj.id,
            coucheSurfaceCouche: "/api/couches/" + obj.coucheSurfaceCouche.id,
            demandeSurfaceCouche: "/api/demandes/" + obj.demandeSurfaceCouche.id,
            surface: String(obj.surface).replace(/,/g, '.'),
        }
    }

    static mapArraySurfaceCouches(dataArray: SurfaceCouche[]): SurfaceCouches[]{
        return dataArray.map(this.mapSurfaceCouches);
    }
}