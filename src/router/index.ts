import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";

import CreationAffaireView from "@/views/forms/CreationAffaireView.vue";
import CreationCoucheView from "@/views/forms/CreationCoucheView.vue";
import CreationSystemeView from "@/views/forms/CreationSystemeView.vue";
import SelectArticleView from "@/views/SelectArticleView.vue";
import CreationCommandeView from "@/views/forms/CreationCommandeView.vue";
import CreationDemandeView from "@/views/forms/CreationDemandeView.vue";
import CalendarView from "@/views/CalendarView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/CreerAffaire",
        name: "CreerAffaire",
        component: CreationAffaireView,
    },
    {
        path: "/CreerCouche",
        name: "CreerCouche",
        component: CreationCoucheView,
    },
    {
        path: "/CreerSysteme",
        name: "CreerSysteme",
        component: CreationSystemeView,
    },
    {
        path: "/SelectArticle",
        name: "SelectArticle",
        component: SelectArticleView,
    },
    {
        path: "/CreerCommande",
        name: "CreerCommande",
        component: CreationCommandeView,
    },
    {
        path : "/CreerDemande",
        name : "CreerDemande",
        component : CreationDemandeView,
    },
    {
        path : "/Calendar",
        name : "Calendar",
        component : CalendarView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
