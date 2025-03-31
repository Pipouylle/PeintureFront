import {Commande} from "@/models/types/commande";
import {createDefaultAffaire} from "@/models/types/affaire";
import {createDefaultSysteme} from "@/models/types/systeme";
import {Commandes} from "@/models/objectsApi/Commandes";
import {ArticleCouche, createDefaultArticleCouche} from "@/models/types/articleCouche";
import {Demande, createDefaultDemande} from "@/models/types/demande";
import Affairemappers from "@/mappers/Affairemappers";
import Systememapper from "@/mappers/Systememapper";
import DemandeMapper from "@/mappers/Demandesmapper";
import ArticleCouchemapper from "@/mappers/ArticleCouchemapper";


export default class Commandemapper {
    static mapCommande(obj: Commandes): Commande {
        return {
            id: obj?.id ?? 0,
            eureka: obj?.eurekaCommande ?? "",
            commentaire: obj?.commentaireCommande ?? "",
            surface: parseFloat(obj?.surfaceCommande ?? "0"),
            ficheH: obj?.ficheHCommande ?? false,
            pvPeinture: obj?.pvPeintureCommande ?? false,
            regieSFP: parseFloat(obj?.regieSFPCommande ?? "0"),
            regieFP: parseFloat(obj?.regieFPCommande ?? "0"),
            grenaillage: parseFloat(obj?.grenaillageCommande ?? "0"),
            ral: obj?.ralCommande ?? 0,
            affaire: obj?.affaireCommande ? typeof obj.affaireCommande === 'object' ? Affairemappers.mapAffaire(obj.affaireCommande) : createDefaultAffaire({id: parseInt(obj.affaireCommande.split("/")[3])}) : createDefaultAffaire(),
            systeme: obj?.systemeCommande ? typeof obj.systemeCommande === 'object' ? Systememapper.mapSysteme(obj.systemeCommande) : createDefaultSysteme({id: parseInt(obj.systemeCommande.split("/")[3])}) : createDefaultSysteme(),
            demandes: obj?.demandesCommande ? obj.demandesCommande.map((demande: string | object) => typeof demande === 'object' ? DemandeMapper.mapDemande(demande) : createDefaultDemande({id: parseInt(demande.split("T")[3])})) : [],
            articles: obj?.articleCouchesCommande ? obj.articleCouchesCommande.map((article: string | object) => typeof article === 'object' ? ArticleCouchemapper.mapArticleCouche(article) : createDefaultArticleCouche({id: parseInt(article.split("/")[3])})) : []
        }
    }

    static mapArrayCommande(dataArray: Commandes[]): Commande[] {
        return dataArray.map(this.mapCommande);
    }

    static mapCommandes(obj: Commande): Commandes {
        return {
            id: obj.id,
            eurekaCommande: obj.eureka,
            commentaireCommande: obj.commentaire,
            surfaceCommande: String(obj.surface).replace(/,/g, '.'),
            ficheHCommande: obj.ficheH,
            pvPeintureCommande: obj.pvPeinture,
            affaireCommande: "/api/affaires/" + obj.affaire.id,
            systemeCommande: "/api/systemes/" + obj.systeme.id,
            regieSFPCommande: String(obj.regieSFP).replace(/,/g, '.'),
            regieFPCommande: String(obj.regieFP).replace(/,/g, '.'),
            grenaillageCommande: String(obj.grenaillage).replace(/,/g, '.'),
            ralCommande: obj.ral,
            articleCouchesCommande: obj.articles.map((article: ArticleCouche) => "/api/article_couches/" + article.id),
            demandesCommande: obj.demandes.map((demande: Demande) => "/api/demandes/" + demande.id)
        }
    }

    static mapArrayCommandes(dataArray: Commande[]): Commandes[] {
        return dataArray.map(this.mapCommandes);
    }
}