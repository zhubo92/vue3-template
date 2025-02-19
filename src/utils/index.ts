import { RouteRecordRaw } from "vue-router";

export function getTitle(name: string, routes: Array<RouteRecordRaw> = []) {
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
