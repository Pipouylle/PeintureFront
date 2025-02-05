import {createDefaultSemaine, Semaine} from "@/models/types/semaine";

export interface CalendarModel {
    cabines: string[];
    jours: string[];
    semaine: Semaine;
}

export function createDefaultCalendarModel(overrides: Partial<CalendarModel> = {}): CalendarModel {
    return {
        cabines: ["complexe", "glycero", "autre"],
        jours: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        semaine: createDefaultSemaine(),
        ...overrides
    }
}