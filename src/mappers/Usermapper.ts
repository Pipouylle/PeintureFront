import {Users} from "@/models/objectsApi/Users";
import {User} from "@/models/types/user";
import {Stock, createDefaultStock} from "@/models/types/stock";
import Stockmapper from "@/mappers/StockMapper";

export default class Usermapper {
    public static mapUser(obj: Users): User {
        return {
            id: obj?.id ?? 0,
            name: obj?.nameUser ?? "",
            archive: obj?.archiveUser ?? false,
            stocks: obj?.stocksUser ? obj.stocksUser.map((stock: string | object) => typeof stock === 'object' ? Stockmapper.mapStock(stock) : createDefaultStock({id: parseInt(stock.split("T")[3])})) : [],
        }
    }

    public static mapArrayUser(data: Users[]): User[] {
        return data.map(this.mapUser);
    }

    public static mapUsers(obj: User): Users {
        return {
            id: obj.id,
            nameUser: obj.name,
            archiveUser: obj.archive,
            stocksUser: obj.stocks.map((stock: Stock) => "/api/stocks/" + stock.id)
        }
    }

    public static mapArrayUsers(data: User[]): Users[] {
        return data.map(this.mapUsers);
    }
}