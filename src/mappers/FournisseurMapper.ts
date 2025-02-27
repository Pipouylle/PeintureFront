import {Fournisseur} from "@/models/types/fournisseur";
import {Fournisseurs} from "@/models/objectsApi/Fournisseurs";

export default class FournisseurMapper {
    static mapFournisseur (data: Fournisseurs): Fournisseur {
        return {
            id: data.id,
            nom: data.nomFournisseur,
            systemes: [],
            articles: [],
        };
    }
    static mapArraysFournisseur (dataArray: Fournisseurs[]): Fournisseur[] {
        return dataArray.map(this.mapFournisseur);
    }
    static mapFournisseurs (data: Fournisseur): any {
        return {
            id: data.id,
            nomFournisseur: data.nom,
        };
    }
    static mapArrayFournisseurs (dataArray: Fournisseur[]): any {
        return dataArray.map(this.mapFournisseurs);
    }

}