<script setup>
import CardAuthor from "../../Card/CardAuthor.vue";
import LoadingComment from "../../Loading/LoadingComment.vue";
import { useAuthorStore } from "../../../stores/useAuthor";
import { renderHTML } from "../../../composables/renderHtml";
const { state } = useAuthorStore();
import CardLiveStreams from "../../Card/CardLiveStreams.vue";
import CardPlaylist from "../../Card/CardPlaylist.vue";
import CardShortVideo from "../../Card/CardShortVideo.vue";
import CardAuthorSubscribe from "../../Card/CardAuthorSubscribe.vue";
const props = defineProps({
  isBaseCardActive: {
    type: Boolean,
  },
  isLiveStreams: {
    type: Boolean,
  },
  isPlaylist: {
    type: Boolean,
  },
  isAbout: {
    type: Boolean,
  },
  isShorts: {
    type: Boolean,
  },
  isAuthorSubcribe: {
    type: Boolean,
  },
});
</script>

<template>
  <div>
    <div v-if="isBaseCardActive">
      <CardAuthor :data="state.AuthorInfor.relatedStreams" />
      <div
        v-if="state.isLoading"
        class="h-[50px] flex items-center relative justify-center"
      >
        <LoadingComment />
      </div>
      <h2 class="text-white text-center" v-if="state.AuthorInfor.relatedStreams.length === 0">
        Kênh này chưa đăng bất kỳ video nào.
      </h2>
    </div>
    <div v-if="isLiveStreams">
      <CardLiveStreams :data="state.Tabs.content" />
      <div
        v-if="state.isLoading"
        class="h-[50px] flex items-center relative justify-center"
      >
        <LoadingComment />
      </div>
      <h2 class="text-white text-center" v-if="state.Tabs.content.length === 0">
        Kênh này không có video nào.
      </h2>
    </div>
    <div v-if="isPlaylist">
      <CardPlaylist :data="state.Tabs.content" />
      <div
        v-if="state.isLoading"
        class="h-[50px] flex items-center relative justify-center"
      >
        <LoadingComment />
      </div>
      <h2
        class="text-white text-center"
        v-if="state.Tabs?.content.length === 0"
      >
        Kênh này không có video nào.
      </h2>
    </div>

    <div v-if="isShorts">
      <CardShortVideo :data="state.Tabs.content" />
      <div
        v-if="state.isLoading"
        class="h-[50px] flex items-center relative justify-center"
      >
        <LoadingComment />
      </div>
      <h2
        class="text-white text-center"
        v-if="state.Tabs?.content.length === 0"
      >
        Kênh này không có video nào.
      </h2>
    </div>
    <div v-if="isAuthorSubcribe">
      <div>
        <CardAuthorSubscribe :data="state.Tabs.content" />
        <div
          v-if="state.isLoading"
          class="h-[50px] flex items-center relative justify-center"
        >
          <LoadingComment />
        </div>
      </div>
      <h2
        class="text-white text-center"
        v-if="state.Tabs?.content.length === 0"
      >
        Kênh này không đăng ký bất kỳ kênh nào khác.
      </h2>
    </div>
    <div v-if="isAbout">
      <h2 class="text-white text-[15px] block">Mô tả</h2>
      <p
        class="block text-[#f1f1f1] font-large text-[16px] pb-[200px]"
        v-html="renderHTML(state.AuthorInfor.description)"
      ></p>
    </div>
  </div>
</template>
