<script setup>
import { computed, ref, reactive, onMounted, inject } from "vue";
import { useDetailVideoStore } from "../../../stores/useDetailVideo";
import { formatDuration } from "../../../composables/formatDuration";
const { state } = useDetailVideoStore();
const chapters = computed(() => {
  return state.isDetailVideos.chapters;
});
const chaptersList = ref(null); // Create a ref for the chapters list

const eventBus = inject("eventBus");
const check = (time, index, e) => {
  state.isChapters = index;
  if (chaptersList.value && chaptersList.value.children[index]) {
    chaptersList.value.children[index].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }
  eventBus.emit("time-updated", time);
};
</script>

<template>
  <div
    class="w-full rounded-lg border-[#616060] border mb-[40px]"
    v-if="state.isDetailVideos.chapters.length !== 0"
  >
    <h2
      class="text-white block px-[20px] py-[14px] bg-[#202020] rounded-t-lg font-semibold"
    >
      Đoạn video có tiêu đề
    </h2>
    <ul ref="chaptersList" class="list-none overflow-y-scroll max-h-[550px]">
      <li
        :class="{ 'bg-[#2b2b2b]': state.isChapters === index }"
        class="flex items-center hover:bg-[#353535] px-4 py-2 cursor-pointer transition-colors duration-150 ease"
        v-for="(chapter, index) in chapters"
        :key="index"
        @click="check(chapter.start, index)"
      >
        <div class="max-w-[100px] max-h-[60px]">
          <img
            :src="chapter.image"
            alt="thumbnail chapters"
            class="w-full block h-full object-cover rounded-xl bg-[#313131] text-xs min-h-[50px]"
          />
        </div>
        <div class="ml-[15px]">
          <h3 class="text-white text-sm font-semibold line-clamp-2">
            {{ chapter.title }}
          </h3>
          <span class="text-[#3ea6ff] text-xs bg-[#000000]">{{
            formatDuration(chapter.start)
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
