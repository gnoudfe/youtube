<template>
  <div
    id="progress"
    :style="{ width: progressBarWidth }"
    :class="{ 'remove-progressBar': isLoaded }"
  ></div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  loading: Boolean,
});
const isLoaded = ref(false);
const progressBarWidth = ref("0%");
const startLoading = () => {
  isLoaded.value = false;
  progressBarWidth.value = "80%";
};
const endLoading = () => {
  progressBarWidth.value = "100%";
  document.querySelector("#progress").style.transition = "width 0.4s ease-out";
  const progressElement = document.querySelector("#progress");
  // Sử dụng sự kiện transitionend để xác định khi transition kết thúc
  progressElement.addEventListener(
    "transitionend",
    () => {
      isLoaded.value = true;
      progressBarWidth.value = "0%";
      document.querySelector("#progress").style.transition =
        "width 2s ease-out";
    },
    { once: true }
  ); // { once: true } để đảm bảo sự kiện chỉ được gọi một lần
};

watch(
  () => props.loading,
  (newLoading) => {
    if (newLoading) {
      startLoading();
    } else {
      endLoading();
    }
  }
);
</script>

<style scoped>
#progress {
  background: red;
  height: 3px;
  width: 0%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999999999999999999999;
  border-radius: 2px;
  opacity: 1;
  visibility: visible;
  transition: width 2s ease-out;
}
.remove-progressBar {
  opacity: 0 !important;
  visibility: hidden !important;
}
</style>
