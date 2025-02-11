import {Commande} from "@/models/types/commande";
import {createDefaultAffaire} from "@/models/types/affaire";
import {createDefaultSysteme} from "@/models/types/systeme";
import {Commandes} from "@/models/objectsApi/Commandes";

export default class Commandemapper{
    static mapCommande(obj: Commandes): Commande {
        console.log(obj);
        return {
            id: obj.id,
            eureka: obj.eurekaCommande,
            commentaire: obj.commentaireCommande,
            surface: parseFloat(obj.surfaceCommande),
            regieSFP: parseFloat(obj.regieSFPCommande),
            regieFP: parseFloat(obj.regieFPCommande),
            ficheH: obj.ficheHCommande,
            pvPeinture: obj.pvPeintureCommande,
            affaire: createDefaultAffaire({id: parseInt(obj.affaireCommande.split("/")[3])}),
            systeme: createDefaultSysteme({id: parseInt(obj.systemeCommande.split("/")[3])}),
            demandes: [],
            articles: []
        }
    }

    static mapArrayCommande(dataArray: Commandes[]): Commande[]{
        return dataArray.map(this.mapCommande);
    }

    static mapCommandes(obj: Commande): Commandes {
        return {
            id: obj.id,
            eurekaCommande: obj.eureka,
            commentaireCommande: obj.commentaire,
            surfaceCommande: String(obj.surface).replace(/,/g, '.'),
            regieSFPCommande: String(obj.regieSFP).replace(/,/g, '.'),
            regieFPCommande: String(obj.regieFP).replace(/,/g, '.'),
            ficheHCommande: obj.ficheH,
            pvPeintureCommande: obj.pvPeinture,
            affaireCommande: "/api/affaires/" + obj.affaire.id,
            systemeCommande: "/api/systemes/" + obj.systeme.id
        }
    }

    static mapArrayCommandes(dataArray: Commande[]): Commandes[]{
        return dataArray.map(this.mapCommandes);
    }
}