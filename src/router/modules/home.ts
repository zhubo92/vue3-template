export default {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/",
    meta: {
        role: ["admin", "common"]
    },
    children: [
        {
            path: "/",
            name: "Home",
            component: () => import("@/views/home/index.vue"),
            meta: {
                title: "默认首页",
                isShow: true,
                parentRouter: "Layout"
            }
        },
        {
            path: "/p",
            name: "ParentPage",
            meta: {
                isShow: true,
                title: "父菜单",
                parentRouter: "Layout"
            },
            children: [
                {
                    path: "/p/child1",
                    name: "ChildPage1",
                    meta: {
                        isShow: true,
                        title: "子菜单1",
                        parentRouter: "ParentPage"
                    }
                },
                {
                    path: "/p/child2",
                    name: "ChildPage2",
                    meta: {
                        isShow: true,
                        title: "子菜单2",
                        parentRouter: "ParentPage"
                    }
                },
                {
                    path: "/p/child3",
                    name: "ChildPage3",
                    meta: {
                        isShow: true,
                        title: "子菜单3",
                        parentRouter: "ParentPage"
                    }
                }
            ]
        },
        {
            path: "/project",
            name: "Project",
            component: () => import("@/views/project/index.vue"),
            meta: {
                title: "项目模块",
                isShow: true,
                parentRouter: "Layout"
            }
        },
        {
            path: "/user",
            name: "User",
            component: () => import("@/views/user/index.vue"),
            meta: {
                title: "用户列表",
                isShow: true,
                parentRouter: "Layout"
            }
        },
        {
            path: "/role",
            name: "Role",
            component: () => import("@/views/role/index.vue"),
            meta: {
                title: "角色列表",
                isShow: true,
                parentRouter: "Layout"
            }
        },
        {
            path: "/auth",
            name: "Auth",
            component: () => import("@/views/auth/index.vue"),
            meta: {
                title: "权限列表",
                isShow: true,
                parentRouter: "Layout"
            }
        }
    ]
};
