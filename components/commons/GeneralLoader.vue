<template>
      <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>
</template>
<script setup lang="ts">
import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'
import { useGlobalLoader } from 'vue-global-loader'
</script>