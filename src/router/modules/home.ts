export default {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    meta: {},
    children: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/home/index.vue")
        }
    ]
};
