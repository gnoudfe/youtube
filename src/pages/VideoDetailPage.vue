<script setup>
import { watch } from "vue";
import VideoCustom from "../components/views/VideoDetailPage/VideoCustom.vue";
import VideoInfor from "../components/Views/VideoDetailPage/VideoInfor.vue";
import VideoComment from "../components/Views/VideoDetailPage/VideoComment.vue";
import VideoRelated from "../components/Views/VideoDetailPage/VideoRelated.vue";
import VideoChapters from "../components/views/VideoDetailPage/VideoChapters.vue";
import VideoPlaylist from "../components/views/VideoDetailPage/VideoPlaylist.vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "../stores/useSettings";
import { useDetailVideoStore } from "../stores/useDetailVideo";
import { scrollToTop } from "../composables/scrollToTop";
const { SettingsState } = useSettingsStore();

const {
  actionGetDetailVideo,
  actionGetDetailVideoComment,
  actionGetPlaylistVideos,
} = useDetailVideoStore();
const route = useRoute();
const { state } = useDetailVideoStore();
SettingsState.isLoading = true;
await actionGetDetailVideo(route.query.v);
await actionGetDetailVideoComment(route.query.v);
SettingsState.isLoading = false;

if (route.query.list) {
  await actionGetPlaylistVideos(route.query.list);
}

watch(
  () => [route.query.v, route.query.list],
  async ([newIdVideo, newList], [oldIdVideo, oldList]) => {
    if (newIdVideo !== oldIdVideo) {
      SettingsState.isLoading = true;
      state.currentTime = 0;
      state.isChapters = 0;
      await actionGetDetailVideo(newIdVideo);
      await actionGetDetailVideoComment(newIdVideo);
      SettingsState.isLoading = false;
      scrollToTop();
    }
    if (newList !== oldList) {
      SettingsState.isLoading = true;
      await actionGetPlaylistVideos(newList);
      SettingsState.isLoading = false;
      scrollToTop()

    }
  }
);
</script>
<template>
  <div class="2xl:pl-[80px] 2xl:pr-[80px] flex">
    <div class="w-[75%] mr-[12px]">
      <VideoCustom />
      <VideoInfor />
      <VideoComment />
    </div>
    <div class="w-[25%] ml-[12px]">
      <div v-if="route.query.list">
        <VideoPlaylist />
      </div>
      <VideoChapters />
      <VideoRelated />
    </div>
  </div>
</template>
