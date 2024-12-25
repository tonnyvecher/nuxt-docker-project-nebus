<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
import { createPinia, setActivePinia } from "pinia";

const pinia = createPinia();
setActivePinia(pinia);
</script>
<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}
</style>
