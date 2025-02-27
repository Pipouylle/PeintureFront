export interface User {
    id: number,
    name: string,
}

export function createDefaultUser(overrides: Partial<User> = {}): User {
    return {
        id: 0,
        name: "",
        ...overrides
    };
}