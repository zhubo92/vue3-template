<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import { User, Lock } from "@element-plus/icons-vue";

const userStore = useUserStore();
const router = useRouter();

const userInfo = reactive({
    username: "admin",
    password: "admin"
});

const rules = reactive({
    username: [
        {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
        }
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur"
        }
    ]
});

function userLogin() {
    userStore.storeUserLogin(userInfo).then(() => {
        router.push("/");
    });
}
</script>

<template>
    <div class="login">
        <div class="login-container">
            <h1>企业中后台管理系统</h1>
            <el-form :model="userInfo" :rules="rules" center class="login-container-form">
                <el-form-item prop="username">
                    <el-input
                        v-model="userInfo.username"
                        type="text"
                        placeholder="请输入用户名"
                        :prefix-icon="User"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="userInfo.password"
                        type="password"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="userLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="less">
.login {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    background: var(--root-backgroud-color);

    &-container {
        display: flex;
        width: 300px;
        text-align: center;
        flex-direction: column;

        &-form {
            height: max-content;
        }
    }
}
</style>
