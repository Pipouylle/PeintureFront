import {CommandesAffairesSystemes} from "@/models/objectsApi/CommandesAffairesSystemes";

export interface DemandeFormModel {
    header: any,
    numeroDemande: string,
    numeroPhase: string,
    commandeItem: CommandesAffairesSystemes[],
    selectedCommande: CommandesAffairesSystemes | null,
    surfaceDemande: number,
}

export function createDefaultDemandeFormModel(override: Partial<DemandeFormModel> = {}): DemandeFormModel {
    return {
        header: [{text: 'Numéro Commande', value: 'eurekaCommande'},
            {text: 'Numéro Affaire', value: 'numeroAffaire'},
            {text: 'nom Affaire', value: 'nomAffaire'},
            {text: 'Nom Syteme', value: 'nomSysteme'},
            {text: 'Commentaire', value: 'commentaireCommande'},
            {text: 'RegieSFR', value: 'regieSFPCommande'},
            {text: 'RegieFP', value: 'regieFPCommande'},
            {text: 'fiche H', value: 'ficheHCommande'},
        ],
        numeroDemande: '',
        numeroPhase: '',
        commandeItem: [],
        selectedCommande: null,
        surfaceDemande: 0,
        ...override
    }
}