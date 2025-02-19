<script setup lang="ts">
import { getRoleListApi } from "@/api/role";

interface IRole {
    roleId: number;
    roleName: string;
}

const router = useRouter();
const roleList = ref<IRole[]>([]);
onMounted(() => {
    fetchRoleData();
});

async function fetchRoleData() {
    const { data } = await getRoleListApi();
    roleList.value = data;
}
function onAddRole() {
    ElMessageBox.prompt("请输入角色名称", "添加角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
    })
        .then(({ value, action }) => {
            roleList.value.push({
                roleId: roleList.value.length + 1,
                roleName: value,
                authority: []
            });
            ElMessage({
                type: "success",
                message: `${value}添加成功`
            });
        })
        .catch((err) => {
            ElMessage({
                type: "warning",
                message: "点击了取消按钮"
            });
        });
}
function onChangeAuth(auth) {
    router.push({
        path: "/auth",
        query: {
            id: auth.roleId,
            auth: auth.authority
        }
    });
}
</script>

<template>
    <div>
        <el-form inline label-width="100px">
            <el-form-item>
                <el-button type="primary" @click="onAddRole">新增角色</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="roleList" border style="width: 100%">
            <el-table-column prop="roleId" label="角色ID"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="primary" size="small" @click="onChangeAuth(row)">修改权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped lang="less"></style>
