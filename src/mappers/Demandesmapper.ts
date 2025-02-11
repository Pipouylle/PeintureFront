import {Demande} from '@/models/types/demande';
import {Demandes} from "@/models/objectsApi/Demandes";
import {createDefaultCommande} from "@/models/types/commande";

export default class Demandesmapper {
    static mapDemande(obj: Demandes): Demande {
        return {
            id: obj.id,
            numero: obj.numeroDemande,
            etat: obj.etatDemande,
            date: obj.dateDemande,
            nombrePiece: obj.nombrePieceDemande,
            commande: createDefaultCommande({id: parseInt(obj.commandeDemande.split("/")[3])}),
            surface: parseFloat(obj.surfaceDemande),
            ofs: []
        }
    }

    static mapArrayDemande(dataArray: Demandes[]): Demande[] {
        return dataArray.map(this.mapDemande);
    }

    static mapDemandes(obj: Demande): Demandes {
        return {
            id: obj.id,
            numeroDemande: obj.numero,
            commandeDemande: "/api/commandes/" + obj.commande.id,
            dateDemande: obj.date,
            nombrePieceDemande: obj.nombrePiece,
            surfaceDemande: String(obj.surface).replace(/,/g, '.'),
            etatDemande: obj.etat,
        }
    }

    static mapArrayDemandes(dataArray: Demande[]): Demandes[] {
        return dataArray.map(this.mapDemandes);
    }
}