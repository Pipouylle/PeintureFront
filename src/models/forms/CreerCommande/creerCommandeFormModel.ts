import {Article} from "@/models/types/article";

export interface CreerCommandeFormModel {
    articles : Article[];
}

export function createDefaultCreerCommandeFormModel(override: Partial<CreerCommandeFormModel> = {}): CreerCommandeFormModel {
    return {
        articles: [],
        ...override,
    };
}