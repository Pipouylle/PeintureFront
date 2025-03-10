import { Article } from "@/models/types/article";
import { Articles } from "@/models/objectsApi/Articles";
import {createDefaultFournisseur} from "@/models/types/fournisseur";

export default class Articlemapper {
    static mapArticle(obj: Articles): Article {
        return {
            id: parseInt(obj.id),
            descriptif: obj.designationArticle,
            couches: [],
            ral: obj.RALArticle,
            fournisseur: createDefaultFournisseur({id: parseInt(obj.fournisseurArticle.split('/')[3])}),
        }
    }

    static mapArrayArticle(dataArray: any): Article[] {
        return dataArray.map(this.mapArticle);
    }

    static mapArticles(obj: Article): Articles {
        return {
            id: String(obj.id),
            designationArticle: obj.descriptif,
            fournisseurArticle: "/api/fournisseurs/" + obj.fournisseur.id,
            RALArticle: obj.ral,
        }
    }

    static mapArrayArticles(dataArray: any): Articles[] {
        return dataArray.map(this.mapArticles);
    }
}