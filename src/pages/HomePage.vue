<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import BaseCard from "../components/Card/BaseCard.vue";
import { useTrendingStore } from "../stores/useTrendingVideo";
import { useSettingsStore } from "../stores/useSettings";
import LoadingComment from "../components/Loading/LoadingComment.vue";
const { SettingsState } = useSettingsStore();
const { StateTrending, actionGetTrendingVideos, actionGetMoreTrendingVideos } =
  useTrendingStore();
const isLoading = ref(false);
SettingsState.isLoading = true;
await actionGetTrendingVideos();
SettingsState.isLoading = false;

const getRandomVideoId = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  const randomElement =
    StateTrending.VideoTrendings[
      Math.floor(Math.random() * StateTrending.VideoTrendings.length)
    ];
  const videoId = randomElement.url.split("v=")[1];
  const res = await actionGetMoreTrendingVideos(videoId);
  if (res) {
    const hasDuplicates = res.data.relatedStreams.some((relatedVideo) => {
      return StateTrending.VideoTrendings.some((existingVideo) => {
        return relatedVideo.url === existingVideo.url;
      });
    });
    if (!hasDuplicates) {
      StateTrending.VideoTrendings = [
        ...StateTrending.VideoTrendings,
        ...res.data.relatedStreams,
      ];
    }
  }
  isLoading.value = false;
};

const loadMoreData = async () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
    getRandomVideoId();
  }
};
onMounted(async () => {
  window.addEventListener("scroll", loadMoreData);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", loadMoreData);
});
</script>
<template>
  <BaseCard />
  <div
    v-if="isLoading"
    class="h-[50px] flex items-center translate-y-[-20px] justify-center"
  >
    <LoadingComment />
  </div>
</template>

<style scoped></style>
