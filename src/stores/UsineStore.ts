import {defineStore} from "pinia";
import {Of} from "@/models/types/of";
import {createDefaultViewUsineModel, ViewUsineModel} from "@/models/usines/ViewUsineModel";
import {listUserStore, useUserStore} from "@/stores/UserStore";
import {createDefaultSemaine} from "@/models/types/semaine";
import {getAllOfbySemaine, getOfForUsineView} from "@/services/OfsService";
import {getAvancementSurfaceCoucheByOf} from "@/services/AvancementSurfaceCoucheService";
import {getArticleCoucheForDemande} from "@/services/ArticleCoucheService";
import {createDefaultCommande} from "@/models/types/commande";
import {Stock, createDefaultStock} from "@/models/types/stock";
import {User} from "@/models/types/user";
import {getStockById, getStockNotSortie, SortieStock} from "@/services/StockService";
import {listSemaineStore} from "@/stores/SemaineStore";
import {listAffaireStore} from "@/stores/AffaireStore";
import {listSystemeStore} from "@/stores/SystemeStore";
import {listCommandeStore} from "@/stores/CommandeStore";
import {listDemandeStore} from "@/stores/DemandeStore";
import {listArticleStore} from "@/stores/ArticleStore";
import {getJourEnumValue, Jour} from "@/enums/Jour";

export const OperateurViewStore = defineStore('OperateurViewStore', {
    state: () => ({
        listOf: [] as Of[],
        usineModel: createDefaultViewUsineModel() as ViewUsineModel,
        dialog: false,
        fetchDate: new Date(),
    }),
    actions: {
        async load() {
            await listSemaineStore().load();
            await listUserStore().load();
            listUserStore().archived = false;
            listUserStore().notArchived = true;
        },
        unLoad() {
            listUserStore().unLoad();
        },
        async setJour(date: string) {
            if (new Date().toISOString().split('T')[0] > this.fetchDate.toISOString().split('T')[0]) {
                window.location.reload();
                date = new Date().toISOString();
                this.fetchDate = new Date();
            }
            this.usineModel.date = date;
            this.usineModel.semaine =  listSemaineStore().getSemaine(date) ?? createDefaultSemaine();
            this.usineModel.jour = this.usineModel.jours[new Date(date).getDay()];
            await this.setOf();

        },
        async setOf() {
            const jour = getJourEnumValue(this.usineModel.jour);
            const jourValue = typeof jour === 'number' ? jour : 1;
            this.listOf = await getOfForUsineView(this.usineModel.semaine.id, jourValue);
        },
        getOfBytempAndJour(): Of[] {
            return this.listOf.filter(of => of.jour === this.usineModel.jour).sort((a, b) => a.order - b.order);
        },
        async nextJour() {
            const newDate = new Date(this.usineModel.date);
            newDate.setDate(newDate.getDate() + 1);
            await this.setJour(newDate.toISOString());
        },
        async previousJour() {
            const newDate = new Date(this.usineModel.date);
            newDate.setDate(newDate.getDate() - 1);
            await this.setJour(newDate.toISOString());
        },
        async sortirStock(stocks: Stock[], user: User, of: Of) : Promise<boolean>{
            try {
                if (stocks.length < 1) {
                    return false;
                }
                for (const stock of stocks) {
                    stock.user = user;
                    stock.of = of;
                    await SortieStock(stock);
                }
                return true
            } catch (e) {
                return false;
            }
        },
        async getStock(id: number): Promise<Stock> {
          try {
              return await getStockById(id);
          } catch (e) {
              return createDefaultStock();
          }
        },
        clearAll() {
            this.clearListOf();
            this.usineModel = createDefaultViewUsineModel();
        },
        clearListOf() {
            this.listOf = [];
        },
    },
});