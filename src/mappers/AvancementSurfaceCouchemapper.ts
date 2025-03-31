import {AvancementSurfaceCouches} from "@/models/objectsApi/AvancementSurfaceCouches";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {createDefaultSurfaceCouche} from "@/models/types/surfaceCouche";
import {createDefaultOf} from "@/models/types/of";
import Ofsmapper from "@/mappers/Ofsmapper";
import SurfaceCouchemapper from "@/mappers/SurfaceCouchemapper";

export class AvancementSurfaceCouchemapper {
    static mapAvancementSurfaceCouche(obj: AvancementSurfaceCouches): AvancementSurfaceCouche {
        return {
            id: obj?.id ?? 0,
            avancement: obj?.avancementAvancement ?? 0,
            surfaceCouches: obj?.surfaceCouchesAvancement ? typeof obj.surfaceCouchesAvancement == 'object' ? SurfaceCouchemapper.mapSurfaceCouche(obj.surfaceCouchesAvancement) : createDefaultSurfaceCouche({id: parseInt(obj.surfaceCouchesAvancement.split("/")[3])}) : createDefaultSurfaceCouche(),
            of: obj?.ofAvancement ? typeof obj.ofAvancement === 'object' ? Ofsmapper.mapOf(obj.ofAvancement) : createDefaultOf({id: parseInt(obj.ofAvancement.split("/")[3])}) : createDefaultOf(),
        }
    }

    static mapArrayAvancementSurfaceCouche(dataArray: AvancementSurfaceCouches[]): AvancementSurfaceCouche[] {
        return dataArray.map(this.mapAvancementSurfaceCouche);
    }

    static mapAvancementSurfaceCouches(obj: AvancementSurfaceCouche): AvancementSurfaceCouches {
        return {
            id: obj.id,
            avancementAvancement: obj.avancement,
            surfaceCouchesAvancement: '/api/surface_couches/' + obj.surfaceCouches.id,
            ofAvancement: '/api/o_fs/' + obj.of.id
        }
    }

    static mapArrayAvancementSurfaceCouches(dataArray: AvancementSurfaceCouche[]): AvancementSurfaceCouches[] {
        return dataArray.map(this.mapAvancementSurfaceCouches);
    }
}