<script setup>
import Header from "../components/Header/Header.vue";
import SidebarDetailVideo from "../components/Sidebar/SidebarDetailVideo.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import LoadingBar from "../components/Loading/LoadingBar.vue";
import { useSettingsStore } from "../stores/useSettings";

const { SettingsState } = useSettingsStore();
</script>
<template>
  <div>
    <LoadingBar :loading="SettingsState.isLoading" />
    <Header />
    <SidebarDetailVideo />
    <div class="mt-[75px]"><slot /></div>
  </div>
</template>
