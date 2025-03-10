import {defineStore} from "pinia";
import {Fournisseur, createDefaultFournisseur} from "@/models/types/fournisseur";
import {getAllFournisseurs, creerFournisseur, updateFournisseur, deleteFournisseur} from "@/services/FournisseurService"
import {ListFournisseurModel, createDefaultListFournisseurModel} from "@/models/lists/ListFournisseurModel"
import {listSystemeStore} from "@/stores/SystemeStore";
import {listArticleStore} from "@/stores/ArticleStore";


export const listFournisseurStore = defineStore("listFournisseurStore", {
    state: () => ({
        listFournisseur: createDefaultListFournisseurModel() as ListFournisseurModel,
        isLoad: false as boolean
    }),
    actions: {
        async load() {
            if (!this.isLoad) {
                await this.getAll();
                this.isLoad = true;
            }
        },
        unLoad() {
            this.isLoad = false;
            listSystemeStore().unLoad();
            listArticleStore().unLoad();
        },
        async getAll(): Promise<boolean> {
            try {
                this.listFournisseur.fournisseurs = await getAllFournisseurs();
                return true;
            } catch (e) {
                return false;
            }
        },
        async delete(fournisseur: Fournisseur): Promise<boolean> {
            try {
                const index = this.listFournisseur.fournisseurs.findIndex((f: Fournisseur) => f.id === fournisseur.id);
                if (index !== -1) {
                    await deleteFournisseur(fournisseur);
                    this.listFournisseur.fournisseurs.splice(index, 1);
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },
        async update (fournisseur: Fournisseur): Promise<boolean> {
            try {
                await updateFournisseur(fournisseur);
                return true;
            } catch (e) {
                await this.getAll();
                return false;
            }
        }
    }
});

export const creationFournisseurStore = defineStore("creationFournisseurStore", {
    state: () => ({
        fournisseur: createDefaultFournisseur() as Fournisseur,
    }),
    actions: {
        async load() {
            await listFournisseurStore().load();
        },
        async create(fournisseur: Fournisseur): Promise<boolean> {
            try {
                const response = await creerFournisseur(fournisseur);
                listFournisseurStore().listFournisseur.fournisseurs.push(response);
                return true;
            } catch (e) {
                return false;
            }
        },
        async delete(fournisseur: Fournisseur): Promise<boolean> {
            try {
                const index = listFournisseurStore().listFournisseur.fournisseurs.findIndex((f: Fournisseur) => f.id === fournisseur.id);
                if (index !== -1) {
                    await deleteFournisseur(fournisseur);
                    listFournisseurStore().listFournisseur.fournisseurs.splice(index, 1);
                    listSystemeStore().isLoad = false;
                    //TODO
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },
        clear() {
            this.fournisseur = createDefaultFournisseur();
        }
    },
});