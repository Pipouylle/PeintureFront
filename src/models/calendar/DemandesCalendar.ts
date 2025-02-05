export interface DemandesCalendar {
    "idDemande": number,
    "numeroDemande": string,
    "numeroPhaseDemande": string,
    "idAffaire": number,
    "numeroAffaire": string,
    "nomAffaire": string,
    "idSysteme": number,
    "nomSysteme": string,
    "surfaceDemande": string,
    "nombrePieceDemande": number,
    "etatDemande": string,
    "avancementTotal": string
}

export function createDefaultDemandesCalendar(override : Partial<DemandesCalendar> = {}) : DemandesCalendar {
    return {
        "idDemande": 0,
        "numeroDemande": "",
        "numeroPhaseDemande" : "",
        "idAffaire": 0,
        "numeroAffaire": "",
        "nomAffaire": "",
        "idSysteme": 0,
        "nomSysteme": "",
        "surfaceDemande": "",
        "nombrePieceDemande": 0,
        "etatDemande": "string",
        "avancementTotal": "",
        ...override
    }

}