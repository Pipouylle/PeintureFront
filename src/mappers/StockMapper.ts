import {Stocks} from "@/models/objectsApi/Stocks";
import {Stock} from "@/models/types/stock";
import {createDefaultArticle} from "@/models/types/article";
import {createDefaultUser} from "@/models/types/user";
import {createDefaultOf} from "@/models/types/of";

export default class Stockmapper {
    public static mapStock(data: Stocks): Stock {
        return {
            id: data.id,
            dateStock: data.dateStockStock ? data.dateStockStock : "",
            dateSortie: data.dateSortieStock,
            article: data.articleStock ? createDefaultArticle({id : parseInt(data.articleStock.split('/')[3])}) : createDefaultArticle(),
            user: data.userStock ? createDefaultUser({id : parseInt(data.userStock.split('/')[3])}) : createDefaultUser(),
            of: data.ofStock ? createDefaultOf({id : parseInt(data.ofStock.split('/')[3])}) : createDefaultOf()
        }
    }

    public static mapArrayStock(data: Stocks[]): Stock[] {
        return data.map(Stockmapper.mapStock);
    }

    public static mapStocks(data: Stock): Stocks {
        return {
            id: data.id,
            dateStockStock: data.dateStock === "" ? null : data.dateStock,
            dateSortieStock: data.dateSortie,
            articleStock: data.article ? "/api/articles/" + data.article.id : null,
            userStock: data.user ? "/api/users/" + data.user.id : null,
            ofStock: data.of ? "/api/o_fs/" + data.of.id : null
        }
    }

    public static mapArrayStocks(data: Stock[]): Stocks[] {
        return data.map(Stockmapper.mapStocks);
    }
}