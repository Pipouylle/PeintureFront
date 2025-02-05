import {Commande} from "@/models/types/commande";
import {Affaire, createDefaultAffaire} from "@/models/types/affaire";
import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Demande} from "@/models/types/demande";
import {Commandes} from "@/models/objectsApi/Commandes";

export default class Commandemapper{
    static mapCommande(obj: Commandes): Commande {
        return {
            id: obj.id,
            numeroCommande: obj.numeroCommande,
            eurekaCommande: obj.eurekaCommande,
            commentaireCommande: obj.commentaireCommande,
            surfaceCommande: parseFloat(obj.surfaceCommande),
            regieSFPCommande: parseFloat(obj.regieSFPCommande),
            regieFPCommande: parseFloat(obj.regieFPCommande),
            ficheHcommande: obj.ficheHCommande,
            tarifFicheHCommande: parseFloat(obj.tarifFicheHCommande),
            idAffaireCommande: createDefaultAffaire({id: parseInt(obj.affaireCommande.split("/")[3])}),
            idSystemeCommande: createDefaultSysteme({id: parseInt(obj.systemeCommande.split("/")[3])}),
            demandeCommande: []
        }
    }

    static mapArrayCommande(dataArray: Commandes[]): Commande[]{
        return dataArray.map(this.mapCommande);
    }

    static mapCommandes(obj: Commande): Commandes {
        return {
            id: obj.id,
            numeroCommande: obj.numeroCommande,
            eurekaCommande: obj.eurekaCommande,
            commentaireCommande: obj.commentaireCommande,
            surfaceCommande: String(obj.surfaceCommande).replace(/,/g, '.'),
            regieSFPCommande: String(obj.regieSFPCommande).replace(/,/g, '.'),
            regieFPCommande: String(obj.regieFPCommande).replace(/,/g, '.'),
            ficheHCommande: obj.ficheHcommande,
            tarifFicheHCommande: String(obj.tarifFicheHCommande).replace(/,/g, '.'),
            affaireCommande: "/api/affaires/" + obj.idAffaireCommande.id,
            systemeCommande: "/api/systemes/" + obj.idSystemeCommande.id
        }
    }

    static mapArrayCommandes(dataArray: Commande[]): Commandes[]{
        return dataArray.map(this.mapCommandes);
    }
}