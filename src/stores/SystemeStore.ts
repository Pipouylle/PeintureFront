import {defineStore} from "pinia";
import {Systeme, createDefaultSysteme} from "@/models/types/systeme";
import {getAllSystemes, creerSysteme, updateSysteme, deleteSysteme} from "@/services/SystemesService";
import {ListSystemeModel, createDefaultListSystemeModel} from "@/models/lists/ListSystemeModel";
import {Couche, createDefaultCouche} from "@/models/types/couche";
import {creerCouche, getAllCouches, updateCouche} from "@/services/CouchesService";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import {createDefaultSystemeFormModel, systemeFormModel} from "@/models/forms/CreerSysteme/SystemeFormModel";
import {createDefaultSystemeModifModel} from "@/models/modifs/SystemeModifModel";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listGrenaillageStore} from "@/stores/GrenaillageStore";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";

export const listSystemeStore = defineStore("listSystemeStore", {
    state: () => ({
        listSysteme: createDefaultListSystemeModel() as ListSystemeModel,
        listCouche: [] as Couche[],
        //TODO : supprime la liste des couches
        isLoad: false as boolean
    }),
    actions: {
        async load() {
            await listGrenaillageStore().load();
            await listFournisseurStore().load();
            if (!this.isLoad) {
                await this.getAll()
                this.isLoad = true
            }
        },
        unLoad() {
            this.isLoad = false
            listCommandeStore().unLoad();
        },
        async getAll(): Promise<boolean> {
            try {
                this.listSysteme.systemes = await getAllSystemes()
                await this.getAllCouche();
                for (const systeme of this.listSysteme.systemes) {
                    systeme.grenaillage = listGrenaillageStore().listGrenaillage.find((grenaillage: Grenaillage) => grenaillage.id === systeme.grenaillage?.id) ?? createDefaultGrenaillage();
                    systeme.couches = this.listCouche.filter((c: Couche) => c.systeme.id === systeme.id);
                }
                return true
            } catch (e) {
                return false
            }
        },
        async getAllCouche(): Promise<boolean> {
            try {
                this.listCouche = await getAllCouches();
                return true;
            } catch (e) {
                return false;
            }
        },
        async delete(systeme: Systeme): Promise<boolean> {
            try {
                await deleteSysteme(systeme);
                this.listSysteme.systemes = this.listSysteme.systemes.filter((s: Systeme) => s.id !== systeme.id);
                this.listCouche = this.listCouche.filter((c: Couche) => c.systeme.id !== systeme.id);
                listCommandeStore().unLoad();
                return true;
            } catch (e) {
                return false;
            }
        },
    }
});

export const creationSystemeStore = defineStore("creationSystemeStore", {
    state: () => ({
        systemesForm: createDefaultSystemeFormModel() as systemeFormModel,
    }),
    getters: {
        nbCouches: (state): number => state.systemesForm.systeme.couches.length,
    },
    actions: {
        async load() {
            await listSystemeStore().load();
            this.clearCouches();
        },
        async create(systeme: Systeme): Promise<boolean> {
            try {
                const responseSysteme = await creerSysteme(systeme);
                for (const couche of systeme.couches) {
                    couche.systeme.id = responseSysteme.id;
                    const response = await creerCouche(couche);
                    responseSysteme.couches.push(response);
                }
                listSystemeStore().listSysteme.systemes.push(responseSysteme);
                this.clear();
                return true;
            } catch (e) {
                return false;
            }
        },
        addCouche(nb: number) {
            for (let i = 1; i <= nb; i++) {
                this.systemesForm.systeme.couches.push(createDefaultCouche({id: i + this.nbCouches}));
            }
        },
        removeCouche(nb: number) {
            this.systemesForm.systeme.couches = this.systemesForm.systeme.couches.filter((couche: Couche) => couche.id <= this.nbCouches - nb);
        },
        clear() {
            this.clearForm();
            this.clearCouches();
        },
        clearCouches() {
            this.systemesForm.systeme.couches = [createDefaultCouche({id: 1})];
            this.systemesForm.nbCouche = 1;
        },
        clearForm() {
            this.systemesForm = createDefaultSystemeFormModel()
        },
    },
});

export const updateSystemeStore = defineStore("updateSystemeStore", {
    state: () => ({
        systemeModif: createDefaultSystemeModifModel() as systemeFormModel,
    }),
    actions: {
        async load() {
            await listSystemeStore().load();
        },
        async update(systeme: Systeme): Promise<boolean> {
            try {
                const responseSysteme = await updateSysteme(systeme);
                for (const couche of systeme.couches) {
                    const responseCouche = await updateCouche(couche);
                }
                listSystemeStore().unLoad();
                return true
            } catch (e) {
                return false;
            }
        }
    },
});