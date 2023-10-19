<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useSearchStore } from "../../../stores/useSearchVideo";
import { formatViews } from "../../../composables/formatViews";
import { convertRelativeTimeToVietnamese } from "../../../composables/formatDate";
import { useSettingsStore } from "../../../stores/useSettings";
const { SettingsState } = useSettingsStore();

import LoadingComment from "../../Loading/LoadingComment.vue";
const { SearchState, actionGetMoreVideoSearch, actionGetDetailSearchVideo } =
  useSearchStore();

import { useRouter } from "vue-router";
const route = useRouter();

SettingsState.isLoading = true;
await actionGetDetailSearchVideo(route.currentRoute.value.query.q);
SettingsState.isLoading = false;

// watch(
//   () => route.currentRoute.value.params.id,
//   async (newId, oldId) => {
//     if (newId !== oldId) {
//       state.initAuthor = true;
//       SettingsState.isLoading = true;
//       await actionGetAuthorInfor(newId);
//       SettingsState.isLoading = false;
//       scrollToTop();
//     }
//   }
// );

const isLoading = ref(false);

const dataSearchItems = computed(() => {
  return SearchState.VideoDetail.items;
});

const handleLoadMoreSearchVideos = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  const res = await actionGetMoreVideoSearch(
    SearchState.VideoDetail.nextpage,
    SearchState.searchQuery
  );
  if (res) {
    SearchState.VideoDetail.nextpage = res.nextpage;
    SearchState.VideoDetail.items = [
      ...SearchState.VideoDetail.items,
      ...res.items,
    ];
  }
  isLoading.value = false;
};

const loadMoreData = async () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
    handleLoadMoreSearchVideos();
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
  <div>
    <div
      class="flex mb-[20px]"
      v-for="(item, index) in dataSearchItems"
      :key="index"
    >
      <router-link :to="item.url">
        <div class="max-w-[360px] max-h-[201px] min-w-[360px]">
          <div
            class=""
            :class="{
              'w-full rounded-full flex justify-center': item.type == 'channel',
            }"
          >
            <img
              :src="item.thumbnail"
              alt="thumbnail video"
              class="w-full h-full block cover rounded-2xl bg-[#313131] min-h-[180px]"
              :class="{
                'w-full h-full block cover max-h-[136px] max-w-[136px] bg-white rounded-full !min-h-[120px]':
                  item.type == 'channel',
              }"
            />
          </div>
        </div>
      </router-link>

      <router-link :to="item.url">
        <div class="ml-[20px]">
          <div class="flex items-center">
            <h2 class="text-white font-normal text-lg">
              {{ item.title }}
            </h2>
            <h2
              v-if="item.type == 'channel'"
              class="text-white font-normal text-lg"
            >
              {{ item.name }}
            </h2>

            <div
              class="max-w-[14px] ml-[4px] translate-y-[0.8px]"
              v-if="item.verified"
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                focusable="false"
                style="
                  pointer-events: none;
                  display: block;
                  width: 100%;
                  height: 100%;
                "
              >
                <path
                  fill="white"
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"
                ></path>
              </svg>
            </div>
          </div>
          <div v-if="item.type != 'channel'" class="flex items-center mt-1">
            <p class="text-[#b1b1b1] text-[13px] font-normal">
              {{ formatViews(item.views) }} lượt xem
            </p>
            <span
              class="block w-[3px] h-[3px] bg-[#a5a4a4] rounded-full mx-2"
            ></span>
            <p
              class="text-[#b1b1b1] text-[13px] font-normal"
              v-if="item.uploadedDate"
            >
              {{ convertRelativeTimeToVietnamese(item.uploadedDate) }}
            </p>
          </div>
          <div class="flex items-center mt-1" v-if="item.type == 'channel'">
            <p class="text-[#b1b1b1] text-[13px] font-normal">
              {{ formatViews(item.subscribers) }} Người đăng ký
            </p>
            <span
              v-if="item.type != 'channel'"
              class="block w-[3px] h-[3px] bg-[#a5a4a4] rounded-full mx-2"
            ></span>
            <p
              class="text-[#b1b1b1] text-[13px] font-normal"
              v-if="item.uploadedDate"
            >
              {{ convertRelativeTimeToVietnamese(item.uploadedDate) }}
            </p>
          </div>
          <div
            class="flex items-center mt-[20px]"
            v-if="item.type != 'channel'"
          >
            <div class="w-[24px] h-[24px] rounded-full bg-white">
              <img
                :src="item.uploaderAvatar"
                alt="avatar author"
                class="rounded-full h-full w-full"
              />
            </div>
            <router-link :to="item.uploaderUrl">
              <p
                class="text-[#b1b1b1] ml-[10px] text-[13px] font-semibold hover:text-[#ffffff] transition-colors"
              >
                {{ item.uploaderName }}
              </p>
            </router-link>
          </div>
          <p
            class="text-[#b1b1b1] text-[13px] line-clamp-1 font-semibold mt-[20px]"
            v-if="item.type != 'channel'"
          >
            {{ item.shortDescription }}
          </p>

          <p
            class="text-[#b1b1b1] text-[13px] line-clamp-2 font-semibold mt-2"
            v-if="item.type == 'channel'"
          >
            {{ item.description }}
          </p>
        </div>
      </router-link>
    </div>
    <div
      v-if="isLoading"
      class="h-[50px] flex items-center relative justify-center"
    >
      <LoadingComment />
    </div>
  </div>
</template>
