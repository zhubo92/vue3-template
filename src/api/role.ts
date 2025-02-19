import { get } from "@/http/request";

export const getRoleListApi = () => {
    return get({}, "/getRoleList");
};
