import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Couche, createDefaultCouche} from "@/models/types/couche";
import {useListStore} from "@/stores";
import {updateSysteme} from "@/services/SystemesService";
import {updateCouche} from "@/services/CouchesService";

export interface ListSystemeModel {
    systemes: Systeme[];
    selectCouche: Couche;
    filter: string;
    add: (systeme: Systeme) => Promise<boolean>;
    delete: (systeme: Systeme) => void;
    modif: (systeme: Systeme) => Promise<boolean>;
}

export function createDefaultListSystemeModel(overrides: Partial<ListSystemeModel> = {}): ListSystemeModel {
    const ListSystemeModel: ListSystemeModel = {
        systemes: [],
        selectCouche: createDefaultCouche(),
        filter: "",
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
        modif: async (systeme: Systeme): Promise<boolean> => {
            const index = ListSystemeModel.systemes.findIndex(s => s.id === systeme.id);
            if (index !== -1) {
                try {
                    await updateSysteme(systeme);
                    for (const couche of systeme.couches) {
                        await updateCouche(couche);
                    }
                    ListSystemeModel.systemes[index] = systeme;
                    return true;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            }
            return false;
        },
        ...overrides
    }
    return ListSystemeModel;
}