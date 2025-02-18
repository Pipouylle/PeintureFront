import {Grenaillage} from "@/models/types/Grenaillage";
import {updateGrenaillage} from "@/services/GrenaillagesService";

export interface ListGrenaillageModel {
    grenaillages : Grenaillage[];
    modif: (grenaillage : Grenaillage) => Promise<boolean>;
}

export function createDefaultListGrenaillageModel(overrides: Partial<ListGrenaillageModel> = {}): ListGrenaillageModel {
    return {
        grenaillages: [],
        modif: async (grenaillage): Promise<boolean> => {
            try {
                const response = await updateGrenaillage(grenaillage);
                if (response.tarif !== grenaillage.tarif) {
                    return true;
                } else {
                    grenaillage.tarif = response.tarif;
                    return false;
                }
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        ...overrides
    };
}