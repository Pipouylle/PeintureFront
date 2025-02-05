import { Couche } from '@/models/types/couche';
import { Couches } from '@/models/objectsApi/Couches';
import {createDefaultArticle} from "@/models/types/article";
import {createDefaultSysteme} from "@/models/types/systeme";
export default class Couchemapper {
    static mapCouche(obj: Couches): Couche {
        return {
            id: obj.id,
            epaisseurCouche: parseFloat(obj.epaisseurCouche),
            tarifCouche: parseFloat(obj.tarifCouche),
            codeArticleCouche: createDefaultArticle({id: parseInt(obj.ArticleCouche.split("/")[3])}),
            systemeCouche: createDefaultSysteme({id: parseInt(obj.SystemeCouche.split("/")[3])}),
        }
    }

    static mapArrayCouche(dataArray: Couches[]): Couche[] {
        return dataArray.map(this.mapCouche);
    }

    static mapCouches(obj: Couche): Couches {
        return {
            id: obj.id,
            epaisseurCouche: String(obj.epaisseurCouche).replace(/,/g, '.'),
            tarifCouche: String(obj.tarifCouche).replace(/,/g, '.'),
            ArticleCouche: "/api/articles/" + obj.codeArticleCouche.id,
            SystemeCouche: "/api/systemes/" + obj.systemeCouche.id,
        }
    }

    static mapArrayCouches(dataArray: Couche[]): Couches[] {
        return dataArray.map(this.mapCouches);
    }
}