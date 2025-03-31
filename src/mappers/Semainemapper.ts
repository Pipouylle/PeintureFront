import {Semaines} from "@/models/objectsApi/Semaines";
import {Semaine} from "@/models/types/semaine";
import {Of, createDefaultOf} from "@/models/types/of";
import Ofsmapper from "@/mappers/Ofsmapper";

export default class Semainemapper {
    static mapSemaine(obj: Semaines): Semaine{
        return {
            id: obj?.id ?? 0,
            semaine: obj?.semaine ?? 0,
            annee: obj?.annees ?? 0,
            mois: obj?.mois ?? 0,
            dateDebut: obj?.dateDebutSemaine ?? new Date().toISOString(),
            dateFin: new Date(new Date(obj?.dateDebutSemaine ?? new Date().toISOString()).setDate(new Date(obj?.dateDebutSemaine ?? new Date().toISOString()).getDate() + 6)).toISOString(),
            ofs: obj?.ofsSemaine ? obj.ofsSemaine.map((of: string | object) => typeof of === 'object' ? Ofsmapper.mapOf(of) : createDefaultOf({id: parseInt(of.split("T")[3])})) : [],
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
            ofsSemaine: obj.ofs.map((of: Of) => "/api/o_fs/" + of.id)
        }
    }

    static mapArraySemaines(dataArray: Semaine[]): Semaines[]{
        return dataArray.map(this.mapSemaines);
    }
}