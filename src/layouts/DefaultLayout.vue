<script setup>
import Header from "../components/Header/Header.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import SidebarIcon from "../components/Sidebar/SidebarIcon.vue";
import { useSideBarStore } from "../stores/sidebar";
const { state } = useSideBarStore();

import LoadingBar from "../components/Loading/LoadingBar.vue";
import { useSettingsStore } from "../stores/useSettings";

const { SettingsState } = useSettingsStore();
</script>

<template>
  <LoadingBar :loading="SettingsState.isLoading" />

  <Header />
  <div class="flex">
    <Sidebar />
    <SidebarIcon />
    <div
      class="mt-[75px] mr-[40px] w-full"
      :class="{ 'ml-[100px]': state.isSidebar, 'ml-[250px]': !state.isSidebar }"
    >
      <slot />
    </div>
  </div>
  <div></div>
  <h1>Footer</h1>
</template>
