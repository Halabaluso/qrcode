<template>
  <CommonsHeader />
  <main class="p-5">
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <NuxtPage />
  </main>
</template>
<script lang="ts" setup>
import type { MainMenu } from "./interfaces/props"
const menuArray:Array<MainMenu> = [
  {
    link: "/",
    title: "Crear usuarios",
    icon: "material-symbols:frame-person-sharp"
  },
  {
    link: "/myusers",
    title: "Mis usuarios",
    icon: "material-symbols:qr-code"
  }
]
const menuTitle = "Menú principal"
const generalTitle = "User QR"
provide(/* key */ 'menuArray', /* value */ menuArray)
provide("menuTitle", menuTitle)
provide("title", generalTitle)
</script>
