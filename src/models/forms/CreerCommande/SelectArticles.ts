import {Selected} from "@/models/common/Selected";

export interface SelectArticles {
    id: number;
    article: Selected | null;
}

export function createDefaultSelectArticles(override: Partial<SelectArticles> = {}): SelectArticles {
    return {
        id: 0,
        article: {"title" : "", "value" : 0},
        ...override
    }
}