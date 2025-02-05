import {Semaines} from "@/models/objectsApi/Semaines";
import {Semaine} from "@/models/types/semaine";

export class Semainemapper {
    static mapSemaine(obj: Semaines): Semaine{
        return {
            id: obj.id,
            numeroSemaine: obj.semaine,
            numeroAnnee: obj.annees,
            numeroMois: obj.mois,
            dateDebut: obj.dateDebutSemaine,
            dateFin: new Date(new Date(obj.dateDebutSemaine).getDate() + 5).toISOString(),
        }
    }

    static mapArraySemaine(dataArray: Semaines[]): Semaine[]{
        return dataArray.map(this.mapSemaine);
    }

    static mapSemaines(obj: Semaine): Semaines{
        return {
            id: obj.id,
            semaine: obj.numeroSemaine,
            annees: obj.numeroAnnee,
            mois: obj.numeroMois,
            dateDebutSemaine: obj.dateDebut,
        }
    }

    static mapArraySemaines(dataArray: Semaine[]): Semaines[]{
        return dataArray.map(this.mapSemaines);
    }
}