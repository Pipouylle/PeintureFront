import {Consommation} from "@/models/types/consommation";
import {Consommations} from "@/models/objectsApi/Consommations";
import {createDefaultArticle} from "@/models/types/article";
import {createDefaultOf} from "@/models/types/of";

export default class Consommationsmapper {
    static mapConsommation(obj: Consommations): Consommation {
        console.log(obj);
        return {
            id: obj.id,
            article: createDefaultArticle({id: parseInt(obj.articleConsommation.split("/")[3])}) ?? createDefaultArticle(),
            of: createDefaultOf({id: parseInt(obj.ofConsommation.split("/")[3])}) ?? createDefaultOf(),
            quantiter: obj.quantiterConsommation,
        }
    }

    static mapArrayConsommation(dataArray: Consommations[]): Consommation[] {
        return dataArray.map(this.mapConsommation);
    }

    static mapConsommations(obj: Consommation): Consommations {
        return {
            id: obj.id,
            articleConsommation: "/api/articles/" + obj.article.id,
            ofConsommation: '/api/o_fs/' + obj.of.id,
            quantiterConsommation: obj.quantiter,
        }
    }
    static mapArrayConsommations(dataArray: Consommation[]): Consommations[] {
        return dataArray.map(this.mapConsommations);
    }

}