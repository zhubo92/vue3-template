<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>
<template>
    <el-config-provider :locale="zhCn">
        <!-- 一般vue项目都会使用vue-router -->
        <!-- 所以我们这里直接写一个 router-view -->
        <router-view></router-view>
    </el-config-provider>
</template>
<style>
#app {
    height: 100vh;
}
</style>
