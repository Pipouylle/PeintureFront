import {defineStore} from "pinia";
import {createDefaultPlaningModel, PlaningModel} from "@/models/calendar2_0/PlaningModel";
import {listUserStore} from "@/stores/UserStore";
import {listDemandeStore} from "@/stores/DemandeStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listSemaineStore} from "@/stores/SemaineStore";
import {createDefaultSemaine} from "@/models/types/semaine";
import {creerOf, deleteOf, getAllOfbySemaine, updateOF, updateOfOrder} from "@/services/OfsService";
import {creerAvancementSurfaceCouche} from "@/services/AvancementSurfaceCoucheService";
import {createDefaultOf, Of} from "@/models/types/of";
import {createDefaultDemande} from "@/models/types/demande";
import {getSurfaceCoucheByDemande} from "@/services/SurfaceCouchesService";
import {createDefaultAvancementSurfaceCouche} from "@/models/types/avancementSurfaceCouche";
import {createDefaultSurfaceCouche} from "@/models/types/surfaceCouche";
import {OperateurViewStore} from "@/stores/UsineStore";
import {avancementStore} from "@/stores/AvancementStore";

export const planingStore = defineStore("planingStore", {
    state: () => ({
        planingModel: createDefaultPlaningModel() as PlaningModel,
        isLoad: false as boolean,
    }),
    actions: {
        async load() {
            await listSemaineStore().load();
            if (!this.isLoad) {
                this.planingModel.semaine = listSemaineStore().getCurrentSemaine() ?? createDefaultSemaine();
                console.log(this.planingModel.semaine);
                this.isLoad = true;
            }
            await listAffaireStore().load();
            await listUserStore().load();
            await listSystemeStore().load();
            await listCommandeStore().load();
            await listDemandeStore().load();
        },
        unLoad() {
            this.isLoad = false;
            avancementStore().unLoad();
        },
        async setSemaine() {
            this.planingModel.listOf = await getAllOfbySemaine(this.planingModel.semaine);
        },
        async creerOfCalendar(demandeId: number, jour: string, temp: string): Promise<boolean> {
            try {
                const Of = createDefaultOf({
                    demande: createDefaultDemande({
                        id: demandeId,
                    }),
                    temp: temp,
                    jour: jour,
                    cabine: this.planingModel.cabine,
                    semaine: this.planingModel.semaine,
                });
                const responseOf = await creerOf(Of);
                const responseSurfaceCouches = await getSurfaceCoucheByDemande(demandeId);
                for (const surfaceCouche of responseSurfaceCouches) {
                    const avancement = createDefaultAvancementSurfaceCouche({
                        of: responseOf,
                        surfaceCouches: responseSurfaceCouches.find(s => s.id === surfaceCouche.id) ?? createDefaultSurfaceCouche({id: surfaceCouche.id}),
                    })
                    responseOf.avancements.push(await creerAvancementSurfaceCouche(avancement));
                }
                this.planingModel.listOf.push(responseOf);
                avancementStore().unLoad();
                return true;
            } catch (e) {
                return false;
            }
        },
        async updateOfCalendar(ofId: number, jour: string, temp: string): Promise<boolean> {
            const of = this.planingModel.listOf.find((of: Of) => of.id === ofId);
            if (of) {
                of.jour = jour;
                of.cabine = this.planingModel.cabine;
                of.temp = temp;
                try {
                    await updateOF(of);
                    return true;
                } catch (e) {
                    return false;
                }
            }
            return false;
        },
        async updateOrderOfCalendar(jour: string, list: Of[]) {
            for (const of of list) {
                if (of.order !== list.indexOf(of) + 1) {
                    of.order = list.indexOf(of) + 1;
                    try {
                        await updateOfOrder(of);
                        this.planingModel.listOf.find((o: Of) => o.id === of.id)!.order = of.order;
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        },
        async deleteOf(ofId: number) {
            const index = this.planingModel.listOf.findIndex((of: Of) => of.id === ofId);
            if (index !== -1) {
                try {
                    await deleteOf(createDefaultOf({id: ofId}));
                    this.planingModel.listOf.splice(index, 1);
                    avancementStore().unLoad();
                } catch (e) {
                    console.error('erreur lors de la suppression de l\'of', e);
                }
            } else {
                console.error('of introuvable');
            }
        },
        getOfByDemiJour(jour: string, temp: string): Of[] {
            return this.planingModel.listOf.filter(of => of.jour === jour && of.cabine === this.planingModel.cabine && of.temp === temp).sort((a, b) => a.order - b.order);
        }
    },
});