import {defineStore} from "pinia";
import {Affaire, createDefaultAffaire} from "@/models/types/affaire"
import {getAllAffaires, creerAffaire, updateAffaire, deleteAffaire} from "@/services/AffairesService"
import {ListAffaireModel, createDefaultListAffaireModel} from "@/models/lists/ListAffaireModel"
import {listCommandeStore} from "@/stores/CommandeStore";


export const listAffaireStore = defineStore("listAffaireStore", {
    state: () => ({
        listAffaire: createDefaultListAffaireModel() as ListAffaireModel,
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
            listCommandeStore().unLoad();
        },
        async getAll(): Promise<boolean> {
            try {
                this.listAffaire.affaires = await getAllAffaires();
                return true;
            } catch (e) {
                return false;
            }
        },
        async delete(affaire: Affaire): Promise<boolean> {
            try {
                await deleteAffaire(affaire);
                const index = this.listAffaire.affaires.findIndex((a: Affaire) => a.id === affaire.id);
                this.listAffaire.affaires.splice(index, 1);
                listCommandeStore().unLoad();
                return true;
            } catch (e) {
                return false;
            }
        }
    }
});

export const creationAffaireStore = defineStore("creationAffaireStore", {
    state: () => ({
        affaire: createDefaultAffaire() as Affaire,
    }),
    actions: {
        async load() {
            await listAffaireStore().load();
        },
        async create(affaire: Affaire): Promise<boolean> {
            try {
                const response = await creerAffaire(affaire);
                listAffaireStore().listAffaire.affaires.push(response);
                return true;
            } catch (e) {
                return false;
            }
        },
        clear() {
            this.affaire = createDefaultAffaire();
        }
    },
});

export const updateAffaireStore = defineStore("updateAffaireStore", {
    state: () => ({
        affaire: createDefaultAffaire() as Affaire,
    }),
    actions: {
        async load() {
            await listAffaireStore().load();
        },
        async update(affaire: Affaire): Promise<boolean> {
            try {
                const response = await updateAffaire(affaire);
                const index = listAffaireStore().listAffaire.affaires.findIndex((affaire: Affaire) => affaire.id === response.id);
                listAffaireStore().listAffaire.affaires[index] = response;
                return true;
            } catch (e) {
                return false;
            }
        },
        clear() {
            this.affaire = createDefaultAffaire();
        }
    },
});