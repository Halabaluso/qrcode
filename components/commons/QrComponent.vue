<template>
  <qrcode-vue :value="state.value" :size="300" :level="level" :render-as="renderAs" class="rounded-lg"/>
</template>
<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs } from "qrcode.vue"

const state = reactive({
  value: inject("qrString") as string
})


const level = ref<Level>('H')
const renderAs = ref<RenderAs>('canvas')
</script>