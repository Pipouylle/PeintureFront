export interface DemandesCalendar {
    "idDemande": number,
    "numeroDemande": string,
    "numeroPhaseDemande": string,
    "color": string,
    "idAffaire": number,
    "dateDemande": string,
    "numeroAffaire": string,
    "nomAffaire": string,
    "idSysteme": number,
    "nomSysteme": string,
    "surfaceDemande": string,
    "nombrePieceDemande": number,
    "commentaireDemande": string,
    "etatDemande": string,
    "avancementTotal": string
}

export function createDefaultDemandesCalendar(override : Partial<DemandesCalendar> = {}) : DemandesCalendar {
    return {
        "idDemande": 0,
        "numeroDemande": "",
        "color": getRandomColor(),
        "numeroPhaseDemande" : "",
        "dateDemande": "",
        "idAffaire": 0,
        "numeroAffaire": "",
        "nomAffaire": "",
        "idSysteme": 0,
        "nomSysteme": "",
        "surfaceDemande": "",
        "commentaireDemande": "",
        "nombrePieceDemande": 0,
        "etatDemande": "string",
        "avancementTotal": "",
        ...override
    }
}


//TODO : les mettre en bd
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}