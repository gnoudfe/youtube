import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const SettingsState = reactive({
    isOpenSubstile : false,
    isLoading : false
  });

  return { SettingsState };
});
