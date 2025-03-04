import {defineStore} from "pinia";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import {getAllCommandes, updateCommande, deleteCommande, creerCommmande} from "@/services/CommandesService"
import {ListCommandeModel, createDefaultListCommandeModel} from "@/models/lists/ListCommandeModel"
import {CommandeFormModel, createDefaultCommandeFormModel} from "@/models/forms/CreerCommande/commandeFormModel";
import {CommandeModifModel, createDefaultCommandeModifModel} from "@/models/modifs/CommandeModifModel";
import {creerArticleCouche, updateArticleArticleCouche} from "@/services/ArticleCoucheService";
import {ModifCoucheCommandeModel} from "@/models/forms/CreerCommande/ModifCoucheCommandeModel";

export const listCommandeStore = defineStore("listCommandeStore", {
    state: () => ({
        listCommande: createDefaultListCommandeModel() as ListCommandeModel,
        isLoad: false as boolean
    }),
    actions: {
        async load() {
            if (!this.isLoad) {
                await this.getAll()
                this.isLoad = true
            }
        },
        async getAll(): Promise<boolean> {
            try {
                this.listCommande.commandes = await getAllCommandes()
                return true;
            } catch (e) {
                return false;
            }
        },
        async delete(commande: Commande): Promise<boolean> {
            try {
                const index = this.listCommande.commandes.findIndex((c: Commande) => c.id === commande.id);
                if (index !== -1) {
                    await deleteCommande(commande);
                    this.listCommande.commandes.splice(index, 1);
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }
    }
});

export const creationCommandeStore = defineStore("creationCommandeStore", {
    state: () => ({
        commande: createDefaultCommandeFormModel() as CommandeFormModel,
        listModifCouche: [] as ModifCoucheCommandeModel[]
    }),
    actions: {
        async load() {
            await listCommandeStore().load();
        },
        async create(commande: Commande): Promise<boolean> {
            try {
                const responseCommande = await creerCommmande(commande);
                for (const articleCouche of commande.articles) {
                    articleCouche.id = responseCommande.id;
                    await creerArticleCouche(articleCouche);
                }
                listCommandeStore().listCommande.commandes.push(responseCommande);
                return true;
            } catch (e) {
                return false;
            }
        },
        addModifCouche(modifCouche: ModifCoucheCommandeModel) {
            this.listModifCouche.push(modifCouche);
        },
        clear() {
            this.commande = createDefaultCommandeFormModel();
            this.listModifCouche = [];
        }
    }
});

export const updateCommandeStore = defineStore("updateCommandeStore", {
    state: () => ({
        commandeModif: createDefaultCommandeModifModel() as CommandeModifModel,
    }),
    actions: {
        async load() {
            await listCommandeStore().load();
        },
        async update(commande: Commande): Promise<boolean> {
            try {
                const responseCommande = await updateCommande(commande);
                for (const articleCouche of commande.articles) {
                    await updateArticleArticleCouche(articleCouche);
                }
                const index = listCommandeStore().listCommande.commandes.findIndex((c: Commande) => c.id === responseCommande.id);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
});