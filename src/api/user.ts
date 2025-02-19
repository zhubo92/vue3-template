import { IBaseResponse, post, get } from "@/http/request";

export interface ILoginRequest {
    username: string;
    password: string;
}
// 刷新登录信息需要的参数
export interface IReLoginRequest {
    accessToken: string;
}
export interface ILoginResponse {
    username: string;
    roles: string[];
    accessToken: string;
}

// 定义的接口
export const userLoginApi = async (data: ILoginRequest) => {
    return post<IBaseResponse<ILoginResponse>>({}, "/login", data);
};

export const getUserListApi = async () => {
    return get({}, "/getUserList");
};
