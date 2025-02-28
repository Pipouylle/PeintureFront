import {ArticleCouches} from "@/models/objectsApi/ArticleCouches";
import {ArticleCouche} from "@/models/types/articleCouche";
import {Couche, createDefaultCouche} from "@/models/types/couche";
import {Commande, createDefaultCommande} from "@/models/types/commande";
import Articlemapper from "@/mappers/Articlemapper";

export class ArticleCouchemapper {
    static mapArticleCouche(obj: ArticleCouches): ArticleCouche {
        let couche: Couche;
        let commande: Commande;
        try {
            couche = createDefaultCouche({ id : parseInt(obj.coucheArticleCouche.split("/")[3])});
            commande = createDefaultCommande({ id : parseInt(obj.commandeArticleCouche.split("/")[3])});
        } catch (error) {
            couche = createDefaultCouche();
            commande = createDefaultCommande();
        }
        return {
            id: obj.id,
            tarif: parseFloat(obj.tarifArticleCouche),
            couche: couche,
            commande: commande,
            articles: [],
            surfaces: [],
        }
    }

    static mapArrayArticleCouche(dataArray: ArticleCouches[]): ArticleCouche[]{
        return dataArray.map(this.mapArticleCouche);
    }

    static mapArticleCouches(obj: ArticleCouche): ArticleCouches {
        return {
            id: obj.id,
            tarifArticleCouche: String(obj.tarif).replace(/,/g, '.'),
            coucheArticleCouche: "/api/couches/" + obj.couche.id,
            commandeArticleCouche: "/api/commandes/" + obj.commande.id,
        }
    }

    static mapArrayArticleCouches(dataArray: ArticleCouche[]): ArticleCouches[]{
        return dataArray.map(this.mapArticleCouches);
    }
}