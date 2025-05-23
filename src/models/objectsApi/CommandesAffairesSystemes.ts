export interface CommandesAffairesSystemes {
    "idCommande": number,
    "eurekaCommande": string,
    "idAffaireCommande": number,
    "numeroAffaire": string,
    "nomAffaire": string,
    "idSystemeCommande": number,
    "nomSysteme": string,
    "commentaireCommande": string,
    "regieSFPCommande": string,
    "regieFPCommande": string,
    "ficheHCommande": boolean,
    "tarifFichehCommande": string
}

function createDefaultCommandesAffairesSystemes (overrides: Partial<CommandesAffairesSystemes> = {}): CommandesAffairesSystemes {
    return {
        "idCommande": 0,
        "eurekaCommande": "",
        "idAffaireCommande": 0,
        "numeroAffaire": "",
        "nomAffaire": "",
        "idSystemeCommande": 0,
        "nomSysteme": "",
        "commentaireCommande": "",
        "regieSFPCommande": "",
        "regieFPCommande": "",
        "ficheHCommande": false,
        "tarifFichehCommande": "0",
        ...overrides
    };
}