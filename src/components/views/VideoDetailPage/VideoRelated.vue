<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useDetailVideoStore } from "../../../stores/useDetailVideo";
import { formatViews } from "../../../composables/formatViews";
import { formatDuration } from "../../../composables/formatDuration";
import { convertRelativeTimeToVietnamese } from "../../../composables/formatDate";
const {
  state,
  actionGetDetailReplyComments,
  actionGetNextComment,
  actionGetMoreComments,
} = useDetailVideoStore();
const data = computed(() => {
  return state.isDetailVideos.relatedStreams;
});
</script>

<template>
  <div class="w-full mb-[20px]" v-for="(item, index) in data" :key="index">
    <router-link :to="item.url">
      <div class="flex cursor-pointer">
        <div class="w-[45%] relative min-h-[70px] max-h-[100px]">
          <img
            :src="item.thumbnail"
            alt="thumbnail img"
            class="rounded-xl object-cover w-full h-full bg-[#313131] min-h-[100px] text-transparent"
          />
          <div
            v-if="item.type === 'playlist'"
            class="bg-[#00000CCC] absolute h-[25px] left-0 w-full bottom-0 rounded-b-xl"
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
                d="M10.5 14.41V9.6l4.17 2.4-4.17 2.41zM8.48 8.45l-.71-.7C6.68 8.83 6 10.34 6 12s.68 3.17 1.77 4.25l.71-.71C7.57 14.64 7 13.39 7 12s.57-2.64 1.48-3.55zm7.75-.7-.71.71c.91.9 1.48 2.15 1.48 3.54s-.57 2.64-1.48 3.55l.71.71C17.32 15.17 18 13.66 18 12s-.68-3.17-1.77-4.25zM5.65 5.63l-.7-.71C3.13 6.73 2 9.24 2 12s1.13 5.27 2.95 7.08l.71-.71C4.02 16.74 3 14.49 3 12s1.02-4.74 2.65-6.37zm13.4-.71-.71.71C19.98 7.26 21 9.51 21 12s-1.02 4.74-2.65 6.37l.71.71C20.87 17.27 22 14.76 22 12s-1.13-5.27-2.95-7.08z"
              ></path>
            </svg>
          </div>
          <div>
            <div
              v-if="item.duration <= 0"
              class="bg-red-500 inline-block absolute bottom-2 right-1 px-[5px] rounded-md"
            >
              <span class="text-white text-[14px] flex items-center">
                <div class="translate-y-[1px] mr-1">
                  <svg
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    focusable="false"
                    style="pointer-events: none; display: block"
                  >
                    <path
                      fill="white"
                      d="M9 8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Zm1.11 2.13.71.71C11.55 10.11 12 9.11 12 8c0-1.11-.45-2.11-1.18-2.84l-.71.71c.55.55.89 1.3.89 2.13 0 .83-.34 1.58-.89 2.13Zm-4.93.71.71-.71C5.34 9.58 5 8.83 5 8c0-.83.34-1.58.89-2.13l-.71-.71C4.45 5.89 4 6.89 4 8c0 1.11.45 2.11 1.18 2.84Zm7.05 1.41.71.71C14.21 11.69 15 9.94 15 8s-.79-3.69-2.06-4.96l-.71.71C13.32 4.84 14 6.34 14 8c0 1.66-.68 3.16-1.77 4.25Zm-9.17.71.71-.71C2.68 11.16 2 9.66 2 8c0-1.66.68-3.16 1.77-4.25l-.71-.71C1.79 4.31 1 6.06 1 8s.79 3.69 2.06 4.96Z"
                    ></path>
                  </svg>
                </div>

                Trực tiếp</span
              >
            </div>
            <div
              v-else
              class="bg-[#00000C] inline-block absolute bottom-1 right-1 px-[5px] rounded-md"
            >
              <span
                v-if="item.type === 'stream'"
                class="text-white text-[14px]"
                >{{ formatDuration(item.duration) }}</span
              >
            </div>
          </div>
        </div>
        <div class="ml-[10px] w-[55%]">
          <h1
            v-if="item.type === 'stream'"
            class="text-[14px] mb-[3px] font-roboto text-[#f1f1f1] font-semibold line-clamp-2"
          >
            {{ item.title }}
          </h1>
          <h1
            v-if="item.type === 'playlist'"
            class="text-[14px] mb-[3px] font-roboto text-[#f1f1f1] font-semibold line-clamp-2"
          >
            {{ item.name }}
          </h1>

          <router-link v-if="item.uploaderUrl" :to="item.uploaderUrl">
            <div class="flex items-center">
              <p
                class="text-[13px] line-clamp-1 font-roboto text-[#a4a2a2] font-normal z-10 hover:text-white transition-colors"
              >
                {{ item.uploaderName }}
              </p>

              <div
                class="max-w-[14px] ml-[4px] translate-y-[0.5px]"
                v-if="item.uploaderVerified"
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
          </router-link>

          <p
            v-if="item.type === 'stream'"
            class="text-[13px] font-roboto text-[#a4a2a2] font-normal flex items-center"
          >
            <span
              >{{ formatViews(item.views) }}
              <span v-if="!item.uploadedDate || item.views < 1000"
                >lượt xem</span
              >
            </span>
            <span
              v-if="item.type === 'stream' && item.uploadedDate"
              class="w-[3px] mx-[5px] h-[3px] rounded-full bg-[#6b6a6a] block text-[13px]"
            ></span>
            <span class="line-clamp-1 " v-if="item.uploadedDate">{{
              convertRelativeTimeToVietnamese(item.uploadedDate)
            }}</span>
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>
