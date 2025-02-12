import {Semaines} from "@/models/objectsApi/Semaines";
import {Semaine} from "@/models/types/semaine";

export class Semainemapper {
    static mapSemaine(obj: Semaines): Semaine{
        return {
            id: obj.id,
            semaine: obj.semaine,
            annee: obj.annees,
            mois: obj.mois,
            dateDebut: obj.dateDebutSemaine,
            dateFin: new Date(new Date(obj.dateDebutSemaine).setDate(new Date(obj.dateDebutSemaine).getDate() + 6)).toISOString(),
        }
    }

    static mapArraySemaine(dataArray: Semaines[]): Semaine[]{
        return dataArray.map(this.mapSemaine);
    }

    static mapSemaines(obj: Semaine): Semaines{
        return {
            id: obj.id,
            semaine: obj.semaine,
            annees: obj.annee,
            mois: obj.mois,
            dateDebutSemaine: obj.dateDebut,
        }
    }

    static mapArraySemaines(dataArray: Semaine[]): Semaines[]{
        return dataArray.map(this.mapSemaines);
    }
}