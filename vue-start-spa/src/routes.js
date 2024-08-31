import { createRouter, createWebHashHistory } from "vue-router";
import PageViewer from "./views/PageViewer.vue";
import CreatePage from "./views/CreatePage.vue";
import Pages from "./views/Pages.vue";
import PagesList from "./views/PagesList.vue";
import PageEdit from "./views/PageEdit.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/:index?',
            component: PageViewer,
            props: true,
            meta: {
                title: "Example Page"
            }
        },
        { 
            path: '/pages',
            component: Pages,
            children: [
                { path: '', component: PagesList, meta: {title: 'Page List'} },
                { path: 'create', component: CreatePage, meta: { title: 'Create Page' } },
                { path: ':index/edit', component: PageEdit, props: true }
            ]
        },
    ]
});

export default router;