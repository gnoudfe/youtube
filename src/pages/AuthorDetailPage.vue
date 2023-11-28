<script setup>
import { watch, onMounted, onBeforeUnmount, ref } from "vue";
import ChannelContent from "../components/views/AuthorDetailPage/ChannelContent.vue";
import { useAuthorStore } from "../stores/useAuthor";
import { useSettingsStore } from "../stores/useSettings";
import { scrollToTop } from "../composables/scrollToTop";
import { useRouter } from "vue-router";

const { SettingsState } = useSettingsStore();
const { state, actionGetAuthorInfor, actionGetMoreVideos } = useAuthorStore();
const route = useRouter();
const isLoading = ref(false);
SettingsState.isLoading = true;
await actionGetAuthorInfor(route.currentRoute.value.params.id);
SettingsState.isLoading = false;

watch(
  () => route.currentRoute.value.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      state.initAuthor = true;
      SettingsState.isLoading = true;
      await actionGetAuthorInfor(newId);
      SettingsState.isLoading = false;
      scrollToTop();
    }
  }
);

const handleLoadMore = async (dataKey) => {
  if (isLoading.value) return;
  isLoading.value = true;
  const nextpage =
    dataKey === "AuthorInfor"
      ? state.AuthorInfor.nextpage
      : state.Tabs.nextpage;
  const res = await actionGetMoreVideos(
    route.currentRoute.value.params.id,
    nextpage
  );
  if (res) {
    if (dataKey === "AuthorInfor") {
      state.AuthorInfor.nextpage = res.nextpage;
      state.AuthorInfor.relatedStreams = [
        ...state.AuthorInfor.relatedStreams,
        ...res.relatedStreams,
      ];
    } else {
      state.Tabs.nextpage = res.nextpage;
      state.Tabs.content = [...state.Tabs.content, ...res.relatedStreams];
    }
  }
  isLoading.value = false;
};

const loadMoreData = async () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
    if (state.Tabs.nextpage || state.Tabs.nextpage === null) {
      handleLoadMore("Tabs");
    } else {
      handleLoadMore("AuthorInfor");
    }
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
  <div class="px-[70px] relative">
    <ChannelContent />
  </div>
</template>
