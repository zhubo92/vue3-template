export default {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    meta: {},
    children: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/home/index.vue"),
            meta: {
                title: "项目介绍",
                isShow: true
            },
            children: []
        },
        {
            path: "/user",
            name: "user",
            component: () => import("@/views/user/index.vue"),
            meta: {
                title: "用户列表",
                isShow: true
            },
            children: []
        },
        {
            path: "/role",
            name: "role",
            component: () => import("@/views/role/index.vue"),
            meta: {
                title: "角色列表",
                isShow: true
            },
            children: []
        },
        {
            path: "/auth",
            name: "auth",
            component: () => import("@/views/auth/index.vue"),
            meta: {
                title: "权限列表",
                isShow: true
            },
            children: []
        }
    ]
};
