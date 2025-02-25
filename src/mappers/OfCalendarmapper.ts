import {Of} from "@/models/types/of";
import {OfCalendar} from "@/models/calendar2_0/OfCalendar";
import {createDefaultDemandesCalendar} from "@/models/calendar2_0/DemandesCalendar";
import {createDefaultDemande} from "@/models/types/demande";

export class OfCalendarmapper {
    static mapOfCalendar(obj : Of) : OfCalendar {
        return {
            id : obj.id,
            avancementOf : obj.avancement,
            cabineOF : obj.cabine,
            jourOf : obj.jour,
            semaineOf : obj.semaine,
            tempOf : obj.temp,
            regieFPOf: String(obj.regieFP).replace(/,/g, '.'),
            regieSFPOf: String(obj.regieSFP).replace(/,/g, '.'),
            idDemandeOf : createDefaultDemandesCalendar({
                idDemande : obj.demande.id
            }),
            avancements : obj.avancements,
            order : obj.order
        }
    }

    static mapArrayOfCalendar(dataArray : Of[]) {
        return dataArray.map(this.mapOfCalendar);
    }

    static mapOf(obj: OfCalendar): Of{
        return {
            id : obj.id,
            avancement : obj.avancementOf,
            cabine : obj.cabineOF,
            jour : obj.jourOf,
            semaine : obj.semaineOf,
            temp : obj.tempOf,
            regieSFP: parseInt(obj.regieSFPOf),
            regieFP: parseInt(obj.regieFPOf),
            demande : createDefaultDemande({
                id : obj.idDemandeOf.idDemande
            }),
            avancements : [],
            order : obj.order
        }
    }
}