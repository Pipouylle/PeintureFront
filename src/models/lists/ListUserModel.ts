import {User} from '@/models/types/user'

export interface ListUserModel {
    users: User[];
    filter: string;
}

export function createDefaultListUserModel(overrides: Partial<ListUserModel> = {}): ListUserModel {
    return {
        users: [],
        filter: '',
        ...overrides
    }
}