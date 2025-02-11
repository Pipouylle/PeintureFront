export interface Semaine {
    id: number;
    annee: number;
    mois: number;
    semaine: number;
    dateDebut: string;
    dateFin: string;
}

export function createDefaultSemaine(overrides: Partial<Semaine> = {}): Semaine {
    return {
        id: 0,
        annee: 0,
        mois: 0,
        semaine: 0,
        dateDebut: "",
        dateFin: "",
        ...overrides
    }
}