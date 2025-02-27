export interface Selected {
    title: string;
    value: number;
}

export function createDefaultSelected(override: Partial<Selected> = {}): Selected {
    return {
        title: "",
        value: 0,
        ...override
    }
}