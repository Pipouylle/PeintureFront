import {AvancementSurfaceCouches} from "@/models/objectsApi/AvancementSurfaceCouches";
import {AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {createDefaultSurfaceCouche} from "@/models/types/surfaceCouche";
import {createDefaultOf} from "@/models/types/of";

export class AvancementSurfaceCouchemapper {
    static mapAvancementSurfaceCouche(obj: AvancementSurfaceCouches): AvancementSurfaceCouche {
        return {
            id: obj.id,
            surfaceCouches: createDefaultSurfaceCouche({id: parseInt(obj.surfaceCouchesAvancement.split("/")[3])}),
            avancement: obj.avancementAvancement,
            of: createDefaultOf({id: parseInt(obj.ofAvancement.split("/")[3])})
        }
    }

    static mapArrayAvancementSurfaceCouche(dataArray: AvancementSurfaceCouches[]): AvancementSurfaceCouche[] {
        return dataArray.map(this.mapAvancementSurfaceCouche);
    }

    static mapAvancementSurfaceCouches(obj: AvancementSurfaceCouche): AvancementSurfaceCouches {
        return {
            id: obj.id,
            surfaceCouchesAvancement: '/api/surface_couches/' + obj.surfaceCouches.id,
            avancementAvancement: obj.avancement,
            ofAvancement: '/api/o_fs/' + obj.of.id
        }
    }

    static mapArrayAvancementSurfaceCouches(dataArray: AvancementSurfaceCouche[]): AvancementSurfaceCouches[] {
        return dataArray.map(this.mapAvancementSurfaceCouches);
    }
}