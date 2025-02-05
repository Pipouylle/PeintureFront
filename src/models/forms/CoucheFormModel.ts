import {Article, createDefaultArticle} from "@/models/types/article";

export interface CoucheFormModel {
    id: number;
    article: Article;
    tarif: number;
    dialog: boolean;
    epaisseur: number;
    getData: () => {
        article: Article;
        tarif: number;
        epaisseur: number;
    };
}

export function createDefaultCoucheFormModel(override: Partial<CoucheFormModel>): CoucheFormModel {
    return {
        id: 0,
        article: createDefaultArticle(),
        tarif: 0,
        dialog: false,
        epaisseur: 0,
        getData() {
            return {
                article: this.article,
                tarif: this.tarif,
                epaisseur: this.epaisseur,
            };
        },
        ...override,
    };
}
