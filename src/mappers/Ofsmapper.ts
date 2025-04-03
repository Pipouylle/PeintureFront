import {Ofs} from "@/models/objectsApi/Ofs";
import {Of} from "@/models/types/of";
import {createDefaultDemande} from "@/models/types/demande";
import {getJourEnumValue, Jour} from "@/enums/Jour";
import {createDefaultSemaine} from "@/models/types/semaine";
import Semainemapper from "@/mappers/Semainemapper";
import Demandesmapper from "@/mappers/Demandesmapper"
import {createDefaultAvancementSurfaceCouche, AvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {AvancementSurfaceCouchemapper} from "@/mappers/AvancementSurfaceCouchemapper";

export default class Ofsmapper {
    static mapOf(obj: Ofs): Of {
        return {
            id: obj?.id ?? 0,
            cabine: obj?.cabineOf ?? "",
            avancement: obj?.avancementOf ?? 0,
            temp: obj?.tempOf ?? "0",
            regieSFP: obj?.regieSFPOf ?? 0,
            regieFP: obj?.regieFPOf ?? 0,
            semaine: obj?.semaineOf ? typeof obj.semaineOf === 'object' ? Semainemapper.mapSemaine(obj.semaineOf) : createDefaultSemaine({id: parseInt(obj.semaineOf.split("/")[3])}) : createDefaultSemaine(),
            jour: obj?.jourOf ? Jour[parseInt(obj.jourOf.split("/")[3] ?? "0")] : Jour.AUTRE,
            demande: obj?.demandeOf ? typeof obj.demandeOf === 'object' ? Demandesmapper.mapDemande(obj.demandeOf) : createDefaultDemande({id: parseInt(obj.demandeOf.split("/")[3])}) : createDefaultDemande(),
            avancements: obj?.avancementSurfaceCouchesOf ? obj.avancementSurfaceCouchesOf.map((av: object | string) => typeof av === 'object' ? AvancementSurfaceCouchemapper.mapAvancementSurfaceCouche(av) : createDefaultAvancementSurfaceCouche({id: parseInt(av.split("/")[3])})).sort((a, b) => a.id - b.id) : [],
            order: obj?.orderOf ?? 0
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
            regieSFPOf: obj.regieSFP,
            regieFPOf: obj.regieFP,
            tempOf: obj.temp,
            semaineOf: "/api/semaines/" + obj.semaine.id,
            demandeOf: "/api/demandes/" + obj.demande.id,
            orderOf: obj.order,
            avancementSurfaceCouchesOf: obj.avancements.map((av: AvancementSurfaceCouche) => "/api/avancement_surface_couches/" + av.id)
        }
    }

    static mapArrayOfs(dataArray: Of[]): Ofs[] {
        return dataArray.map(this.mapOfs);
    }
}