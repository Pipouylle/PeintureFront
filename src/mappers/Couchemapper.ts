import { Couche } from '@/models/types/couche';
import { Couches } from '@/models/objectsApi/Couches';
import {createDefaultSysteme} from "@/models/types/systeme";
import Systememapper from "@/mappers/Systememapper"
import {createDefaultArticleCouche, ArticleCouche} from "@/models/types/articleCouche"
import ArticleCouchemapper from "@/mappers/ArticleCouchemapper"

export default class Couchemapper {
    static mapCouche(obj: Couches): Couche {
        return {
            id: obj?.id ?? 0,
            nom: obj?.nomCouche ?? "",
            tarif: parseFloat(obj?.tarifCouche ?? "0"),
            epaisseur: parseFloat(obj?.epaisseurCouche ?? "0"),
            systeme: obj?.systemeCouche ? typeof obj.systemeCouche === 'object' ? Systememapper.mapSysteme(obj.systemeCouche) : createDefaultSysteme({id: parseInt(obj.systemeCouche.split("/")[3])}) : createDefaultSysteme(),
            article: obj?.articleCouchesCouche ? obj.articleCouchesCouche.map((ac: string | object) => typeof ac === 'object' ? ArticleCouchemapper.mapArticleCouche(ac) : createDefaultArticleCouche({id: parseInt(ac.split("T")[3])})) : [],
        }
    }

    static mapArrayCouche(dataArray: Couches[]): Couche[] {
        return dataArray.map(this.mapCouche);
    }

    static mapCouches(obj: Couche): Couches {
        return {
            id: obj.id,
            nomCouche: obj.nom,
            tarifCouche: String(obj.tarif).replace(/,/g, '.'),
            epaisseurCouche: String(obj.epaisseur).replace(/,/g, '.'),
            systemeCouche: "/api/systemes/" + obj.systeme.id,
            articleCouchesCouche: obj.article.map((article: ArticleCouche) => "/api/article_couches/" + article.id)
        }
    }

    static mapArrayCouches(dataArray: Couche[]): Couches[] {
        return dataArray.map(this.mapCouches);
    }
}