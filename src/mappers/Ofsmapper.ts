import {Ofs} from "@/models/objectsApi/Ofs";
import {Of} from "@/models/types/of";
import {createDefaultDemande} from "@/models/types/demande";
import {getJourEnumValue, Jour} from "@/enums/Jour";
import {createDefaultSemaine} from "@/models/types/semaine";

export default class Ofsmapper {
    static mapOf(obj: Ofs): Of {
        return {
            id: obj.id,
            cabine: obj.cabineOf,
            avancement: obj.avancementOf,
            semaine: createDefaultSemaine({id: parseInt(obj.semaineOf.split("/")[3])}),
            jour: Jour[parseInt(obj.jourOf.split("/")[3])],
            demande: createDefaultDemande({id: parseInt(obj.demandeOf.split("/")[3])}),
            consommations: []
        }
    }

    static mapArrayOf(dataArray: Ofs[]): Of[] {
        return dataArray.map(this.mapOf);
    }

    static mapOfs(obj: Of): Ofs {
        const jourEnumValue = getJourEnumValue(obj.jour);
        return {
            id: obj.id,
            cabineOf: obj.cabine,
            jourOf: "/api/jours/" + jourEnumValue,
            avancementOf: obj.avancement,
            semaineOf: "/api/semaines/" + obj.semaine.id,
            demandeOf: "/api/demandes/" + obj.demande.id,
        }
    }

    static mapArrayOfs(dataArray: Of[]): Ofs[] {
        return dataArray.map(this.mapOfs);
    }
}