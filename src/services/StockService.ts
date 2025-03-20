import {apiClient, apiClientPatch} from "@/stores/apiClient";
import Stockmapper from "@/mappers/StockMapper";
import {Stock} from "@/models/types/stock";
import {Stocks} from "@/models/objectsApi/Stocks";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";
import {Article} from "@/models/types/article";
import {ArticleCouche} from "@/models/types/articleCouche"

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

export const getStockById = async (id: number): Promise<Stock> => {
    try {
        const response = await apiClient.get<Stocks>(`/stocks/${id}`);
        const stock = Stockmapper.mapStock(response.data);
        console.log(stock);
        return stock;
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
        console.log(stocks);
        const response = await apiClientPatch.patch(`/stockSortie/${stock.id}`, stocks);
        return Stockmapper.mapStock(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const entreeStock = async (article: Article, nombre: number): Promise<Stock[]> => {
    try {
        const response = await apiClient.post<Stocks[]>('/stockCreate/' + article.id + '/' + nombre);
        return Stockmapper.mapArrayStock(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getStockForSortieByArticle = async (articleCouche: ArticleCouche): Promise<Stock[]> => {
    try {
        const stocks: Stocks[] = [];
        for (const article of articleCouche.articles) {
            const response = await apiClient.get<ApiResponseCollection>(`/stocks?article_stock=${article.id}&dateSortie_stock=null`);
            for (const stock of response.data.member) {
                stocks.push(stock);
            }
        }
        return Stockmapper.mapArrayStock(stocks);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getStockForSortie = async (): Promise<Stock[]> => {
    try {
        const date = new Date();
        date.setMonth(date.getMonth() - 6);
        console.log(date.toISOString().split('T')[0]);
        const response = await apiClient.get<ApiResponseCollection>(`/stocks?dateSortie_stock[after]=${date.toISOString().split('T')[0]}`);
        return Stockmapper.mapArrayStock(response.data.member);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getStockNotSortie = async (): Promise<Stock[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/stocks?exists[dateSortie_stock]=false`);
        return Stockmapper.mapArrayStock(response.data.member);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getStockNotSortieByArticle = async (article: Article): Promise<Stock[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>(`/stocks?exists[dateSortie_stock]=false&article_stock=${article.id}`);
        return Stockmapper.mapArrayStock(response.data.member);
    } catch (e) {
        throw e;
    }
}