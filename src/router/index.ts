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
import ListUserView from "@/views/lists/ListUserView.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/list/affaire",
        name: "listAffaire",
        component: ListAffaireView,
    },
    {
        path: "/creer/affaire",
        name: "CreerAffaire",
        component: CreationAffaireView,
    },
    {
        path: "/modif/affaire",
        name: "modifAffaire",
        component: ModifAffaireView,
    },
    {
        path: "/list/systeme",
        name: "listSysteme",
        component: ListSystemeView,
    },
    {
        path: "/creer/systeme",
        name: "CreerSysteme",
        component: CreationSystemeView,
    },
    {
        path: "/modif/systeme",
        name: "modifSysteme",
        component: ModifSystemeView,
    },
    {
        path: "/list/commande",
        name: "listCommande",
        component: ListCommandeView,
    },
    {
        path: "/creer/commande",
        name: "CreerCommande",
        component: CreationCommandeView,
    },
    {
        path: "/modif/commande",
        name: "modifCommande",
        component: ModifCommandeView,
    },
    {
        path: "/list/demande",
        name: "listDemande",
        component: ListDemandeView,
    },
    {
        path: "/creer/demande",
        name: "CreerDemande",
        component: CreationDemandeView,
    },
    {
        path: "/modif/demande",
        name: "modifDemande",
        component: ModifDemandeView,
    },
    {
        path: "/list/article",
        name: "listArticle",
        component: ListArticleView,
    },
    {
        path: "/creer/article",
        name: "CreerArticle",
        component: CreationArticleView,
    },
    {
        path: "/modif/article",
        name: "modifArticle",
        component: ModifArticleView,
    },
    {
       path: "/list/user",
       name: "listUser",
       component: ListUserView,
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
        path: "/list/grenaillage",
        name: "listGrenaillage",
        component: ListGrenaillageView,
    },
    {
        path: "/list/semaine",
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
    useAlert().alertPossible = true; // true = alert on, false = alert off
    useAlert().logPossible = true;
    useAlert().errorPossible = true;
    await useListStore().loadList(); // Load lists only if not already loaded
    next();
});
export default router;
