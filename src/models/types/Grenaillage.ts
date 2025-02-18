import {NameGrenaillage, TypeGrenaillage} from "@/enums/Grenaillage";

export interface Grenaillage {
    id: number;
    nom: NameGrenaillage;
    typeChantier: TypeGrenaillage;
    tarif: number;
}

export function createDefaultGrenaillage(override : Partial<Grenaillage> = {}): Grenaillage {
    return {
        id: 0,
        nom: NameGrenaillage.AUCUN,
        typeChantier: TypeGrenaillage.AUCUN,
        tarif: 0,
        ...override
    };
}