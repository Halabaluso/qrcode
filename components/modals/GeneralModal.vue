<template>
    <input class="modal-state" id="general-modal" type="checkbox" />
    <div class="modal">
        <label class="modal-overlay" for="general-modal"></label>
        <div class="modal-content flex flex-col gap-5">
            <label for="general-modal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <h2 class="text-xl">{{ props.title }}</h2>
            <span>{{ props.msg }}</span>
            <div class="flex gap-3">
                <label for="general-modal" @click="props.action" class="btn btn-error btn-block">{{ props.buttonTitle }}</label>
                <label for="general-modal" class="btn btn-block">Atrás</label>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        title: String,
        msg: String,
        buttonTitle: String,
        action: Function
    })
</script>