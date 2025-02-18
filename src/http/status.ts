export const getMessageInfo = (status: number | string): string => {
    switch (status) {
        case 400:
            return "请求错误(400)";
        case 403:
            return "拒绝访问(403)";
        case 401:
            return "未授权(401)";
        case 500:
            return "服务器错误(500)";
        case 503:
            return "服务不可用(503)";
        default:
            return `连接出错(${status})!`;
    }
};
