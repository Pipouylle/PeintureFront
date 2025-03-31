import {Demande} from '@/models/types/demande';
import {Demandes} from "@/models/objectsApi/Demandes";
import {createDefaultCommande} from "@/models/types/commande";
import Commandemapper from "@/mappers/Commandemapper";
import Ofsmapper from "@/mappers/Ofsmapper";
import {createDefaultOf} from "@/models/types/of";
import SurfaceCouchemapper from "@/mappers/SurfaceCouchemapper";
import {createDefaultSurfaceCouche, SurfaceCouche} from "@/models/types/surfaceCouche";

export default class Demandesmapper {
    static mapDemande(obj: any): Demande {
        return {
            id: obj?.id ?? 0,
            numero: obj?.numeroDemande ?? "0",
            etat: obj?.etatDemande ?? "",
            date: obj?.dateDemande ?? "",
            commentaire: obj?.commentaireDemande ?? "",
            reservation: obj?.reservationPeintureDemande ?? false,
            nombrePiece: obj?.nombrePieceDemande ?? 0,
            commande: obj?.commandeDemande ? typeof obj.commandeDemande === 'object' ? Commandemapper.mapCommande(obj.commandeDemande) : createDefaultCommande({id: parseInt(obj.commandeDemande.split("/")[3])}) : createDefaultCommande(),
            surface: obj?.surfaceDemande ? parseFloat(obj.surfaceDemande) : 0,
            ofs: obj?.OfDemande ? obj.OfDemande.map((of: object | string) => typeof of === 'object' ? Ofsmapper.mapOf(of) : createDefaultOf({id: parseInt(of.split("/")[3])})) : [],
            surfaceCouches: obj?.surfaceCouchesDemande ? obj.surfaceCouchesDemande.map((sc: object | string) => typeof sc === 'object' ? SurfaceCouchemapper.mapSurfaceCouche(sc) : createDefaultSurfaceCouche({id: parseInt(sc.split("/")[3])})) : []
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
            reservationPeintureDemande: obj.reservation,
            commentaireDemande: obj.commentaire,
            dateDemande: obj.date,
            nombrePieceDemande: obj.nombrePiece,
            surfaceDemande: String(obj.surface).replace(/,/g, '.'),
            etatDemande: obj.etat,
            surfaceCouchesDemande: obj.surfaceCouches.map((sc: SurfaceCouche) => "/api/surface_couches/" + sc.id),
        }
    }

    static mapArrayDemandes(dataArray: Demande[]): Demandes[] {
        return dataArray.map(this.mapDemandes);
    }
}