import {Fournisseur} from "@/models/types/fournisseur";
import {Fournisseurs} from "@/models/objectsApi/Fournisseurs";
import {Systeme, createDefaultSysteme} from "@/models/types/systeme";
import {Article, createDefaultArticle} from "@/models/types/article";
import SystemeMapper from "@/mappers/Systememapper";
import ArticleMapper from "@/mappers/Articlemapper";

export default class FournisseurMapper {
    static mapFournisseur (obj: Fournisseurs): Fournisseur {
        return {
            id: obj?.id ?? 0,
            nom: obj?.nomFournisseur ?? "",
            systemes: obj?.systemesFournisseur ? obj.systemesFournisseur.map((systeme: string | object) => typeof systeme === 'object' ? SystemeMapper.mapSysteme(systeme) : createDefaultSysteme({id: parseInt(systeme.split("T")[3])})) : [],
            articles: obj?.articlesFournisseur ? obj.articlesFournisseur.map((article: string | object) => typeof article === 'object' ? ArticleMapper.mapArticle(article) : createDefaultArticle({id: parseInt(article.split("T")[3])})) : [],
        };
    }
    static mapArraysFournisseur (dataArray: Fournisseurs[]): Fournisseur[] {
        return dataArray.map(this.mapFournisseur);
    }
    static mapFournisseurs (obj: Fournisseur): any {
        return {
            id: obj.id,
            nomFournisseur: obj.nom,
            systemesFournisseur: obj.systemes.map((systeme: Systeme) => "/api/systemes/" + systeme.id),
            articlesFournisseur: obj.articles.map((article: Article) => "/api/articles/" + article.id),
        };
    }
    static mapArrayFournisseurs (dataArray: Fournisseur[]): any {
        return dataArray.map(this.mapFournisseurs);
    }

}