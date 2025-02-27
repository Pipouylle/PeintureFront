import {Semaine} from "@/models/types/semaine";
import {updateSemaine} from "@/services/SemainesService";

export interface ListSemaineModel {
    semaines: Semaine[];
    filter: string;
    modif: (semaine: Semaine) => Promise<boolean>;
}

export function createDefaultListSemaineModel(overrides: Partial<ListSemaineModel> = {}): ListSemaineModel {
    const listSemaine: ListSemaineModel = {
        semaines: [],
        filter: "",
        modif: async (semaine): Promise<boolean> => {
            try {
                await updateSemaine(semaine);
                const index = listSemaine.semaines.findIndex(s => s.id === semaine.id);
                if (index !== -1) {
                    listSemaine.semaines[index] = semaine;
                }
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        ...overrides
    };
    return listSemaine;
}