import {Commande, createDefaultCommande} from "@/models/types/commande";
import {creerCommmande, updateCommande} from "@/services/CommandesService";
import {creerArticleCouche, updateArticleArticleCouche} from "@/services/ArticleCoucheService";
import {Affaire} from "@/models/types/affaire";
import {Systeme} from "@/models/types/systeme";
import {useListStore} from "@/stores";

export interface ListCommandeModel {
    commandes : Commande[],
    modifCommande: Commande,
    filter: string,
    add: (commande: Commande) => Promise<boolean>,
    delete: (commande: Commande) => void,
    deleteByAffaire: (affaire: Affaire) => void,
    deleteBySysteme: (systeme: Systeme) => void,
    modif: (commande: Commande) => Promise<boolean>
}

export function createDefaultListCommandeModel(overrides : Partial<ListCommandeModel> = {}): ListCommandeModel {
    const listCommandeModel : ListCommandeModel = {
        commandes : [],
        filter: "",
        modifCommande: createDefaultCommande(),
        add : async (commande: Commande): Promise<boolean> => {
            try {
                const response = await creerCommmande(commande);
                for (const responseElement of commande.articles) {
                    responseElement.commande.id = response.id;
                    await creerArticleCouche(responseElement);
                }
                commande.id = response.id;
                listCommandeModel.commandes.push(commande);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        delete: async (commande: Commande) => {
            const index = listCommandeModel.commandes.findIndex(c => c.id === commande.id);
            if (index !== -1) {
                useListStore().ListDemande.deleteByCommande(commande);
                listCommandeModel.commandes.splice(index, 1);
            }
        },
        deleteByAffaire: async (affaire: Affaire) => {
            const commandes = listCommandeModel.commandes.filter(c => c.affaire.id === affaire.id);
            console.log(commandes.length);
            await Promise.all(commandes.map(async (commande) => {
                listCommandeModel.delete(commande);
            }));
        },
        deleteBySysteme: async (systeme: Systeme) => {
            const commandes = listCommandeModel.commandes.filter(c => c.systeme.id === systeme.id);
            await Promise.all(commandes.map(async (commande) => {
                listCommandeModel.delete(commande);
            }));
        },
        modif: async (commande: Commande): Promise<boolean> => {
            const index = listCommandeModel.commandes.findIndex(c => c.id === commande.id);
            if (index !== -1) {
                try {
                    await updateCommande(commande);
                    for (const articleCouche of commande.articles) {
                        await updateArticleArticleCouche(articleCouche);
                    }
                    listCommandeModel.commandes[index] = commande;
                    return true;
                } catch (e) {
                    console.error(e);
                    return false;
                }
            }
            console.log('commande non trouvé');
            return false;
        },
        ...overrides
    }
    return listCommandeModel;
}