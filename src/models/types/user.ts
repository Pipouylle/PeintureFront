import { Stock } from "./stock";
export interface User {
    id: number,
    name: string,
    archive: boolean,
    stocks: Stock[]
}

export function createDefaultUser(overrides: Partial<User> = {}): User {
    return {
        id: 0,
        name: "",
        archive: false,
        stocks: [],
        ...overrides
    };
}