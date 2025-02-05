import {Of} from "@/models/types/of";
import {OfCalendar} from "@/models/calendar/OfCalendar";
import {createDefaultDemandesCalendar} from "@/models/calendar/DemandesCalendar";
import OF from "@/component/calendar/OF.vue";
import {createDefaultDemande} from "@/models/types/demande";

export class OfCalendarmapper {
    static mapOfCalendar(obj : Of) : OfCalendar {
        return {
            id : obj.id,
            avancementOf : obj.avancementOf,
            dateOf : obj.avancementOf,
            cabineOF : obj.avancementOf,
            jourOf : obj.jourOf,
            semaineOf : obj.semaineOf,
            consommationOf : obj.consommationOf,
            idDemandeOf : createDefaultDemandesCalendar({
                idDemande : obj.idDemandeOf.id
            })
        }
    }

    static mapArrayOfCalendar(dataArray : Of[]) {
        return dataArray.map(this.mapOfCalendar);
    }

    static mapOf(obj: OfCalendar): Of{
        return {
            id : obj.id,
            avancementOf : obj.avancementOf,
            dateOf : obj.avancementOf,
            cabineOf : obj.avancementOf,
            jourOf : obj.jourOf,
            semaineOf : obj.semaineOf,
            consommationOf : obj.consommationOf,
            idDemandeOf : createDefaultDemande({
                id : obj.idDemandeOf.idDemande
            })
        }
    }
}