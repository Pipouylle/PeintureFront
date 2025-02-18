import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Couche, createDefaultCouche} from "@/models/types/couche";
import {useListStore} from "@/stores";

export interface ListSystemeModel {
    systemes: Systeme[];
    selectCouche: Couche;
    filter: string;
    systemesModif: Systeme;
    add: (systeme: Systeme) => Promise<boolean>;
    delete: (systeme: Systeme) => void;
}

export function createDefaultListSystemeModel(overrides: Partial<ListSystemeModel> = {}): ListSystemeModel {
    const ListSystemeModel: ListSystemeModel = {
        systemes: [],
        selectCouche: createDefaultCouche(),
        filter: "",
        systemesModif: createDefaultSysteme(),
        add: async (systeme: Systeme): Promise<boolean> => {
            try {
                //TODO: a mettre les couches et a creer le systeme
                ListSystemeModel.systemes.push(systeme);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        delete: async (systeme: Systeme) => {
            const index = ListSystemeModel.systemes.findIndex(s => s.id === systeme.id);
            if (index !== -1) {
                await useListStore().ListCommande.deleteBySysteme(systeme);
                ListSystemeModel.systemes.splice(index, 1);
            }
        },
        ...overrides
    }
    return ListSystemeModel;
}