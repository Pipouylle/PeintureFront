import {defineStore} from "pinia";
import {Semaine, createDefaultSemaine} from "@/models/types/semaine"
import {ListSemaineModel, createDefaultListSemaineModel} from "@/models/lists/ListSemaineModel"
import {getAllSemaines, updateSemaine} from "@/services/SemainesService"

export const listSemaineStore = defineStore("listSemaineStore", {
    state: () => ({
        listSemaine: createDefaultListSemaineModel() as ListSemaineModel,
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
        },
        async getAll(): Promise<boolean> {
            try {
                this.listSemaine.semaines = await getAllSemaines();
                return true;
            } catch (e) {
                return false;
            }
        },
        getSemaine(d: string): Semaine | null {
            const date = new Date(d);
            for (const semaine of this.listSemaine.semaines) {
                const dateDebut = new Date(semaine.dateDebut);
                const dateFin = new Date(semaine.dateFin);
                if (date >= dateDebut && date <= dateFin) {
                    return semaine;
                }
            }
            return null;
        },
        getCurrentSemaine(): Semaine | null {
            return this.getSemaine(new Date().toISOString());
        },
        async update(semaine: Semaine): Promise<boolean> {
            try {
                const index = this.listSemaine.semaines.indexOf(semaine);
                if (index !== -1) {
                    await updateSemaine(semaine);
                    this.listSemaine.semaines[index] = semaine;
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }
    },
});