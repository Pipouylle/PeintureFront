import {apiClient, apiClientPatch} from "@/stores/apiClient";
import Usermapper from "@/mappers/Usermapper";
import {User} from "@/models/types/user";
import {Users} from "@/models/objectsApi/Users";
import {ApiResponseCollection} from "@/models/common/ApiResponseCollection";

export const getAllUser = async (): Promise<User[]> => {
    try {
        const response = await apiClient.get<ApiResponseCollection>("/users");
        return Usermapper.mapArrayUser(response.data.member);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const creerUser = async (user: User): Promise<User> => {
    try {
        const users = Usermapper.mapUsers(user);
        const response = await apiClient.post<Users>("/users", users);
        return Usermapper.mapUser(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateUser = async (user: User): Promise<User> => {
    try {
        const users = Usermapper.mapUsers(user);
        const response = await apiClientPatch.patch(`/users/${user.id}`, users);
        return Usermapper.mapUser(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
}