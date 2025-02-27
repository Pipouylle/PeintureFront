import {apiClient, apiClientPatch} from "@/stores/apiClient";
import Stockmapper from "@/mappers/StockMapper";
import {Stock} from "@/models/types/stock";
import {Stocks} from "@/models/objectsApi/Stocks";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";

/**
 * permet de recuperer tout les stocks
 * @public
 * @function getAllStock
 * @returns Stock[]
 */
export const getAllStock = async (): Promise<Stock[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>("/stocks");
        return Stockmapper.mapArrayStock(response.data.member);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * permet de creer un stock avec l'information necessaire est seulment l'article, la date de stock est automatique mise par l'api
 * @public
 * @function creerStock
 * @param stock
 * @returns Stock
 */

export const creerStock = async (stock: Stock): Promise<Stock> => {
    try {
        const stocks = Stockmapper.mapStocks(stock);
        const response = await apiClient.post<Stocks>("/stocks", stocks);
        return Stockmapper.mapStock(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * permet de faire la sortie de stock les infomation necessaire dans stock sont la date et l'heure de sortie, le user et l'of
 * @public
 * @function SortieStock
 * @param stock
 * @returns Stock
 */
export const SortieStock = async (stock: Stock): Promise<Stock> => {
    try {
        const stocks = Stockmapper.mapStocks(stock);
        const response = await apiClientPatch.patch(`/stockSortie/${stock.id}`, stocks);
        return Stockmapper.mapStock(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}