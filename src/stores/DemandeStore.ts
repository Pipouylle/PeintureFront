import {defineStore} from 'pinia'
import {Demande, createDefaultDemande} from "@/models/types/demande"
import {ListDemandeModel, createDefaultListDemandeModel} from "@/models/lists/ListDemandeModel"
import {getAllDemandeCalendar, getAllDemandes, updateDemande, creerDemande, deleteDemande, updateEtatDemande, getCouchesDemande, getDemandeCalendarNotEnd} from "@/services/DemandesService"

export const listDemandeStore = defineStore('listDemandeStore', {
    state: () => ({
        listDemande: createDefaultListDemandeModel() as ListDemandeModel,
        isLoad: false as boolean
    }),
    actions: {
        async load(){
            if (!this.isLoad) {
                await this.getAll();
                this.isLoad = true;
            }
        },
        async getAll(): Promise<boolean>{
            try {
                this.listDemande.demandes = await getAllDemandes();
                return true;
            } catch (e) {
                return false;
            }
        },
        async delete(demande: Demande): Promise<boolean>{
            try {
                const index = this.listDemande.demandes.findIndex(d => d.id === demande.id)
                if (index !== -1) {
                    await deleteDemande(demande);
                    this.listDemande.demandes.splice(index, 1);
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }
    }
});