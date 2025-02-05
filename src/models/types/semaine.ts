export interface Semaine {
    id: number;
    numeroAnnee: number;
    numeroMois: number;
    numeroSemaine: number;
    dateDebut: string;
    dateFin: string;
}

export function createDefaultSemaine(overrides: Partial<Semaine> = {}): Semaine {
    return {
        id: 0,
        numeroAnnee: 0,
        numeroMois: 0,
        numeroSemaine: 0,
        dateDebut: "",
        dateFin: "",
        ...overrides
    }
}