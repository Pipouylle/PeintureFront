import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";

import CreationAffaireView from "@/views/forms/CreationAffaireView.vue";
import CreationSystemeView from "@/views/forms/CreationSystemeView.vue";
import CreationCommandeView from "@/views/forms/CreationCommandeView.vue";
import CreationDemandeView from "@/views/forms/CreationDemandeView.vue";
import ListAffaireView from "@/views/lists/ListAffaireView.vue";
import ModifAffaireView from "@/views/modifs/ModifAffaireView.vue";
import ListDemandeView from "@/views/lists/ListDemandeView.vue";
import ListSystemeView from "@/views/lists/ListSystemeView.vue";
import ListCommandeView from "@/views/lists/ListCommandeView.vue";
import {useAlert, useListStore} from "@/stores";
import ListGrenaillageView from "@/views/lists/ListGrenaillageView.vue";
import ListArticleView from "@/views/lists/ListArticleView.vue";
import ModifSystemeView from "@/views/modifs/ModifSystemeView.vue";
import CalendarViewNew from "@/views/calendars2_0/CalendarViewNew.vue";
import CreationArticleView from "@/views/forms/CreationArticleView.vue";
import ModifCommandeView from "@/views/modifs/ModifCommandeView.vue";
import ViewUsineView from "@/views/usine/ViewUsineView.vue";
import ListSemaineView from "@/views/lists/ListSemaineView.vue";
import ModifDemandeView from "@/views/modifs/ModifDemandeView.vue";
import ListFournisseurView from "@/views/lists/ListFournisseurView.vue";
import CreationFounisseurView from "@/views/forms/CreationFounisseurView.vue";
import ModifArticleView from "@/views/modifs/ModifArticleView.vue";

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
        path: "/modifSysteme",
        name: "modifSysteme",
        component: ModifSystemeView,
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
        path: "/modifCommande",
        name: "modifCommande",
        component: ModifCommandeView,
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
        path: "/modif/demande",
        name: "modifDemande",
        component: ModifDemandeView,
    },
    {
        path: "/listArticle",
        name: "listArticle",
        component: ListArticleView,
    },
    {
        path: "/CreerArticle",
        name: "CreerArticle",
        component: CreationArticleView,
    },
    {
        path: "/modif/article",
        name: "modifArticle",
        component: ModifArticleView,
    },
    {
        path: "/list/fournisseur",
        name: "listFournisseur",
        component: ListFournisseurView,
    },
    {
        path: "/creer/fournisseur",
        name: "creerFournisseur",
        component: CreationFounisseurView,
    },
    {
        path: "/listGrenaillage",
        name: "listGrenaillage",
        component: ListGrenaillageView,
    },
    {
        path: "/listSemaine",
        name: "listSemaine",
        component: ListSemaineView,
    },
    {
        path: "/calendar2",
        name: "calendar2",
        component: CalendarViewNew,
    },
    {
        path: "/usineView",
        name: "usineView",
        component: ViewUsineView,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    useAlert().alertPossible = false; // true = alert on, false = alert off
    await useListStore().loadList(); // Load lists only if not already loaded
    next();
});
export default router;
