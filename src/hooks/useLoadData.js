import { ref } from "vue"

export const useLoadData = (callback) => {
  const isLoading = ref(true);
  const data = ref(null);
  const error = ref(null);

  callback()
  .then((res) => {
    data.value = res;
  })
  .catch((error) => {
    console.log('Loading error: ', error);
    error.value = new Error(error.message ?? 'Load data error');
  })
  .finally(() => {
    isLoading.value = false;
  })

  return {
    isLoading,
    data,
    error
  }
}