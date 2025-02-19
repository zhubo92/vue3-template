<script setup lang="ts">
import { getUserListApi } from "@/api/user";
import { getRoleListApi } from "@/api/role";

interface IRole {
    role: number;
    roleName: string;
}
interface IUser {
    id: number;
    nickName: string;
    userName: string;
    role: IRole[];
}
interface IRoleWithAuth {
    roleId: number;
    roleName: string;
    auth: string[];
}
interface IQueryUser {
    nickName: string;
    role: number;
}
interface IEditUser {
    id: number;
    nikName: string;
    role: number[];
}
const searchData = reactive<IQueryUser>({
    nickName: "",
    role: 0
});
const userList = ref<IUser[]>([]);
const roleWithAuthList = ref<IRoleWithAuth[]>([]);
const showEdit = ref(false);
const editUser = reactive<IEditUser>(initEditUser());

onMounted(() => {
    fetchUserData();
    fetchRoleData();
});

watch([() => searchData.nickName, () => searchData.role], async () => {
    if (searchData.nickName === "" || searchData.role === 0) {
        await fetchUserData();
        onSearch();
    }
});

watch(showEdit, (val) => {
    if (!val) {
        Object.assign(editUser, initEditUser());
    }
});

function initEditUser(): IEditUser {
    return {
        id: 0,
        nickName: "",
        role: []
    };
}
async function fetchUserData() {
    const { data } = await getUserListApi();
    userList.value = data;
}

async function fetchRoleData() {
    const { data } = await getRoleListApi();
    roleWithAuthList.value = data;
}
function onSearch() {
    let res: IUser[] = [];
    if (searchData.nickName || searchData.role) {
        if (searchData.nickName) {
            res = userList.value.filter((item) => {
                return item.nickName.indexOf(searchData.nickName) !== -1;
            });
        }
        if (searchData.role) {
            res = searchData.nickName ? res : userList.value;
            res = res.filter((item) => item.role.find((value) => value.role === searchData.role));
        }
    } else {
        res = userList.value;
    }
    userList.value = res;
}
function handleEdit(user: IUser) {
    Object.assign(editUser, {
        ...user,
        role: user.role.map((item) => item.role || item.roleId)
    });
    showEdit.value = true;
}
function confirmEditUser() {
    const obj = userList.value.find((item) => item.id === editUser.id);
    obj.nickName = editUser.nickName;
    obj.role = roleWithAuthList.value.filter((item) => editUser.role.find((value) => value === item.roleId));

    showEdit.value = false;
}
</script>

<template>
    <div>
        <el-form inline class="search-form" :model="searchData">
            <el-form-item label="姓名" prop="nickName">
                <el-input v-model="searchData.nickName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="searchData.role" placeholder="请选择角色" class="m-2" style="width: 240px">
                    <el-option label="全部" :value="0" :key="0"></el-option>
                    <el-option
                        v-for="item in roleWithAuthList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="userList" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="nickName" label="姓名"></el-table-column>
            <el-table-column prop="role" label="角色">
                <template #default="{ row }">
                    <el-button v-for="item in row.role" link :key="item.role" type="primary" size="small">
                        {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="showEdit" title="编辑用户信息">
            <el-form :model="editUser">
                <el-form-item label="用户昵称" prop="nickName" label-width="120px">
                    <el-input v-model="editUser.nickName" autocomplete="off" class="w192"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role" label-width="120px">
                    <el-select v-model="editUser.role" placeholder="请选择角色" multiple class="m-2" size="large">
                        <el-option
                            v-for="item in roleWithAuthList"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showEdit = false">取 消</el-button>
                    <el-button type="primary" @click="confirmEditUser">确 定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
.search-form {
    padding: 10px 0 0 10px;
}

.w192 {
    width: 192px;
}
</style>
