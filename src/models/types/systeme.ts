import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {Commande} from "@/models/types/commande";
import {Couche} from "@/models/types/couche";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";

export interface Systeme {
    id: number;
    nomSysteme: string;
    grenaillageSysteme: Grenaillage;
    refieSFPSysteme: number;
    refieFPSysteme: number;
    fournisseurSysteme: string;
    commandeSysteme: Commande[];
    coucheSysteme: Couche[];
}

export function createDefaultSysteme(overrides: Partial<Systeme> = {}): Systeme {
    return {
        id: 0,
        nomSysteme: "",
        grenaillageSysteme: createDefaultGrenaillage({}),
        refieSFPSysteme: 0,
        refieFPSysteme: 0,
        fournisseurSysteme: "",
        commandeSysteme: [],
        coucheSysteme: [],
        ...overrides
    };
}