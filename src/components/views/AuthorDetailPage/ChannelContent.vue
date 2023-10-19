<script setup>
import { ref, reactive, watchEffect, watch, computed } from "vue";
import ChannelTabContent from "./ChannelTabContent.vue";
import { useAuthorStore } from "../../../stores/useAuthor";
import { formatViews } from "../../../composables/formatViews";
import SubcribeButton from "../../Button/SubcribeButton.vue";
const { state, actionGetTabVideos } = useAuthorStore();
import { useSettingsStore } from "../../../stores/useSettings";
const { SettingsState } = useSettingsStore();
const isTabsHover = ref(false);
const isBaseCardActive = ref(true);
const isLiveStreams = ref(false);
const isPlaylist = ref(false);
const isAbout = ref(false);
const isShorts = ref(false);
const isAuthorSubcribe = ref(false);

const tabs = computed(() => {
  const tabsCopy = [...state.AuthorInfor.tabs];
  tabsCopy.forEach((tab) => {
    switch (tab.name) {
      case "livestreams":
        tab.name = "Sự kiện phát trực tiếp";
        break;
      case "shorts":
        tab.name = "Shorts";
        break;
      case "playlists":
        tab.name = "Danh sách phát";
        break;
      case "channels":
        tab.name = "Kênh";
        break;
      default:
        break;
    }
  });
  return [
    {
      id: 1,
      name: "Videos",
      isActive: true,
    },
    ...tabsCopy,
    {
      id: 2,
      name: "Giới thiệu",
      isActive: false,
    },
  ];
});

const handleTabClick = async (tab, index) => {
  tab.isActive = true;

  if (tab.data) {
    SettingsState.isLoading = true;
    await actionGetTabVideos(tab.data);
    SettingsState.isLoading = false;
  }
  if (tab.name === "Videos") {
    isBaseCardActive.value = true;
    isLiveStreams.value = false;
    isPlaylist.value = false;
    isAbout.value = false;
    isAuthorSubcribe.value = false;
    isShorts.value = false;
  } else if (tab.name === "Sự kiện phát trực tiếp") {
    isBaseCardActive.value = false;
    isLiveStreams.value = true;
    isPlaylist.value = false;
    isAbout.value = false;
    isAuthorSubcribe.value = false;
    isShorts.value = false;
  } else if (tab.name === "Danh sách phát") {
    isBaseCardActive.value = false;
    isLiveStreams.value = false;
    isAbout.value = false;
    isPlaylist.value = true;
    isAuthorSubcribe.value = false;
    isShorts.value = false;
  } else if (tab.name === "Giới thiệu") {
    isBaseCardActive.value = false;
    isLiveStreams.value = false;
    isPlaylist.value = false;
    isAbout.value = true;
    isAuthorSubcribe.value = false;
    isShorts.value = false;
  } else if (tab.name === "Shorts") {
    isShorts.value = true;
    isBaseCardActive.value = false;
    isLiveStreams.value = false;
    isPlaylist.value = false;
    isAbout.value = false;
    isAuthorSubcribe.value = false;
  } else if (tab.name === "Kênh") {
    isAuthorSubcribe.value = true;
    isShorts.value = false;
    isBaseCardActive.value = false;
    isLiveStreams.value = false;
    isPlaylist.value = false;
    isAbout.value = false;
  }

  tabs.value.forEach((t) => {
    if (t !== tab) {
      t.isActive = false;
    }
  });
};
const GoToAboutTab = () => {
  isBaseCardActive.value = false;
  isLiveStreams.value = false;
  isPlaylist.value = false;
  isAbout.value = true;
  isAuthorSubcribe.value = false;
  isShorts.value = false;
  tabs.value[tabs.value.length - 1].isActive = true;
  tabs.value.forEach((t) => {
    if (t !== tabs.value[tabs.value.length - 1]) {
      t.isActive = false;
    }
  });
};

watch(
  () => state.initAuthor,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      isBaseCardActive.value = true;
      isLiveStreams.value = false;
      isPlaylist.value = false;
      isAbout.value = false;
      isAuthorSubcribe.value = false;
      isShorts.value = false;
      tabs.value.forEach((t) => {
        t.isActive = false;
      });
      tabs.value[0].isActive = true;
    }
  }
);
</script>

<template>
  <div>
    <div>
      <div class="" v-if="state.AuthorInfor.bannerUrl">
        <img
          :src="state.AuthorInfor?.bannerUrl"
          alt="background img author"
          class="w-full h-full block rounded-xl"
        />
      </div>
      <div class="flex mt-12 items-center">
        <div class="rounded-full w-[20%]">
          <img
            :src="state.AuthorInfor?.avatarUrl"
            alt="user avatar"
            class="rounded-full block w-full"
          />

        </div>
        <div class="ml-8 w-[80%]">
          <h1 class="text-white text-[36px] font-semibold">
            {{ state.AuthorInfor.name }}
          </h1>
          <div class="text-[#aaaaaa] flex items-center text-[15px]">
            @{{ state.AuthorInfor.name }}

            <p class="block w-1 h-1 rounded-full bg-[#aaaaaa] mx-[5px]"></p>
            <p>
              {{ formatViews(state.AuthorInfor.subscriberCount) }}
              <span class="text-[13p4px]">Người đăng ký</span>
            </p>
          </div>
          <div
            class="mt-[8px] flex items-center cursor-pointer"
            @click="GoToAboutTab"
          >
            <p class="text-[#aaaaaa] text-[14px] line-clamp-1 max-w-[220px]">
              {{
                state.AuthorInfor.description
                  ? state.AuthorInfor.description
                  : "Tìm hiểu thêm về kênh này"
              }}
            </p>
            <div>
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
                  transform: translateY(1px);
                "
              >
                <path
                  fill="#aaaaaa"
                  d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="mt-5">
            <SubcribeButton />
          </div>
        </div>
      </div>
    </div>
    <div></div>

    <div class="mt-5">
      <div class="flex items-center">
        <div
          class="h-[60px] mr-10 flex items-center justify-center cursor-pointer"
          v-for="(tab, index) in tabs"
          :key="tab.id"
          @click="handleTabClick(tab, index)"
          @mouseover="isTabsHover = tab"
          @mouseout="isTabsHover = null"
          :class="{
            'border-b-2 border-white': tab.isActive,
            'border-b-2 border-[#aaaaaa]': isTabsHover === tab,
          }"
        >
          <span class="text-[#aaaaaa] font-semibold">{{ tab.name }}</span>
        </div>
      </div>
    </div>
    <div class="h-[2px] w-full bg-[#5c5b5b]"></div>
    <div class="mt-8">
      <ChannelTabContent
        :isBaseCardActive="isBaseCardActive"
        :isLiveStreams="isLiveStreams"
        :isPlaylist="isPlaylist"
        :isAbout="isAbout"
        :isShorts="isShorts"
        :isAuthorSubcribe="isAuthorSubcribe"
      />
    </div>
  </div>
</template>
