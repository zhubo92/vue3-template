import { defineStore } from "pinia";
import pinia from "@/store";
import { refreshUserInfoApi, userLoginApi } from "@/api/user";
import { IUserState } from "@/store/user/type";

export interface ILoginRequest {
    username: string;
    password: string;
}

export const useUserStoreHook = defineStore("userInfo", {
    state: (): IUserState => ({
        username: "张三",
        accessToken: "",
        roles: ["common"]
    }),
    getters: {},
    actions: {
        storeUserLogin(data: ILoginRequest) {
            return userLoginApi(data).then((res) => {
                this.username = res.username;
                this.roles = res.roles;
                this.accessToken = res.accessToken;
                return res;
            });
        },
        storeRefreshUserInfo() {
            if (this.username === "张三" && this.accessToken != "") {
                refreshUserInfoApi({
                    accessToken: this.accessToken
                })
                    .then((res) => {
                        this.username = res.username;
                        this.roles = res.roles;
                        this.accessToken = res.accessToken;
                    })
                    .catch(() => {
                        this.accessToken = "";
                    });
            }
        }
    },
    persist: {
        key: "userInfo",
        storage: sessionStorage,
        pick: ["accessToken"]
    }
});

export function useUserStore() {
    return useUserStoreHook(pinia);
}
