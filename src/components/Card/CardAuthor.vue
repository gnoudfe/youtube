<script setup>
import { formatDuration } from "../../composables/formatDuration";
import { formatViews } from "../../composables/formatViews";
const props = defineProps({
  data: Array,
});
import { useSettingsStore } from "../../stores/useSettings";
const { SettingsState } = useSettingsStore();
</script>

<template>
  <div class="flex items-center flex-wrap">
    <div
      v-for="(item, index) in props.data"
      :key="index"
      class="w-[25%] px-[8px] mb-[44px]"
    >
      <div class="w-full">
        <router-link :to="item.url">
          <div class="relative">
            <img
              :src="item.thumbnail"
              alt="thumbnail video"
              class="rounded-2xl w-full bg-[#313131] min-h-[190px] "
            />
            <div
              class="bg-[#00000C] inline-block absolute bottom-2 right-1 px-[5px] rounded-md"
            >
              <span class="text-white text-[14px]">{{
                formatDuration(item.duration)
              }}</span>
            </div>
          </div>
          <div class="flex mt-[20px]  min-h-[70px]">
            <div class="ml-[10px] relative">
              <h2
                class="text-[#f1f1f1] text-base font-semibold min-h-[20px] line-clamp-2 w-[250px]"
              >
                {{ item.title }}
              </h2>
              <div>
                <div>
                  <div
                    class="text-sm text-[#AAAAAA] flex items-center mt-[3px]"
                  >
                    <span class="block"> {{ formatViews(item.views) }}</span>
                    <span
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


