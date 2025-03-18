import {defineStore} from 'pinia'
import {Demande, createDefaultDemande} from "@/models/types/demande"
import {ListDemandeModel, createDefaultListDemandeModel} from "@/models/lists/ListDemandeModel"
import {
    getAllDemandeCalendar,
    getAllDemandes,
    updateDemande,
    creerDemande,
    deleteDemande,
    updateEtatDemande,
    getCouchesDemande,
    getDemandeCalendarNotEnd
} from "@/services/DemandesService"
import {planingStore} from "@/stores/PlainingStore";
import {createDefaultDemandeModif} from "@/models/modifs/DemandeModifModel";
import {listCommandeStore} from "@/stores/CommandeStore";
import {createDefaultCommandeFormModel} from "@/models/forms/CreerCommande/commandeFormModel";
import {createDefaultDemandeFormModel} from "@/models/forms/DemandeFormModel";
import {creerSurfaceCouche, updateSurfaceCouche} from "@/services/SurfaceCouchesService";

export const listDemandeStore = defineStore('listDemandeStore', {
    state: () => ({
        listDemande: createDefaultListDemandeModel() as ListDemandeModel,
        isLoad: false as boolean
    }),
    actions: {
        async load() {
            await listCommandeStore().load();
            if (!this.isLoad) {
                await this.getAll();
                this.isLoad = true;
            }
        },
        unLoad() {
            this.isLoad = false;
            planingStore().unLoad();
        },
        async getAll(): Promise<boolean> {
            try {
                this.listDemande.demandes = await getAllDemandes();
                return true;
            } catch (e) {
                return false;
            }
        },
        async delete(demande: Demande): Promise<boolean> {
            try {
                const index = this.listDemande.demandes.findIndex(d => d.id === demande.id)
                if (index !== -1) {
                    await deleteDemande(demande);
                    this.listDemande.demandes.splice(index, 1);
                    planingStore().unLoad();
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },
        async finish(demande: Demande): Promise<boolean> {
            try {
                const index = this.listDemande.demandes.findIndex(d => d.id === demande.id)
                if (index !== -1) {
                    demande.etat = "Terminée"
                    await updateEtatDemande(demande);
                    return true;
                }

                return false;
            } catch (e) {
                return false;
            }
        },
        async notFinish(demande:Demande): Promise<boolean> {
            try {
                const index = this.listDemande.demandes.findIndex(d => d.id === demande.id)
                if (index !== -1) {
                    demande.etat = "En cours"
                    await updateEtatDemande(demande);
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }
    }
});

export const creationDemandeStore = defineStore('creationDemandeStore', {
    state: () => ({
        demandeForm: createDefaultDemandeFormModel(),
    }),
    actions: {
        async load(){
            await listDemandeStore().load();
        },
        async create(demande: Demande): Promise<boolean> {
            try {
                const response = await creerDemande(demande);
                listDemandeStore().listDemande.demandes.push(response);
                for (const surfaceCouche of demande.surfaceCouches) {
                    surfaceCouche.demande.id = response.id;
                    await creerSurfaceCouche(surfaceCouche);
                }
                this.clear();
                return true;
            } catch (e) {
                return false;
            }
        },
        clear() {
            this.demandeForm = createDefaultDemandeFormModel();
        }
    }
});

export const modifDemandeStore = defineStore('modifDemandeStore', {
    state: () => ({
        modifDemande: createDefaultDemandeModif(),
    }),
    actions: {
        async load(){
            await listDemandeStore().load();
        },
        async update(demande: Demande): Promise<boolean> {
            try {
                await updateDemande(demande);
                for (const surfaceCouche of demande.surfaceCouches) {
                    await updateSurfaceCouche(surfaceCouche);
                }
                listDemandeStore().unLoad();
                this.clear();
                return true;
            } catch (e) {
                return false;
            }
        },
        clear(){
            this.modifDemande = createDefaultDemandeModif();
        }
    }
})