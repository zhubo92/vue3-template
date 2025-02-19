<script setup lang="ts">
import Header from "./components/Header.vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useSettingStore } from "@/store/setting";

const settingStore = useSettingStore();
const router = useRouter();
const route = useRoute();

const currentRoutePath = route.path;

// const menuList = router.getRoutes().filter((route) => route.meta.isShow);
const menuList = router.options.routes[0].children!.filter((route) => route.meta.isShow);
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
                        <template v-for="item in menuList" :key="item.path">
                            <el-menu-item v-if="!item.children" :index="item.path">
                                {{ item.meta!.title }}
                            </el-menu-item>
                            <el-sub-menu v-else :index="item.path">
                                <template #title>
                                    <span>{{ item.meta?.title }}</span>
                                </template>
                                <el-menu-item
                                    v-for="subItem in item.children"
                                    :key="subItem.path"
                                    :index="subItem.path"
                                >
                                    <span>{{ subItem.meta!.title }}</span>
                                </el-menu-item>
                            </el-sub-menu>
                        </template>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item v-for="item in settingStore.titles" :key="item" :to="{ name: item }">
                            {{ item }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
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

.el-breadcrumb {
    margin-bottom: 10px;
}
</style>
