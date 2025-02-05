export enum Jour {
    lundi = 1,
    mardi = 2,
    mercredi = 3,
    jeudi = 4,
    vendredi = 5,
    AUTRE = "Autre",
}

export function getJourEnumValue(day: string): Jour | undefined {
    switch (day.toLowerCase()) {
        case "lundi":
            return Jour.lundi;
        case "mardi":
            return Jour.mardi;
        case "mercredi":
            return Jour.mercredi;
        case "jeudi":
            return Jour.jeudi;
        case "vendredi":
            return Jour.vendredi;
        default:
            return undefined;
    }
}