<template>
    <input class="modal-state" :id="`general-modal-${id}`" type="checkbox" />
    <div class="modal">
        <label class="modal-overlay" :for="`general-modal-${id}`"></label>
        <div class="modal-content flex flex-col gap-5">
            <label :for="`general-modal-${id}`" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <div>
                <slot></slot> 
            </div>
            <div class="flex justify-end">
                <label :for = "`general-modal-${id}`" class = "btn btn-block btn-error">Cerrar</label>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        id: Number,
    })
</script>