import {Systeme} from "@/models/types/systeme";
import {Systemes} from "@/models/objectsApi/Systemes";
import {createDefaultGrenaillage} from "@/models/types/Grenaillage";
import {createDefaultFournisseur} from "@/models/types/fournisseur";

export default class Systememapper {
    static mapSysteme(obj: Systemes): Systeme {
        return {
            id: obj.id,
            nom: obj.nomSysteme,
            fournisseur: obj.fournisseurSysteme ? createDefaultFournisseur({id: parseInt(obj.fournisseurSysteme?.split('/')[3])}) : createDefaultFournisseur(),
            type: obj.typeSysteme,
            grenaillage: obj.grenaillageSysteme ? createDefaultGrenaillage({id: parseInt(obj.grenaillageSysteme?.split('/')[3])}) : createDefaultGrenaillage(),
            refieFP: parseFloat(obj.refieFPSysteme),
            refieSFP: parseFloat(obj.regieSFPSysteme),
            commandes: [],
            couches: []
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
        }
    }

    static mapArraySystemes(dataArray: Systeme[]): Systemes[] {
        return dataArray.map(this.mapSystemes);
    }
}