import { Article } from "@/models/types/article";
import { Articles } from "@/models/objectsApi/Articles";
import {createDefaultConsommation} from "@/models/types/consommation";

export default class Articlemapper {
    static mapArticle(obj: Articles): Article {
        return {
            id: obj.id,
            nomArticle: obj.nomArticle,
            rALArticle: obj.rALArticle,
            quantiterArticle: obj.stockArticle,
            fournisseurArticle: obj.fournisseurArticle,
            typeArticle: obj.typeArticle,
            consommations: [],
            couches: []
        }
    }

    static mapArrayArticle(dataArray: any): Article[] {
        return dataArray.map(this.mapArticle);
    }

    static mapArticles(obj: Article): Articles {
        return {
            id: obj.id,
            nomArticle: obj.nomArticle,
            rALArticle: obj.rALArticle,
            stockArticle: obj.quantiterArticle,
            typeArticle: obj.typeArticle,
            fournisseurArticle: obj.fournisseurArticle,
        }
    }

    static mapArrayArticles(dataArray: any): Articles[] {
        return dataArray.map(this.mapArticles);
    }
}