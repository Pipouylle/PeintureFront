export interface Commandes {
    "id"?: number,
    "affaireCommande"?: string | object, // Affaire.id
    "systemeCommande"?: string | object, // Systeme.id
    "eurekaCommande"?: string,
    "commentaireCommande"?: string,
    "surfaceCommande"?: string,
    "ficheHCommande"?: boolean,
    "pvPeintureCommande"?: boolean,
    "regieSFPCommande"?: string,
    "regieFPCommande"?: string,
    "grenaillageCommande"?: string,
    "ralCommande"?: number,
    "demandesCommande"?: any[],
    "articleCouchesCommande"?: any[],
}