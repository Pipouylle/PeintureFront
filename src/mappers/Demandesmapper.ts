import {Demande} from '@/models/types/demande';
import {Demandes} from "@/models/objectsApi/Demandes";
import {Commande, createDefaultCommande} from "@/models/types/commande";

export default class Demandesmapper {
    static mapDemande(obj: Demandes): Demande {
        return {
            id: obj.id,
            numeroDemande: obj.numeroDemande,
            numeroPhaseDemande: obj.numeroPhaseDemande,
            etatDemande: obj.etatDemande,
            nombrePieceDemande: obj.nombrePieceDemande,
            idCommandeDemande: createDefaultCommande({id: parseInt(obj.commandeDemande.split("/")[3])}),
            surfaceDemande: parseFloat(obj.surfaceDemande),
            ofDemande: []
        }
    }

    static mapArrayDemande(dataArray: Demandes[]): Demande[] {
        return dataArray.map(this.mapDemande);
    }

    static mapDemandes(obj: Demande): Demandes {
        return {
            id: obj.id,
            numeroDemande: obj.numeroDemande,
            numeroPhaseDemande: obj.numeroPhaseDemande,
            commandeDemande: "/api/commandes/" + obj.idCommandeDemande.id,
            nombrePieceDemande: obj.nombrePieceDemande,
            surfaceDemande: String(obj.surfaceDemande).replace(/,/g, '.'),
            etatDemande: obj.etatDemande,
        }
    }

    static mapArrayDemandes(dataArray: Demande[]): Demandes[] {
        return dataArray.map(this.mapDemandes);
    }
}