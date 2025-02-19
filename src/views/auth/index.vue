<script setup lang="ts">
import { getAuthListApi } from "@/api/auth";

const defaultProps = {
    children: "roleList",
    label: "name"
};
interface IAuth {
    name: string;
    roleId: number;
    roleList?: IAuth[];
}
const route = useRoute();
const authList = ref<IAuth[]>([]);
const treeRef = ref(null);
const checkedNodes = ref<number[]>([]);
const { auth } = route.query;
if (auth) {
    checkedNodes.value = auth;
}

onMounted(() => {
    fetchAuthData();
});

async function fetchAuthData() {
    const { data } = await getAuthListApi();
    authList.value = data;
}
function onChangeAuth() {
    // console.log(treeRef.value.getCheckedKeys());
}
</script>

<template>
    <div>
        <el-tree
            ref="treeRef"
            :data="authList"
            show-checkbox
            node-key="roleId"
            :props="defaultProps"
            :check-strictly="true"
            :default-checked-keys="checkedNodes"
        ></el-tree>
        <el-button type="primary" @click="onChangeAuth">修改权限</el-button>
    </div>
</template>

<style scoped lang="less"></style>
