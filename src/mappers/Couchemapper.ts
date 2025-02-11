import { Couche } from '@/models/types/couche';
import { Couches } from '@/models/objectsApi/Couches';
import {createDefaultSysteme} from "@/models/types/systeme";

export default class Couchemapper {
    static mapCouche(obj: Couches): Couche {
        return {
            id: obj.id,
            nom: obj.nomCouche,
            tarif: parseFloat(obj.tarifCouche),
            epaisseur: parseFloat(obj.epaisseurCouche),
            systeme: createDefaultSysteme({id: parseInt(obj.systemeCouche.split("/")[3])}),
            article: [],
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
        }
    }

    static mapArrayCouches(dataArray: Couche[]): Couches[] {
        return dataArray.map(this.mapCouches);
    }
}