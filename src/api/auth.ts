import { get } from "@/http/request";

export const getAuthListApi = async (data) => {
    return get({}, "/getAuthList", data);
};
