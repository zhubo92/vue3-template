import { get } from "@/http/request";

export const getProjectListApi = () => {
    return get({}, "/projects");
};
