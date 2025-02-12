import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {creerAffaire, getAllAffaires} from "@/services/AffairesService";

export interface ListAffaireModel {
    affaires: Affaire[];
    affairesModif: Affaire;
    add: (affaire: Affaire) => Promise<boolean>;
}

export function createDefaultListAffaireModel(overrides: Partial<ListAffaireModel> = {}): ListAffaireModel {
    const listAffaireModel: ListAffaireModel = {
        affaires: [],
        affairesModif: createDefaultAffaire(),
        add: async (affaire): Promise<boolean> => {
            try {
                await creerAffaire(affaire);
                listAffaireModel.affaires.push(affaire);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        ...overrides
    };
    return listAffaireModel;
}

async function setList(): Promise<Affaire[]> {
    try {
        return await getAllAffaires();
    } catch (error) {
        alert("Erreur lors de la récupération des affaires");
        console.error(error);
        return [];
    }
}