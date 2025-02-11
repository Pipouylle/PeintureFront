import { Article } from "@/models/types/article";
import { Articles } from "@/models/objectsApi/Articles";

export default class Articlemapper {
    static mapArticle(obj: Articles): Article {
        return {
            id: obj.id,
            descriptif: obj.designationArticle,
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
            designationArticle: obj.descriptif,
        }
    }

    static mapArrayArticles(dataArray: any): Articles[] {
        return dataArray.map(this.mapArticles);
    }
}