import axios, { AxiosRequestConfig } from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { getMessageInfo } from "@/http/status";

// IBaseResponse 为 res.data 的类型
// T 为 res.data.data 的类型 不同的接口会返回不同的 data 所以我们加一个泛型表示
export interface IBaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
    status?: string | number;
}

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_USE_MOCK
        ? import.meta.env.VITE_APP_MOCK_BASEURL
        : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000
});

// axios实例拦截请求
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// axios实例拦截响应
service.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status !== 200) {
            ElMessage({
                message: getMessageInfo(res.status),
                type: "error"
            });
        }
        if (res.data.code != 0) {
            ElMessage({
                message: getMessageInfo(res.data.message),
                type: "error"
            });
            return Promise.reject(res.data);
        }
        return res;
    },
    (error: any) => {
        const { response } = error;
        if (response) {
            ElMessage({
                message: getMessageInfo(response.status),
                type: "error"
            });
            return Promise.reject(response.data);
        }
        ElMessage({
            message: "网络连接异常,请稍后再试!",
            type: "error"
        });
        return Promise.reject(error);
    }
);

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const conf = config;
    return new Promise((resolve, reject) => {
        service.request<any, AxiosResponse<IBaseResponse>>(conf).then((res: AxiosResponse<IBaseResponse>) => {
            const { code, message } = res.data;
            // 如果data.code为错误代码返回 message 信息
            if (code != 0) {
                ElMessage({
                    message,
                    type: "error"
                });
                reject(message);
            } else {
                ElMessage({
                    message,
                    type: "success"
                });
                // 此处返回data信息 也就是 api 中配置好的 Response类型
                resolve(res.data as T);
            }
        });
    });
};

export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
    return requestInstance({ ...config, url, method: "GET", params });
}
export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
    return requestInstance({ ...config, url, method: "POST", data });
}
export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, data?: U): Promise<T> {
    return requestInstance({ ...config, url, method: "PUT", data });
}
export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, params: U): Promise<T> {
    return requestInstance({ ...config, url, method: "DELETE", params });
}

// 一般的后端返回的数据结构
// {
//     "code": 1,
//     "message": "成功",
//     "data": {
//         "id": 1,
//         "name": "张三",
//         "age": 18,
//         "sex": 1,
//         "address": "北京市",
//         "createTime": "2021-08-30 15:49:16",
//         "updateTime": "2021-08-30 15:49:16",
//         "deleteTime": null,
//         "createBy": 1,
//         "updateBy": 1,
//     }
// }
