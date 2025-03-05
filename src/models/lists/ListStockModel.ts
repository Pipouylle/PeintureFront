import {Stock, createDefaultStock} from "@/models/types/stock";
export interface ListStockModel {
    stocks: Stock[];
    filter: string;
    sortie: boolean;
    notSortie: boolean;
}

export function createDefaultListStockModel(override: Partial<ListStockModel> = {}): ListStockModel {
    return {
        stocks: [],
        filter: "",
        sortie: false,
        notSortie: false,
        ...override,
    };
}