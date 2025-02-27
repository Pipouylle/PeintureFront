    import {Fournisseur} from "@/models/types/fournisseur";
    import {creerFournisseur, deleteFournisseur, updateFournisseur} from "@/services/FournisseurService";

export interface ListFournisseurModel {
    fournisseurs : Fournisseur[];
    filter: string;
    add: (fournisseur: Fournisseur) => Promise<boolean>;
    //TODO: faire le remove et tout ceux d'en dessout
    remove: (fournisseur: Fournisseur) => void;
    modif: (fournisseur: Fournisseur) => Promise<boolean>;
}

export function createDefaultListFournisseurModel(overrides : Partial<ListFournisseurModel> = {}): ListFournisseurModel {
    const listFournisseurModel : ListFournisseurModel = {
        fournisseurs : [],
        filter: "",
        add : async (fournisseur: Fournisseur): Promise<boolean> => {
            try {
                const response = await creerFournisseur(fournisseur);
                fournisseur.id = response.id;
                listFournisseurModel.fournisseurs.push(fournisseur);
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        remove: async (fournisseur: Fournisseur) => {
            const index = listFournisseurModel.fournisseurs.findIndex(f => f.id === fournisseur.id);
            if (index !== -1) {
                //TODO: remove fournisseur bd
                await deleteFournisseur(fournisseur);
                listFournisseurModel.fournisseurs.splice(index, 1);
            }
        },
        modif: async (fournisseur: Fournisseur): Promise<boolean> => {
            const index = listFournisseurModel.fournisseurs.findIndex(f => f.id === fournisseur.id);
            if (index !== -1) {
                try {
                    await updateFournisseur(fournisseur);
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }
            return false;
        },
        ...overrides
    };
    return listFournisseurModel;
}