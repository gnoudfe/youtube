<script setup>
import { ref, computed } from "vue";
import { useTrendingStore } from "../../stores/useTrendingVideo";
import { formatDuration } from "../../composables/formatDuration";
import { formatViews } from "../../composables/formatViews";
import { convertRelativeTimeToVietnamese } from "../../composables/formatDate";
const { StateTrending } = useTrendingStore();
const trendingVideos = computed(() => {
  return StateTrending.VideoTrendings;
});

const isLoading = ref(false);
const isToolkitAuthor = ref(null);
const ShowToolKitAuthor = (index) => {
  isToolkitAuthor.value = index;
};
const HideToolKitAuthor = () => {
  isToolkitAuthor.value = null;
};
</script>

<template>
  <div class="flex items-center flex-wrap">
    <div
      v-for="(video, index) in trendingVideos"
      :key="index"
      class="w-[25%] px-[8px] mb-[44px]"
    >
      <div class="w-full">
        <router-link :to="video.url" v-if="video.url">
          <div class="relative">
            <img
              :src="video.thumbnail"
              alt="thumbnail video"
              class="rounded-2xl min-h-[190px] w-full h-full bg-[#313131]"
            />
            <div
              class="bg-[#00000C] inline-block absolute bottom-2 right-1 px-[5px] rounded-md"
            >
              <span class="text-white text-[14px]">{{
                formatDuration(video.duration)
              }}</span>
            </div>
          </div>
          <div class="flex mt-[20px] min-h-[70px]">
            <router-link :to="video.uploaderUrl" v-if="video.uploaderUrl">
              <div
                class="max-w-[36px] max-h-[36px] rounded-full flex items-center justify-center z-100"
              >
                <img
                  class="w-full h-full rounded-full loading"
                  :src="video.uploaderAvatar"
                  alt="avatar author"
                />
              </div>
            </router-link>

            <div class="ml-[10px] relative">
              <h2
                class="text-[#f1f1f1] text-base font-semibold min-h-[20px] line-clamp-2 w-[250px]"
              >
                {{ video.title }}
              </h2>
              <div>
                <div
                  class="min-h-[20px] mt-[10px] w-[150px]"
                  v-if="isLoading"
                ></div>
                <div>
                  <router-link :to="video.uploaderUrl" v-if="video.uploaderUrl">
                    <p
                      class="absolute bg-[#616161] text-[#ffffff] opacity-0 transition-opacity duration-[0.3s] text-[13px] px-[10px] py-[6px] rounded-md top-[-20px]"
                      :class="{ 'opacity-100': isToolkitAuthor === index }"
                    >
                      {{ video.uploaderName }}
                    </p>

                    <p
                      class="text-sm text-[#AAAAAA] mt-[3px] hover:text-[white] inline-block z-10"
                      @mouseover="ShowToolKitAuthor(index)"
                      @mouseout="HideToolKitAuthor"
                    >
                      {{ video.uploaderName }}
                    </p>
                  </router-link>

                  <div
                    class="text-sm text-[#AAAAAA] flex items-center mt-[3px]"
                  >
                    <span class="block"
                      >{{ formatViews(video.views) }} lượt xem</span
                    >
                    <span
                      class="block w-[4px] h-[4px] bg-[#AAAAAA] rounded-full mx-[7px]"
                    ></span>
                    <span class="block" v-if="video.uploadedDate">{{
                      convertRelativeTimeToVietnamese(video.uploadedDate)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  position: relative;
  background: #313131;
}
</style>
