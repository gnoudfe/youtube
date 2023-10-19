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
      class="w-[20%] px-[8px] mb-[44px]"
    >
      <div class="w-full">
        <router-link :to="item.url">
          <div>
            <div class="relative">
              <img
                :src="item?.thumbnail"
                alt="thumbnail video"
                class="rounded-2xl w-full bg-[#313131]  min-h-[127px]"
              />
              <div
                class="bg-[#292929] flex items-center py-[2px] absolute bottom-2 right-1 px-[5px] rounded-md"
              >
                <div class="mr-[5px]">
                  <svg
                    height="22"
                    viewBox="0 0 22 22"
                    width="22"
                    focusable="false"
                  >
                    <path
                      fill="#fff"
                      d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"
                    ></path>
                  </svg>
                </div>

                <span class="text-white text-[12px]"
                  >{{ item.videos }} videos</span
                >
              </div>
            </div>
            <div class="flex mt-[20px] min-h-[70px]">
              <div class="ml-[10px] relative">
                <h2 class="text-[#f1f1f1] text-sm font-semibold line-clamp-2">
                  {{ item.name }}
                </h2>
                <p class="text-[#AAAAAA] text-[13px] font-semibold">
                  Xem toàn bộ danh sách
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
