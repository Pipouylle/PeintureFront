import {defineStore} from "pinia";
import NotificationModel from "@/models/common/NotificationModel";

export const useColorStore = defineStore('colorStore', {
    state: () => ({
        isLightTheme: false,
    }),
    getters: {
        getTheme: (state) => state.isLightTheme ? 'light' : 'dark',
    },
    actions: {
        toggleTheme() {
            this.isLightTheme = !this.isLightTheme;
            document.documentElement.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
        },
    },
});

export const alertStore = defineStore('alertStore', {
    state: () => ({
        alertPossible: false as boolean,
        logPossible: false as boolean,
        errorPossible: false as boolean,
    }),
    actions: {
        alert: (message: String) => {
            if (alertStore().alertPossible) {
                alert(message)
            }
        },
        log(message: any) {
            if (this.logPossible) {
                console.log(message)
            }
        },
        error(message: any) {
            if (this.errorPossible) {
                console.error(message)
            }
        }
    },
});

export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        notifications: [] as NotificationModel[],
    })
});

export function useAlert() {
    return alertStore();
}