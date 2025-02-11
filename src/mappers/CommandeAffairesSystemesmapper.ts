import {CommandesAffairesSystemes} from "@/models/objectsApi/CommandesAffairesSystemes";

export class CommandeAffairesSystemesmapper {
    static mapCommandeAffairesSystemes(data: any): CommandesAffairesSystemes {
        return {
            idCommande: data.idCommande,
            eurekaCommande: data.eurekaCommande,
            idAffaireCommande: data.idAffaireCommande,
            numeroAffaire: data.numeroAffaire,
            nomAffaire: data.nomAffaire,
            idSystemeCommande: data.idSystemeCommande,
            nomSysteme: data.nomSysteme,
            commentaireCommande: data.commentaireCommande,
            regieSFPCommande: data.regieSFPCommande,
            regieFPCommande: data.regieFPCommande,
            ficheHCommande: data.ficheHCommande,
            pvPeintureCommande: data.tarifFichehCommande
        };
    }

    static mapArrayCommandeAffairesSystemes(dataArray: any): CommandesAffairesSystemes[] {
        return dataArray.map(this.mapCommandeAffairesSystemes);
    }
}