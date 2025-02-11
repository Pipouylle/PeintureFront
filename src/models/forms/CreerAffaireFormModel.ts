export interface CreerAffaireFormModel {
    nomAffaire: string;
    numeroAffaire: string;
}

export function createCreerAffaireFormModel(overrrides: Partial<CreerAffaireFormModel> = {}): CreerAffaireFormModel {
    return {
        nomAffaire: '',
        numeroAffaire: '',
        ...overrrides
    };
}