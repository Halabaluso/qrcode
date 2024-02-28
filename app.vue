<template>
  <CommonsHeader v-show="authStore.auth"/>
  <main>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <NuxtPage />
  </main>
</template>
<script lang="ts" setup>
import type { Navs } from "./interfaces/props"
import { auth } from "./stores/auth"
const authStore = auth()
const menu:Array<Navs> = [
  {
    title: "Usuarios y clientes",
    navs: [
      {
        link: "/users",
        title: "Crear usuarios",
        icon: "material-symbols:frame-person-sharp"
      },
      {
        link: "/users/myusers",
        title: "Mis usuarios",
        icon: "material-symbols:qr-code"
      }
    ]
  },
  {
    title: "Suscripciones y pagos",
    navs: [
      {
        link: "/subscriptions",
        title: "Mis suscripciones",
        icon: "eos-icons:product-subscriptions-outlined"
      },
      {
        link: "/pay",
        title: "Pagos",
        icon: "ic:outline-payments"
      },
    ]
  }
]
const generalTitle = "User QR"
provide(/* key */ 'menus', /* value */ menu)
provide("title", generalTitle)

onMounted(() => {
  if(!authStore.auth){
    useRouter().push("/")
  }
})
</script>
