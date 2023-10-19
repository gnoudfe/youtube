<template>
  <div>
    <button @click="loadData" class="text-white">Load Data</button>
    <LoadingBarVue :loading="isLoading" />
  </div>
</template>

<script>
import { ref } from "vue";
import LoadingBarVue from "../components/Loading/LoadingBar.vue";

export default {
  components: {
    LoadingBarVue,
  },
  setup() {
    const isLoading = ref(false);

    const loadData = () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    };

    return {
      isLoading,
      loadData,
    };
  },
};
</script>
