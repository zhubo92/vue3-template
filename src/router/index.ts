import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {},
        children: []
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((_to, _from, next) => {
    NProgress.start();
    next();
});

router.afterEach((_to) => {
    NProgress.done();
});

export default router;
