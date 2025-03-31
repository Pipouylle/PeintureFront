import { Article } from "@/models/types/article";
import { Articles } from "@/models/objectsApi/Articles";
import {createDefaultFournisseur} from "@/models/types/fournisseur";
import FournisseurMapper from "@/mappers/FournisseurMapper";
import ArticleCouchemapper from "@/mappers/ArticleCouchemapper";
import {ArticleCouche, createDefaultArticleCouche} from "@/models/types/articleCouche";

export default class Articlemapper {
    static mapArticle(obj: Articles): Article {
        return {
            id: parseInt(obj?.id ?? "0"),
            descriptif: obj?.designationArticle ?? "",
            ral: obj?.RALArticle ?? "",
            fournisseur: obj?.fournisseurArticle ? typeof obj.fournisseurArticle === 'object' ? FournisseurMapper.mapFournisseur(obj.fournisseurArticle) : createDefaultFournisseur({id: parseInt(obj.fournisseurArticle.split('/')[3])}) : createDefaultFournisseur(),
            couches: obj?.articleCouchesArticle ? obj.articleCouchesArticle.map((ac: string | object) => typeof ac === 'object' ? ArticleCouchemapper.mapArticleCouche(ac) : createDefaultArticleCouche({id: parseInt(ac.split("/")[3])})) : [],
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
            articleCouchesArticle: obj.couches.map((ac: ArticleCouche) => "/api/article_couches/" + ac.id)
        }
    }

    static mapArrayArticles(dataArray: any): Articles[] {
        return dataArray.map(this.mapArticles);
    }
}