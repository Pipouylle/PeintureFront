import {Of} from "@/models/types/of";
import {OfCalendar} from "@/models/calendar/OfCalendar";
import {createDefaultDemandesCalendar} from "@/models/calendar/DemandesCalendar";
import {createDefaultDemande} from "@/models/types/demande";

export class OfCalendarmapper {
    static mapOfCalendar(obj : Of) : OfCalendar {
        return {
            id : obj.id,
            avancementOf : obj.avancement,
            cabineOF : obj.cabine,
            jourOf : obj.jour,
            semaineOf : obj.semaine,
            consommationOf : obj.consommations,
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
            consommations : obj.consommationOf,
            demande : createDefaultDemande({
                id : obj.idDemandeOf.idDemande
            }),
            avancements : [],
            order : obj.order
        }
    }
}