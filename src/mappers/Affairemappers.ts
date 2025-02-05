import {Affaire} from "@/models/types/affaire";
import {Affaires} from "@/models/objectsApi/Affaires";

export default class Affairemappers {
    static mapAffaire(obj: any): Affaire {
        return {
            id: obj.id,
            numeroAffaire: obj.numeroAffaire,
            nomAffaire: obj.nomAffaire,
            commandes: [],
            systemes: []
        }
    }

    static mapArrayAffaire(dataArray: any): Affaire[] {
        return dataArray.map(this.mapAffaire);
    }

    static mapAffaires(obj: any): Affaires {
        return {
            id: obj.id,
            numeroAffaire: obj.numeroAffaire,
            nomAffaire: obj.nomAffaire,
        }
    }
    static mapArrayAffaires(dataArray: any): Affaires[] {
        return dataArray.map(this.mapAffaires);
    }
}
