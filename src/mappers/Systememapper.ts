import {Systeme} from "@/models/types/systeme";
import {Systemes} from "@/models/objectsApi/Systemes";
import {createDefaultGrenaillage, Grenaillage} from "@/models/types/Grenaillage";
import {createDefaultFournisseur, Fournisseur} from "@/models/types/fournisseur";
import FournisseurMapper from "@/mappers/FournisseurMapper";
import Commandemapper from "@/mappers/Commandemapper";
import Couchemapper from "@/mappers/Couchemapper";
import Grenaillagemapper from "@/mappers/Grenaillagemapper";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import {Couche, createDefaultCouche} from "@/models/types/couche";



export default class Systememapper {
    static mapSysteme(obj: Systemes): Systeme {
        return {
            id: obj?.id ?? 0,
            nom: obj?.nomSysteme ?? "",
            fournisseur: obj?.fournisseurSysteme ? typeof obj.fournisseurSysteme === 'object' ? FournisseurMapper.mapFournisseur(obj.fournisseurSysteme) : createDefaultFournisseur({id: parseInt(obj.fournisseurSysteme?.split('/')[3])}) : createDefaultFournisseur(),
            type: obj?.typeSysteme ?? "",
            grenaillage: obj?.grenaillageSysteme ? typeof obj.grenaillageSysteme === 'object' ? Grenaillagemapper.mapGrenaillage(obj.grenaillageSysteme) : createDefaultGrenaillage({id: parseInt(obj.grenaillageSysteme?.split('/')[3])}) : createDefaultGrenaillage(),
            refieFP: parseFloat(obj?.refieFPSysteme ?? "0"),
            refieSFP: parseFloat(obj?.regieSFPSysteme ?? "0"),
            commandes: obj?.commandesSysteme ? obj.commandesSysteme.map((c: string | object) => typeof c === 'object' ? Commandemapper.mapCommande(c) : createDefaultCommande({id: parseInt(c.split("T")[3])})) : [],
            couches: obj?.couchesSysteme ? obj.couchesSysteme.map((c: string | object) => typeof c === 'object' ? Couchemapper.mapCouche(c) : createDefaultCouche({id: parseInt(c.split("T")[3])})) : [],
        }
    }

    static mapArraySysteme(dataArray: Systemes[]): Systeme[] {
        return dataArray.map(this.mapSysteme);
    }

    static mapSystemes(obj: Systeme): Systemes {
        return {
            id: obj.id,
            nomSysteme: obj.nom,
            fournisseurSysteme: "/api/fournisseurs/" + obj.fournisseur.id,
            typeSysteme: obj.type,
            grenaillageSysteme: obj.grenaillage? "/api/grenaillages/" + obj.grenaillage.id : null,
            refieFPSysteme: String(obj.refieFP).replace(/,/g, '.'),
            regieSFPSysteme: String(obj.refieSFP).replace(/,/g, '.'),
            commandesSysteme: obj.commandes.map((commande: Commande) => "/api/commandes/" + commande.id),
            couchesSysteme: obj.couches.map((couche: Couche) => "/api/couches/" + couche.id),
        }
    }

    static mapArraySystemes(dataArray: Systeme[]): Systemes[] {
        return dataArray.map(this.mapSystemes);
    }
}