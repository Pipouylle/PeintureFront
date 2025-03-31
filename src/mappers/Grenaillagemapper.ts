import {Grenaillage} from "@/models/types/Grenaillage";
import {Grenaillages} from "@/models/objectsApi/Grenaillages";
import {NameGrenaillage, TypeGrenaillage} from "@/enums/Grenaillage";
import {Systeme, createDefaultSysteme} from "@/models/types/systeme";
import Systememapper from "@/mappers/Systememapper";

export default class Grenaillagemapper {
    static mapGrenaillage(obj: Grenaillages): Grenaillage {
        return {
            id: obj?.id ?? 0,
            nom: obj?.nomGrenaillage ? NameGrenaillage[obj.nomGrenaillage as keyof typeof NameGrenaillage] : NameGrenaillage.AUCUN,
            typeChantier: obj?.typeChantierGrenaillage ? TypeGrenaillage[obj.typeChantierGrenaillage as keyof typeof TypeGrenaillage] : TypeGrenaillage.AUCUN,
            tarif: parseFloat(obj?.tarifGrenaillage ?? '0'),
            systemes: obj?.systemesGrenaillage ? obj.systemesGrenaillage.map((systeme: string | object) => typeof systeme === 'object' ? Systememapper.mapSysteme(systeme) : createDefaultSysteme({id: parseInt(systeme.split("T")[3])})) : []
        }
    }

    static mapArrayGrenaillage(dataArray: Grenaillages[]): Grenaillage[] {
        return dataArray.map(this.mapGrenaillage);
    }

    static mapGrenaillages(obj: Grenaillage): Grenaillages {
        return {
            id: obj.id,
            nomGrenaillage: Object.entries(NameGrenaillage).find(([key, value]) => value === obj.nom)?.[0] || '',
            typeChantierGrenaillage: Object.entries(TypeGrenaillage).find(([key, value]) => value === obj.typeChantier)?.[0] || '',
            tarifGrenaillage: String(obj.tarif).replace(/,/g, '.'),
            systemesGrenaillage: obj.systemes.map((systeme: Systeme) => "/api/systemes/" + systeme.id)
        }
    }

    static mapArrayGrenaillages(dataArray: Grenaillage[]): Grenaillages[] {
        return dataArray.map(this.mapGrenaillages);
    }
}