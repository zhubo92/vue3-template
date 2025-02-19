<script lang="ts" setup>
import { getProjectListApi } from "@/api/projects";

interface IProject {
    userId: number;
    id: number;
    title: string;
    introduce: string;
}

const projectList = ref<IProject[]>([]);
const searchData = reactive({
    title: "",
    introduce: "",
    currentPage: 1,
    pageSize: 5,
    dataCount: 0
});

const dataList = computed(() => {
    return projectList.value.slice(
        (searchData.currentPage - 1) * searchData.pageSize,
        searchData.currentPage * searchData.pageSize
    );
});

onMounted(() => {
    fetchData();
});

watch([() => searchData.title, () => searchData.introduce], () => {
    if (!searchData.title || !searchData.introduce) fetchData();
});

function fetchData() {
    getProjectListApi().then((res) => {
        projectList.value = res.data;
        searchData.dataCount = res.data.length;
    });
}
function onCurrentChange(page: number) {
    searchData.currentPage = page;
}
function onSizeChange(pageSize: number) {
    searchData.pageSize = pageSize;
}
const onSearch = () => {
    let res: IProject[] = [];
    if (searchData.title || searchData.introduce) {
        if (searchData.title) {
            res = projectList.value.filter((value) => {
                return value.title.indexOf(searchData.title) !== -1;
            });
        }
        if (searchData.introduce) {
            if (searchData.title) projectList.value = res;
            res = projectList.value.filter((value) => {
                return value.introduce.indexOf(searchData.introduce) !== -1;
            });
        }
    } else {
        res = projectList.value;
    }
    projectList.value = res;
    searchData.currentPage = 1;
    searchData.dataCount = projectList.value.length;
};
</script>
<template>
    <div class="wrap-content">
        <el-form inline :model="searchData" class="search-form">
            <el-form-item label="项目名称">
                <el-input v-model="searchData.title" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目详情">
                <el-input v-model="searchData.introduce" placeholder="请输入项目详情"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList" border style="width: 100%">
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="title" label="名称" width="180"></el-table-column>
            <el-table-column prop="introduce" label="详情"></el-table-column>
        </el-table>
        <el-pagination
            background
            :page-sizes="[5, 10, 20, 30, 40]"
            :page-size="searchData.pageSize"
            :current-page="searchData.currentPage"
            layout="prev, pager, next, sizes"
            :total="searchData.dataCount"
            @current-change="onCurrentChange"
            @size-change="onSizeChange"
        />
    </div>
</template>
<style lang="less" scoped>
.wrap-content {
    display: flex;
    height: max-content;
    flex-direction: column;

    .pagination {
        display: flex;
        // justify-content: right;
        // align-items: right;
        margin: 10px;
    }
}
</style>
