<template>
    <div class="breadcrumbs my-5 -ml-4">
        <ul>
            <template v-for="breads in props.breads" :key="breads.title">
                <li><Icon :name = "breads.icon" class="mr-2 text-xl"/> {{ breads.title }}</li>
            </template>
        </ul>
    </div>
</template>
<script setup lang = "ts">
    import type { Breadcrumbs } from "../../interfaces/props"
    const props = defineProps({
        breads: Array<Breadcrumbs>
    })
</script>
