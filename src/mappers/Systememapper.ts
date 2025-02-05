import {createDefaultSysteme, Systeme} from "@/models/types/systeme";
import {Systemes} from "@/models/objectsApi/Systemes";
import {createDefaultAffaire} from "@/models/types/affaire";
import {createDefaultGrenaillage} from "@/models/types/Grenaillage";

export default class Systememapper {
    static mapSysteme(obj: Systemes): Systeme {
        console.log(obj);
        return {
            id: obj.id,
            nomSysteme: obj.nomSysteme,
            fournisseurSysteme: obj.fournisseurSysteme,
            grenaillageSysteme: createDefaultGrenaillage({id: parseInt(obj.grenaillageSysteme.split('/')[3])}),
            refieFPSysteme: parseFloat(obj.refieFPSysteme),
            refieSFPSysteme: parseFloat(obj.regieSFPSysteme),
            commandeSysteme: [],
            coucheSysteme: []
        }
    }

    static mapArraySysteme(dataArray: Systemes[]): Systeme[] {
        return dataArray.map(this.mapSysteme);
    }

    static mapSystemes(obj: Systeme): Systemes {
        return {
            id: obj.id,
            nomSysteme: obj.nomSysteme,
            fournisseurSysteme: obj.fournisseurSysteme,
            grenaillageSysteme: "/api/grenaillages/" + obj.grenaillageSysteme.id,
            refieFPSysteme: String(obj.refieFPSysteme).replace(/,/g, '.'),
            regieSFPSysteme: String(obj.refieSFPSysteme).replace(/,/g, '.'),
        }
    }

    static mapArraySystemes(dataArray: Systeme[]): Systemes[] {
        return dataArray.map(this.mapSystemes);
    }
}