import {defineStore} from "pinia";
import {Grenaillage} from "@/models/types/Grenaillage";
import {getAllGrenaillage, updateGrenaillage} from "@/services/GrenaillagesService"
import {listSystemeStore} from "@/stores/SystemeStore";
import {NameGrenaillage, TypeGrenaillage} from "@/enums/Grenaillage";

export const listGrenaillageStore = defineStore("listGrenallageStore", {
    state: () => ({
        listGrenaillage: [] as Grenaillage[],
        isLoad: false as boolean,
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
        },
        async getAll(): Promise<boolean> {
            try {
                const response = await getAllGrenaillage();
                this.listGrenaillage = response.sort((a, b) => {
                    if (a.typeChantier !== b.typeChantier) {
                        return b.typeChantier.localeCompare(a.typeChantier, undefined, { sensitivity: 'base' });
                    }
                    return a.nom.localeCompare(b.nom, undefined, { sensitivity: 'base' });
                });
                return true;
            } catch (e) {
                return false;
            }
        },
        async update(grenaillage: Grenaillage): Promise<boolean> {
            try {
                await updateGrenaillage(grenaillage);
                return true;
            } catch (e) {
                return false;
            }
        },
    }
});