<script setup>
import { formatDuration } from "../../composables/formatDuration";
import { formatViews } from "../../composables/formatViews";
const props = defineProps({
  data: Array,
});
</script>

<template>
  <div class="flex items-center flex-wrap">
    <div
      v-for="(item, index) in props.data"
      :key="index"
      class="w-[16.6667%] px-[8px] mb-[44px]"
    >
      <div class="w-full">
        <router-link :to="item.url">
          <div class="relative">
            <img
              :src="item?.thumbnail"
              alt="thumbnail video"
              class="rounded-2xl min-h-[331px] object-contain bg-[#5e5e5e] w-full"
            />
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
                class="bg-[#00000C] inline-block absolute bottom-2 right-1 px-[5px] rounded-md"
              >
                <span class="text-white text-[14px]">{{
                  formatDuration(item.duration)
                }}</span>
              </div>
            </div>
          </div>
          <div class="flex mt-[20px] min-h-[70px]">
            <div class="ml-[10px] relative">
              <h2 class="text-[#f1f1f1] text-base font-semibold line-clamp-2">
                {{ item.title }}
              </h2>
              <div>
                <div>
                  <div
                    class="text-sm text-[#AAAAAA] flex items-center mt-[3px]"
                  >
                    <span class="block">
                      {{ formatViews(item.views) }} lượt xem</span
                    >
                    <span
                      v-if="item.uploadedDate"
                      class="block w-[4px] h-[4px] bg-[#AAAAAA] rounded-full mx-[7px]"
                    ></span>
                    <span class="block">{{ item.uploadedDate }}</span>
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
