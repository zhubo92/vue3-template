<script lang="ts" setup>
import { ElForm } from "element-plus";
import { useComRef } from "@/hooks/useComRef";

const formRef = useComRef<typeof ElForm>(null);
const text = ref("admin");
const theme = ref("black");
</script>

<template>
    <div class="wrap-about">
        <el-form ref="formRef"></el-form>
        <MyTag :text="text" :theme="theme" />
    </div>
</template>

<style lang="less" scoped>
.wrap-about {
    padding: 20px;
    font-size: 20px;
    color: @color;
    background-color: @bg;
}
</style>
