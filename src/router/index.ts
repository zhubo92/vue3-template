import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useSettingStore } from "@/store/setting";

const settingStore = useSettingStore();
// 配置路由
// const routes: Array<RouteRecordRaw> = [
//     {
//         path: "/",
//         name: "home",
//         component: () => import("../views//home/index.vue"),
//         meta: {},
//         children: [],
//     },
// ];

export const aboutRouter = {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index.vue"),
    meta: {},
    children: []
} as RouteRecordRaw;

// 组合路由信息
// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(["./modules/*.ts"], {
    eager: true
});
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
    const module = modules[key].default;
    routes.push(module);
});
routes.push(aboutRouter);

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

function getTitle(name: string, routes: Array<RouteRecordRaw> = []) {
    const names = [];
    while (true) {
        names.push(name);
        const currentRouteObj = routes.find((item) => item.name === name);
        const parentRouteObj = routes.find((item) => item.name === currentRouteObj?.meta?.parentRouter);
        if (parentRouteObj) {
            name = parentRouteObj.name;
        } else {
            break;
        }
    }
    return names.reverse();
}

function handlerRouters(currentRouteName: string) {
    const titles = getTitle(currentRouteName, router.getRoutes());
    console.log(titles, "titles");
    settingStore.setTitles(titles);
}

const noStatusPage = ["/login", "/about"];

router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    const token = sessionStorage.getItem("userInfo");
    const userIsLogin = !!token;
    if (userIsLogin || noStatusPage.includes(_to.path)) {
        next();
    } else {
        next("/login");
    }
    handlerRouters(_to.name);
});

router.afterEach((_to) => {
    NProgress.done();
});

export default router;
