import {Grenaillage} from "@/models/types/Grenaillage";
import {Grenaillages} from "@/models/objectsApi/Grenaillages";
import {NameGrenaillage, TypeGrenaillage} from "@/enums/Grenaillage";

export class Grenaillagemapper {
    static mapGrenaillage(data: Grenaillages): Grenaillage {
        return {
            id: data.id,
            nom: NameGrenaillage[data.nomGrenaillage as keyof typeof NameGrenaillage],
            typeChantier: TypeGrenaillage[data.typeChantierGrenaillage as keyof typeof TypeGrenaillage],
            tarif: parseFloat(data.tarifGrenaillage),
        }
    }

    static mapArrayGrenaillage(dataArray: Grenaillages[]): Grenaillage[] {
        return dataArray.map(this.mapGrenaillage);
    }

    static mapGrenaillages(data: Grenaillage): Grenaillages {
        return {
            id: data.id,
            nomGrenaillage: data.nom,
            typeChantierGrenaillage: data.typeChantier,
            tarifGrenaillage: String(data.tarif).replace(/,/g, '.'),
        }
    }

    static mapArrayGrenaillages(dataArray: Grenaillage[]): Grenaillages[] {
        return dataArray.map(this.mapGrenaillages);
    }
}