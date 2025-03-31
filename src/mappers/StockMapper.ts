import {Stocks} from "@/models/objectsApi/Stocks";
import {Stock} from "@/models/types/stock";
import {createDefaultArticle, Article} from "@/models/types/article";
import {createDefaultUser, User} from "@/models/types/user";
import {createDefaultOf, Of} from "@/models/types/of";
import Articlemapper from "@/mappers/Articlemapper";
import Usermapper from "@/mappers/Usermapper";
import Ofsmapper from "@/mappers/Ofsmapper";

export default class Stockmapper {
    public static mapStock(obj: Stocks): Stock {
        return {
            id: obj?.id ?? 0,
            dateStock: obj?.dateStockStock ? obj.dateStockStock : new Date().toISOString(),
            dateSortie: obj.dateSortieStock ? obj.dateSortieStock : "",
            article: obj?.articleStock ? typeof obj.articleStock === 'object' ? Articlemapper.mapArticle(obj.articleStock) : createDefaultArticle({id : parseInt(obj.articleStock.split('/')[3])}) : createDefaultArticle(),
            user: obj?.userStock ? typeof obj.userStock === 'object' ? Usermapper.mapUser(obj.userStock) : createDefaultUser({id : parseInt(obj.userStock.split('/')[3])}) : createDefaultUser(),
            of: obj?.ofStock ? typeof obj.ofStock === 'object' ? Ofsmapper.mapOf(obj.ofStock) : createDefaultOf({id : parseInt(obj.ofStock.split('/')[3])}) : createDefaultOf(),
            unique: obj?.isUniqueStock ?? false,
        }
    }

    public static mapArrayStock(data: Stocks[]): Stock[] {
        return data.map(Stockmapper.mapStock);
    }

    public static mapStocks(obj: Stock): Stocks {
        return {
            id: obj.id,
            dateStockStock: obj.dateStock,
            dateSortieStock: obj.dateSortie ?? null,
            articleStock: "/api/articles/" + obj.article.id,
            userStock: obj.user.id !== 0 ? "/api/users/" + obj.user.id : null,
            ofStock: obj.of.id !== 0 ? "/api/o_fs/" + obj.of.id : null,
            isUniqueStock: obj.unique
        }
    }

    public static mapArrayStocks(data: Stock[]): Stocks[] {
        return data.map(Stockmapper.mapStocks);
    }
}