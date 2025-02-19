import { defineStore } from "pinia";
import pinia from "@/store";

const useSettingStoreHook = defineStore("setting", () => {
    const titles = ref([]);
    function setTitles(val: string[]) {
        titles.value = val;
    }
    return {
        titles,
        setTitles
    };
});

export function useSettingStore() {
    return useSettingStoreHook(pinia);
}
