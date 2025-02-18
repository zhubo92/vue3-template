<script setup lang="ts">
import Header from "./components/Header.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const currentRoutePath = route.path;
const menuList = router.getRoutes().filter((route) => route.meta.isShow);
console.log(menuList);
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu :default-active="currentRoutePath" router>
                        <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
                            {{ item.meta.title }}
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
.common-layout {
    height: 100%;
}

.el-header {
    padding: 0;
    margin-bottom: 5px;
}

.el-container {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}
</style>
