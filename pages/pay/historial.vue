<template>
    <section class="p-5">
        <CommonsBreadcrumb :breads="breads" />
        <StatsGeneralStats/>
    </section>
</template>
<script lang="ts" setup>
const breads = [
    {
        title: "Inicio",
        icon: "material-symbols:location-home"
    },
    {
        title: "Historial usuario",
        icon: "gridicons:stats-down-alt"
    }
]
</script>