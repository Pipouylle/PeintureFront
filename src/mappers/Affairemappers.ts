import {Affaire} from "@/models/types/affaire";
import {Affaires} from "@/models/objectsApi/Affaires";
import {Commandes} from "@/models/objectsApi/Commandes";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import Commandemapper from "@/mappers/Commandemapper";

export default class Affairemappers {
    static mapAffaire(obj: Affaires): Affaire {
        return {
            id: obj?.id ?? 0,
            numero: obj?.numeroAffaire ?? "",
            nom: obj?.nomAffaire ?? "",
            commandes: obj?.commandesAffaire ? obj.commandesAffaire.map((commande: string | object) => typeof commande === 'object' ? Commandemapper.mapCommande(commande) : createDefaultCommande({id: parseInt(commande.split("/")[3])})) : [],
        }
    }

    static mapArrayAffaire(dataArray: any): Affaire[] {
        return dataArray.map(this.mapAffaire);
    }

    static mapAffaires(obj: any): Affaires {
        return {
            id: obj.id,
            numeroAffaire: obj.numero,
            nomAffaire: obj.nom,
            commandesAffaire: obj.commandes.map((commande: Commande) => "/api/commandes/" + commande.id)
        }
    }
    static mapArrayAffaires(dataArray: any): Affaires[] {
        return dataArray.map(this.mapAffaires);
    }
}
