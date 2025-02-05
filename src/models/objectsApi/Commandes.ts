export interface Commandes {
    "id": number,
    "numeroCommande": string,
    "affaireCommande": string, // Affaire.id
    "systemeCommande": string, // Systeme.id
    "eurekaCommande": string,
    "commentaireCommande": string,
    "surfaceCommande": string,
    "regieSFPCommande": string,
    "regieFPCommande": string,
    "ficheHCommande": boolean,
    tarifFicheHCommande: string,
}