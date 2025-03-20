import { ref } from "vue"

export const useLoadData = <T> (callback: () => Promise<T>) => {
  const isLoading = ref<Boolean>(true);
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);

  callback()
  .then((res: T) => {
    data.value = res;
  })
  .catch((e) => {
    const typedError = e as Error;
    console.log('Loading error: ', typedError);
    error.value = new Error(typedError.message ?? 'Load data error');
  }
).finally(() => {
  isLoading.value = false;
})

  return {
    isLoading,
    data,
    error
  }
}