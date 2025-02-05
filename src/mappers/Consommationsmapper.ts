import {Consommation} from "@/models/types/consommation";
import {Consommations} from "@/models/objectsApi/Consommations";
import {createDefaultArticle} from "@/models/types/article";
import {createDefaultOf} from "@/models/types/of";

export default class Consommationsmapper {
    static mapConsommation(obj: Consommations): Consommation {
        return {
            id: obj.id,
            codeArticleConsommation: createDefaultArticle({id: parseInt(obj.articleConsommation.split("/")[3])}),
            idOfConsommation: createDefaultOf({id: parseInt(obj.ofConsommation.split("/")[3])}),
            quantiterConsommation: obj.quantiterConsommation,
        }
    }

    static mapArrayConsommation(dataArray: Consommations[]): Consommation[] {
        return dataArray.map(this.mapConsommation);
    }

    static mapConsommations(obj: Consommation): Consommations {
        return {
            id: obj.id,
            articleConsommation: "/api/consommations/" + obj.codeArticleConsommation.id,
            ofConsommation: '/api/o_fs/' + obj.idOfConsommation.id,
            quantiterConsommation: obj.quantiterConsommation,
        }
    }
    static mapArrayConsommations(dataArray: Consommation[]): Consommations[] {
        return dataArray.map(this.mapConsommations);
    }

}