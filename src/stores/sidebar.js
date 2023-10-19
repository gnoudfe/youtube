import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSideBarStore = defineStore("sidebar", () => {
  const state = reactive({
    isSidebar: false,
    isSidebarVideo : false,
  });

  return { state };
});
