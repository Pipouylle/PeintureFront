import {Semaine, createDefaultSemaine} from "@/models/types/semaine"
import {Of} from "@/models/types/of";
import {Commande} from "@/models/types/commande";
import {Affaire} from "@/models/types/affaire";
import {Demande} from "@/models/types/demande";
import {Systeme} from "@/models/types/systeme";
export interface AvancementModel {
    semaine: Semaine;
    jour: string;
    jours: string[];
    date: string;
    listOF: Of[];
    listCommande: Commande[];
    listAffaire: Affaire[];
    listDemande: Demande[];
    listSysteme: Systeme[];
    listPrevious: {demandeId: number, avancement: number, avancementCouche: number[]}[];
    cabines: string[];
    cabine: string;
    temps: string[];
    temp: string;
}

export function createDefaultAvancementModel(overrides: Partial<AvancementModel> = {}): AvancementModel {
    return {
        semaine: createDefaultSemaine(),
        jour: '',
        jours: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
        date: '',
        listOF: [],
        listCommande: [],
        listAffaire: [],
        listDemande: [],
        listSysteme: [],
        listPrevious: [],
        cabines:["cabine 1", "cabine 2"],
        cabine: 'cabine 1',
        temps: ["matin","après-midi","nuit"],
        temp: 'matin',
        ...overrides
    }
}