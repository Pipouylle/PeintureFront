import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";

import CreationAffaireView from "@/views/forms/CreationAffaireView.vue";
import CreationSystemeView from "@/views/forms/CreationSystemeView.vue";
import CreationCommandeView from "@/views/forms/CreationCommandeView.vue";
import CreationDemandeView from "@/views/forms/CreationDemandeView.vue";
import CalendarView from "@/views/calendars/CalendarView.vue";
import ListAffaireView from "@/views/lists/ListAffaireView.vue";
import ModifAffaireView from "@/views/modifs/ModifAffaireView.vue";
import ListDemandeView from "@/views/lists/ListDemandeView.vue";
import ListSystemeView from "@/views/lists/ListSystemeView.vue";
import ListCommandeView from "@/views/lists/ListCommandeView.vue";
import CalendarCabine1View from "@/views/calendars/CalendarCabine1View.vue";
import CalendarCabine2View from "@/views/calendars/CalendarCabine2View.vue";
import {useListStore} from "@/stores";

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
        path: "/CreerAffaire",
        name: "CreerAffaire",
        component: CreationAffaireView,
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
        path: "/CreerDemande",
        name: "CreerDemande",
        component: CreationDemandeView,
    },
    {
        path: "/listSysteme",
        name: "listSysteme",
        component: ListSystemeView,
    },
    {
        path: "/CreerSysteme",
        name: "CreerSysteme",
        component: CreationSystemeView,
    },
    {
        path: "/listCommande",
        name: "listCommande",
        component: ListCommandeView,
    },
    {
        path: "/CreerCommande",
        name: "CreerCommande",
        component: CreationCommandeView,
    },
    {
        path: "/Calendar",
        name: "Calendar",
        component: CalendarView,
    },
    {
        path: "/calendarUsineCabine1",
        name: "calendarUsineCabine1",
        component: CalendarCabine1View
    },
    {
        path: "/calendarUsineCabine2",
        name: "calendarUsineCabine2",
        component: CalendarCabine2View
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    await useListStore().loadList(); // Load lists only if not already loaded
    next();
});
export default router;
