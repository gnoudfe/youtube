<script setup>
import { computed, ref, reactive, onMounted, inject } from "vue";
import { useDetailVideoStore } from "../../../stores/useDetailVideo";

import { formatDuration } from "../../../composables/formatDuration";
const { state } = useDetailVideoStore();
const data = computed(() => {
  return state.PlayList.relatedStreams;
});

// const chaptersList = ref(null); // Create a ref for the chapters list

// const eventBus = inject("eventBus");
// const check = (time, index, e) => {
//   state.isChapters = index;
//   if (chaptersList.value && chaptersList.value.children[index]) {
//     chaptersList.value.children[index].scrollIntoView({
//       behavior: "smooth",
//       block: "center",
//       inline: "nearest",
//     });
//   }
//   eventBus.emit("time-updated", time);
// };
</script>

<template>
  <div class="w-full rounded-lg border-[#616060] border mb-[40px]">
    <h2
      class="text-white block px-[20px] py-[14px] bg-[#202020] rounded-t-lg font-semibold"
    >
      {{ state.PlayList.name }}
    </h2>
    <ul ref="chaptersList" class="list-none overflow-y-scroll max-h-[550px]">
      <li
        :class="{ 'bg-[#2b2b2b]': state.isChapters === index }"
        v-for="(item, index) in data"
        :key="index"
        @click="check(chapter.start, index)"
      >
        <router-link
          :to="item.url"
          class="flex items-center hover:bg-[#353535] px-4 py-2 cursor-pointer transition-colors duration-150 ease"
        >
          <div class="max-w-[100px] max-h-[60px] relative">
            <img
              :src="item.thumbnail"
              alt="thumbnail chapters"
              class="w-full block h-full object-cover rounded-xl bg-[#313131] text-xs min-h-[50px] min-w-[100px]"
            />
            <div
              class="absolute text-white bg-black text-[11px] right-1 px-1 bottom-1 font-semibold"
            >
              {{ formatDuration(item.duration) }}
            </div>
          </div>
          <div class="ml-[15px]">
            <h3 class="text-white text-sm font-semibold line-clamp-2">
              {{ item.title }}
            </h3>
            <router-link :to="item.uploaderUrl">
              <span
                class="text-[#b9b9b9] text-xs hover:text-white transition-colors z-10"
              >
                {{ item.uploaderName }}
              </span>
            </router-link>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
