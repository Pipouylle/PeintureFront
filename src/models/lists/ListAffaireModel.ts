import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {creerAffaire, getAllAffaires} from "@/services/AffairesService";
import {useRouter} from "vue-router";
import {useListStore} from "@/stores";

export interface ListAffaireModel {
    affaires: Affaire[];
    affairesModif: Affaire;
    filter: string;
    add: (affaire: Affaire) => Promise<boolean>;
    delete: (affaire: Affaire) => void;
}

export function createDefaultListAffaireModel(overrides: Partial<ListAffaireModel> = {}): ListAffaireModel {
    const listAffaireModel: ListAffaireModel = {
        affaires: [],
        affairesModif: createDefaultAffaire(),
        filter: "",
        add: async (affaire): Promise<boolean> => {
            try {
                const response = await creerAffaire(affaire);
                affaire.id = response.id;
                listAffaireModel.affaires.push(affaire);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        delete: async(affaire) => {
            const index = listAffaireModel.affaires.findIndex(a => a.id === affaire.id);
            if (index !== -1) {
                await useListStore().ListCommande.deleteByAffaire(affaire);
                listAffaireModel.affaires.splice(index, 1);
            }
        },
        ...overrides
    };
    return listAffaireModel;
}

