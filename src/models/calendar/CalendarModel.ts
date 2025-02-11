import {createDefaultSemaine, Semaine} from "@/models/types/semaine";
import {createDefaultOfCalendar, OfCalendar} from "@/models/calendar/OfCalendar";

export interface CalendarModel {
    cabines: string[];
    jours: string[];
    semaine: Semaine;
    cabine: string;
    dialog:boolean;
    ofSelected: OfCalendar;
}

export function createDefaultCalendarModel(overrides: Partial<CalendarModel> = {}): CalendarModel {
    return {
        cabines: ["cabine1", "cabine2"],
        jours: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"],
        semaine: createDefaultSemaine(),
        dialog: false,
        cabine: "",
        ofSelected: createDefaultOfCalendar(),
        ...overrides
    }
}