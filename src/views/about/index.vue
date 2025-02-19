<script lang="ts" setup>
import { ElForm } from "element-plus";
import { useComRef } from "@/hooks/useComRef";

const formRef = useComRef<typeof ElForm>(null);
</script>
<template>
    <div class="wrap-about">
        <el-form ref="formRef"></el-form>
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
