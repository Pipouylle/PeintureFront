import {Ofs} from "@/models/objectsApi/Ofs";
import {Of} from "@/models/types/of";
import {createDefaultDemande} from "@/models/types/demande";
import {Jour} from "@/enums/Jour";
import {createDefaultSemaine} from "@/models/types/semaine";

export default class Ofsmapper {
    static mapOf(obj: Ofs): Of {
        return {
            id: obj.id,
            cabineOf: obj.cabineOF,
            dateOf: obj.dateOf,
            avancementOf: obj.avancementOf,
            semaineOf: createDefaultSemaine({id: parseInt(obj.jourOf.split("/")[3])}),
            jourOf: Jour[parseInt(obj.jourOf.split("/")[3])],
            idDemandeOf: createDefaultDemande({id: parseInt(obj.demandeOf.split("/")[3])}),
            consommationOf: []
        }
    }

    static mapArrayOf(dataArray: Ofs[]): Of[] {
        return dataArray.map(this.mapOf);
    }

    static mapOfs(obj: Of): Ofs {
        return {
            id: obj.id,
            cabineOF: obj.cabineOf,
            dateOf: obj.dateOf,
            jourOf: "/api/jours/" + obj.jourOf,
            avancementOf: obj.avancementOf,
            semaineOf: "/api/semaines/" + obj.semaineOf.id,
            demandeOf: "/api/demandes/" + obj.idDemandeOf.id,
        }
    }

    static mapArrayOfs(dataArray: Of[]): Ofs[] {
        return dataArray.map(this.mapOfs);
    }
}