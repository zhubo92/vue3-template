<script setup lang="ts">
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;

const showSetting = ref(false);

function handleSetting() {
    showSetting.value = !showSetting.value;
}

function logout() {
    sessionStorage.removeItem("userInfo");
    router.push("/login");
}
</script>

<template>
    <div class="header">
        <div class="flex-center">logo区域</div>
        <div class="flex-grow"></div>
        <div class="flex-center m05 color-dark-black"><i-ep-user></i-ep-user> {{ username }}</div>
        <div class="flex-center m05 color-dark-black setting" @click="handleSetting"><i-ep-setting></i-ep-setting></div>
    </div>
    <el-drawer v-model="showSetting" :show-close="false" :with-header="false" size="300">
        <div class="setting-header">
            <h2>项目配置</h2>
            <i-ep-close @click="handleSetting"></i-ep-close>
        </div>
        <div class="out">
            <el-button type="primary" @click="logout">退出登录</el-button>
        </div>
    </el-drawer>
</template>

<style scoped lang="less">
.header {
    display: flex;
    padding: 0 15px;
    width: 100%;
    height: 60px;
    box-shadow: 0 0 20px rgb(195 223 252 / 40%);
}

.setting {
    cursor: pointer;
}

.setting-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: var(--custom-color-dark-black);
}

.out {
    display: flex;
    justify-content: center;
}
</style>
