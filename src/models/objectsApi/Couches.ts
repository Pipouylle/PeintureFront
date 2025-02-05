import {Articles} from "@/models/objectsApi/Articles";
import {Systemes} from "@/models/objectsApi/Systemes";

export interface Couches {
    "id": number,
    "epaisseurCouche": string,
    "tarifCouche": string,
    "ArticleCouche": string,
    "SystemeCouche": string,
}