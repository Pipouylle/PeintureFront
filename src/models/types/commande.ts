import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {Demande} from "@/models/types/demande";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";

export interface Commande {
    id: number;
    numeroCommande: string;
    eurekaCommande: string;
    commentaireCommande: string;
    surfaceCommande: number;
    regieSFPCommande: number;
    regieFPCommande: number;
    ficheHcommande: boolean;
    tarifFicheHCommande: number;
    idAffaireCommande: Affaire;
    idSystemeCommande: Systeme;
    demandeCommande: Demande[];
}

export function createDefaultCommande(overrides: Partial<Commande> = {}): Commande {
    return {
        id: 0,
        numeroCommande: "",
        eurekaCommande: "",
        commentaireCommande: "",
        surfaceCommande: 0,
        regieSFPCommande: 0,
        regieFPCommande: 0,
        ficheHcommande: false,
        tarifFicheHCommande: 0,
        idAffaireCommande: createDefaultAffaire(),
        idSystemeCommande: createDefaultSysteme(),
        demandeCommande: [],
        ...overrides
    };
}