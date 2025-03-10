import {defineStore} from "pinia";
import {Grenaillage} from "@/models/types/Grenaillage";
import {getAllGrenaillage, updateGrenaillage} from "@/services/GrenaillagesService"
import {listSystemeStore} from "@/stores/SystemeStore";

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
                this.listGrenaillage = await getAllGrenaillage();
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