import {Commande} from "@/models/types/commande";
import {Couche} from "@/models/types/couche";
import {Grenaillage} from "@/models/types/Grenaillage";
import {createDefaultFournisseur, Fournisseur} from "@/models/types/fournisseur";

export interface Systeme {
    id: number;
    nom: string;
    grenaillage: Grenaillage | null;
    refieSFP: number;
    refieFP: number;
    fournisseur: Fournisseur;
    type: string;
    commandes: Commande[];
    couches: Couche[];
}

export function createDefaultSysteme(overrides: Partial<Systeme> = {}): Systeme {
    return {
        id: 0,
        nom: "",
        grenaillage: null,
        refieSFP: 0,
        refieFP: 0,
        fournisseur: createDefaultFournisseur(),
        type: "glycero",
        commandes: [],
        couches: [],
        ...overrides
    };
}