import {defineStore} from "pinia";

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

