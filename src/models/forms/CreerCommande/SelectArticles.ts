export interface SelectArticles {
    id: number;
    article: {"title" : string, "value" : number} | null;
}

export function createDefaultSelectArticles(override: Partial<SelectArticles> = {}): SelectArticles {
    return {
        id: 0,
        article: {"title" : "", "value" : 0},
        ...override
    }
}