import { get } from "@/http/request";

export const getProjectList = (params: any) => {
    return get({}, "/projects", params);
};
