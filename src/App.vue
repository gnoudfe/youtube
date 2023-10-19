<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <Suspense>
    <div>
      <component :is="$route.meta.layout">
        <RouterView />
      </component>
    </div>
  </Suspense>
</template>
<style scoped></style>
