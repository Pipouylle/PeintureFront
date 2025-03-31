import {NameGrenaillage, TypeGrenaillage} from "@/enums/Grenaillage";
import {Systeme} from "@/models/types/systeme";

export interface Grenaillage {
    id: number;
    nom: NameGrenaillage;
    typeChantier: TypeGrenaillage;
    tarif: number;
    systemes: Systeme[];
}

export function createDefaultGrenaillage(override : Partial<Grenaillage> = {}): Grenaillage {
    return {
        id: 0,
        nom: NameGrenaillage.AUCUN,
        typeChantier: TypeGrenaillage.AUCUN,
        tarif: 0,
        systemes: [],
        ...override
    };
}