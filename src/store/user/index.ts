import { defineStore } from "pinia";
import pinia from "@/store";
import { ILoginRequest, userLoginApi } from "@/api/user";
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
