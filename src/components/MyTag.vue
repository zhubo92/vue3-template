<script setup lang="ts">
import { onMounted } from "vue";

const tagRef = ref<HTMLElement>(null);
const props = defineProps({
    text: {
        default: null,
        type: String
    },
    theme: {
        type: String,
        default: null,
        required: false
    }
});

onMounted(() => {
    setText();
    setTheme();
});

function setText() {
    tagRef.value!.innerHTML = props.text;
}
function setTheme() {
    tagRef.value!.style.backgroundColor = props.theme;
}
</script>

<template>
    <div class="wrap-tag">
        <span class="tag" ref="tagRef" v-bind="props"></span>
    </div>
</template>

<style scoped lang="less">
.wrap-tag {
    margin: 30px;
}

.tag {
    padding: 10px;
    font-size: 18px;
    color: white;
    background-color: red;
    border-radius: 5px;
}
</style>
