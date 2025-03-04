import {defineStore} from "pinia";
import {Systeme, createDefaultSysteme} from "@/models/types/systeme";
import {getAllSystemes, creerSysteme, updateSysteme, deleteSysteme} from "@/services/SystemesService";
import {ListSystemeModel, createDefaultListSystemeModel} from "@/models/lists/ListSystemeModel";
import {Couche, createDefaultCouche} from "@/models/types/couche";
import {creerCouche, getAllCouches, updateCouche} from "@/services/CouchesService";
import {listFournisseurStore} from "@/stores/FournisseurStore";
import {createDefaultSystemeFormModel, systemeFormModel} from "@/models/forms/CreerSysteme/SystemeFormModel";
import {createDefaultSystemeModifModel} from "@/models/modifs/SystemeModifModel";

export const listSystemeStore = defineStore("listSystemeStore", {
    state: () => ({
        listSysteme: createDefaultListSystemeModel() as ListSystemeModel,
        listCouche: [] as Couche[],
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
                this.listSysteme.systemes = await getAllSystemes()
                await this.getAllCouche()
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
        },
        async create(systeme: Systeme): Promise<boolean> {
            try {
                const response = await creerSysteme(systeme);
                for (const couche of systeme.couches) {
                    couche.systeme.id = systeme.id;
                    const response = await creerCouche(couche);
                }
                listSystemeStore().listSysteme.systemes.push(response);
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
            this.setCouche();
        },
        setCouche() {
            const couches = listSystemeStore().listCouche.filter((c: Couche) => c.systeme.id === this.systemeModif.systeme.id);
            for (const couche of couches) {
                this.systemeModif.systeme.couches.push(couche);
            }
        },
        async update(systeme: Systeme): Promise<boolean> {
            try {
                const responseSysteme = await updateSysteme(systeme);
                for (const couche of systeme.couches) {
                    const responseCouche = await updateCouche(couche);
                    const index = listSystemeStore().listCouche.findIndex((c: Couche) => c.id === responseCouche.id);
                    listSystemeStore().listCouche[index] = responseCouche;
                }
                const index = listSystemeStore().listSysteme.systemes.findIndex((s: Systeme) => s.id === responseSysteme.id);
                listSystemeStore().listSysteme.systemes[index] = responseSysteme;
                return true
            } catch (e) {
                return false;
            }
        }
    },
});