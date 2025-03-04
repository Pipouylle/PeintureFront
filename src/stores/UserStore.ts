import {defineStore} from "pinia";
import {useAlert} from "@/stores/index"
import {User, createDefaultUser} from "@/models/types/user"
import {getAllUser, getAllUserArchived, getAllUserNotArchived, updateUser, creerUser} from "@/services/UserService"
import {ListUserModel, createDefaultListUserModel} from "@/models/lists/ListUserModel"


export function useUserStore() {
    return listUserStore();
}
export const listUserStore = defineStore("listUserStore", {
    state: () => ({
        listUser: createDefaultListUserModel() as ListUserModel,
        archived: false as boolean,
        notArchived: true as boolean,
        isLoad: false as boolean
    }),
    actions: {
        async load() {
            if (!this.isLoad) {
                await this.getAll();
                this.isLoad = true;
            }
        },
        async getAll(): Promise<boolean> {
            try {
                this.listUser.users = await getAllUser()
                return true;
            } catch (e) {
                useAlert().error('')
                return false;
            }
        },
        async archiveUser(user: User): Promise<boolean> {
            try {
                user.archive = true;
                await updateUser(user);
                return true;
            } catch (e) {
                useAlert().error('')
                return false;
            }
        },
        async unArchiveUser(user: User): Promise<boolean> {
            try {
                user.archive = false;
                await updateUser(user);
                return true;
            } catch (e) {
                useAlert().error('')
                return false;
            }
        },
        async updateUser(user: User): Promise<boolean> {
            try {
                await updateUser(user);
                return true;
            } catch (e) {
                useAlert().error('')
                return false;
            }
        }
    }
});

export const createUserStore = defineStore("userStore", {
    state: () => ({
        user: createDefaultUser() as User,
    }),
    getters: {
        listUser: (state) => {
            const list = listUserStore();
            return list.listUser;
        }
    },
    actions: {
        async create(): Promise<boolean> {
            try {
                const response = await creerUser(this.user);
                this.user.id = response.id;
                this.listUser.users.push(this.user);
                return true;
            } catch (e) {
                useAlert().error('');
                return false;
            }
        },
        clear() {
            this.user = createDefaultUser();
        }
    },
});