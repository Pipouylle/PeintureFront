import {Users} from "@/models/objectsApi/Users";
import {User} from "@/models/types/user";

export default class Usermapper {
    public static mapUser(data: Users): User {
        return {
            id: data.id,
            name: data.nameUsers
        }
    }

    public static mapArrayUser(data: Users[]): User[] {
        return data.map(Usermapper.mapUser);
    }

    public static mapUsers(data: User): Users {
        return {
            id: data.id,
            nameUsers: data.name
        }
    }

    public static mapArrayUsers(data: User[]): Users[] {
        return data.map(Usermapper.mapUsers);
    }
}