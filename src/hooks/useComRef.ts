export function useComRef<T>() {
    return ref<InstanceType<T>>(null);
}
