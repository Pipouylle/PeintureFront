import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";

import CreationAffaireView from "@/views/forms/CreationAffaireView.vue";
import CreationCoucheView from "@/views/forms/CreationCoucheView.vue";
import CreationSystemeView from "@/views/forms/CreationSystemeView.vue";
import SelectArticleView from "@/views/SelectArticleView.vue";
import CreationCommandeView from "@/views/forms/CreationCommandeView.vue";
import CreationDemandeView from "@/views/forms/CreationDemandeView.vue";
import CalendarView from "@/views/CalendarView.vue";
import ListAffaireView from "@/views/lists/ListAffaireView.vue";
import ModifAffaireView from "@/views/modifs/ModifAffaireView.vue";
import ListDemandeView from "@/views/lists/ListDemandeView.vue";
import ListSystemeView from "@/views/lists/ListSystemeView.vue";
import ListCommandeView from "@/views/lists/ListCommandeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/listAffaire",
        name: "listAffaire",
        component: ListAffaireView,
    },
    {
        path: "/modifAffaire",
        name: "modifAffaire",
        component: ModifAffaireView,
    },

    {
      path: "/listDemande",
      name: "listDemande",
      component: ListDemandeView,
    },
    {
        path: "/listSysteme",
        name: "listSysteme",
        component: ListSystemeView,
    },
    {
        path: "/listCommande",
        name: "listCommande",
        component: ListCommandeView,
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
        path: "/CreerDemande",
        name: "CreerDemande",
        component: CreationDemandeView,
    },
    {
        path: "/Calendar",
        name: "Calendar",
        component: CalendarView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
