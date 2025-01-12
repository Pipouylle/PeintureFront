import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PikueTradeProjet from "@/views/PikueTradeProjet.vue";
import About from "@/views/About.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/projet1",
        name: "projet1",
        component: PikueTradeProjet,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
