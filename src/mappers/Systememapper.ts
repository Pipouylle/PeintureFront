import {Systeme} from "@/models/types/systeme";
import {Systemes} from "@/models/objectsApi/Systemes";
import {createDefaultGrenaillage} from "@/models/types/Grenaillage";

export default class Systememapper {
    static mapSysteme(obj: Systemes): Systeme {
        return {
            id: obj.id,
            nom: obj.nomSysteme,
            fournisseur: obj.fournisseurSysteme,
            grenaillage: createDefaultGrenaillage({id: parseInt(obj.grenaillageSysteme.split('/')[3])}),
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
            fournisseurSysteme: obj.fournisseur,
            grenaillageSysteme: obj.grenaillage? "/api/grenaillages/" + obj.grenaillage.id : "",
            refieFPSysteme: String(obj.refieFP).replace(/,/g, '.'),
            regieSFPSysteme: String(obj.refieSFP).replace(/,/g, '.'),
        }
    }

    static mapArraySystemes(dataArray: Systeme[]): Systemes[] {
        return dataArray.map(this.mapSystemes);
    }
}