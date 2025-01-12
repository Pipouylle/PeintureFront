import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PikuTradeView from "@/views/PikuTradeView.vue";
import SubnauticaModeView from "@/views/SubnauticaModeView.vue";
import About from "@/views/About.vue";
import CGJView from "@/views/CGJView.vue";


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
        path: "/home",
        name: "homeAlias",
        component: HomeView,
    },
    {
        path: "/pikuTrade",
        name: "pikuTrade",
        component: PikuTradeView,
    },
    {
        path: "/subnautica",
        name: "subnautica",
        component: SubnauticaModeView,
    },
    {
        path: "/codeGameJam",
        name: "cgj",
        component: CGJView,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
