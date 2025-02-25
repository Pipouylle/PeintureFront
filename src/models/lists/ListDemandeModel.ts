import {createDefaultDemande, Demande} from "@/models/types/demande";
import {creerDemande} from "@/services/DemandesService";
import {creerSurfaceCouche} from "@/services/SurfaceCouchesService";
import {Commande} from "@/models/types/commande";
import {useListStore} from "@/stores";
import {DemandesCalendar} from "@/models/calendar2_0/DemandesCalendar";

export interface ListDemandeModel{
    demandes: Demande[];
    demandesModif: Demande;
    filter: string;
    add: (demande: Demande) => Promise<boolean>;
    delete: (demande: Demande) => void;
    deleteByCommande: (commande: Commande) => void;
}

export function createDefaultListDemandeModel(overrides: Partial<ListDemandeModel> = {}): ListDemandeModel {
    const listDemandeModel : ListDemandeModel = {
        demandes: [],
        filter: "",
        demandesModif: createDefaultDemande(),
        add: async (demande): Promise<boolean> => {
            try {
                const response = await creerDemande(demande);
                demande.id = response.id;
                for (const surfaceCouche of demande.surfaceCouches) {
                    surfaceCouche.demande.id = demande.id;
                    await creerSurfaceCouche(surfaceCouche);
                }
                listDemandeModel.demandes.push(demande);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        delete: (demande) => {
            const index = listDemandeModel.demandes.findIndex(d => d.id === demande.id);
            if (index !== -1) {
                listDemandeModel.demandes.splice(index, 1);
                useListStore().ListDemandeCalendar = useListStore().ListDemandeCalendar.filter((d: DemandesCalendar) => d.idDemande !== demande.id);
            }
        },
        deleteByCommande: async (commande) => {
            const demandes = listDemandeModel.demandes.filter(d => d.commande.id === commande.id);
            await Promise.all(demandes.map(async (demande) => {
                listDemandeModel.delete(demande);
            }));
        },
        ...overrides
    }
    return listDemandeModel;
}