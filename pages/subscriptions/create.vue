<template>
    <CommonsTabs :arrayTabs = "arrayTabs"/>
    <CommonsBreadcrumb :breads="breads"/>
    <FormsCreateSuscription/>
</template>
<script setup lang="ts">
    import type { Tabs } from "../../interfaces/props"
    const arrayTabs: Array<Tabs> = [
        {
            title: "Crear suscripción",
            link: "/subscriptions/create",
            icon: "material-symbols:add-circle",
            active: true
        },
        {
            title: "Mis suscripciones",
            link: "/subscriptions/table",
            icon: "eos-icons:product-subscriptions",
            active: false
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