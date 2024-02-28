<template>
    <input type="checkbox" id="main-menu" class="drawer-toggle" />
    <label for="main-menu" class="p-2 cursor-pointer">
        <Icon name="material-symbols:menu-rounded" class="text-xl" />
    </label>
    <label class="overlay" for="main-menu"></label>
    <div class="drawer">
        <div class="drawer-content pt-10 flex flex-col h-full">
            <label for="main-menu" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <div>
                <h2 class="text-xl font-medium mb-5">{{ title }}</h2>
                <CommonsNav/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const title: string = inject('title') as string
</script>