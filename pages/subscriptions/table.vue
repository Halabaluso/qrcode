<template>
    <section class="p-5">
        <CommonsTabs :arrayTabs="arrayTabs" />
        <CommonsBreadcrumb :breads="breads" />
        <TabsSubscriptionTab />
    </section>
    <ModalsGeneralModalSlot :id="2">
        <SlotsUpdateSubscription />
    </ModalsGeneralModalSlot>
</template>
<script setup lang="ts">
import { Subscription } from "~/classes/Susbscription";
import type { Tabs, HeaderTable } from "../../interfaces/props"
import type { NewSubscription } from "../../interfaces/db"

interface SimpleItem {
    nombre: string,
    dias: number,
    renovacion: string
}

const arrayTabs: Array<Tabs> = [
    {
        title: "Crear suscripción",
        link: "/subscriptions",
        icon: "material-symbols:add-circle",
        active: false
    },
    {
        title: "Mis suscripciones",
        link: "/subscriptions/table",
        icon: "eos-icons:product-subscriptions",
        active: true
    }
]

const breads = [
    {
        title: "Inicio",
        icon: "material-symbols:location-home"
    },
    {
        title: "Suscripciones",
        icon: "pixelarticons:subscriptions"
    }
]





</script>