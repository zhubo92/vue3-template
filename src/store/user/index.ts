import { defineStore } from "pinia";
import pinia from "@/store";
import { ILoginRequest, refreshUserInfoApi, userLoginApi } from "@/api/user";
import { IUserState } from "@/store/user/type";

const useUserStoreHook = defineStore("userInfo", {
    state: (): IUserState => ({
        username: "",
        accessToken: "",
        roles: ["common"]
    }),
    getters: {},
    actions: {
        storeUserLogin(data: ILoginRequest) {
            return userLoginApi(data).then((res) => {
                this.username = res.data.username;
                this.roles = res.data.roles;
                this.accessToken = res.data.accessToken;
                return res;
            });
        },
        storeRefreshUserInfo() {
            if (this.username === "admin" && this.accessToken != "") {
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
