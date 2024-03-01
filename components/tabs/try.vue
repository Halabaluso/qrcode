<template>
    <div>
        <p>{{ name }}</p>
        <p>{{ lastname }}</p>
        <p>{{ age }}</p>
    </div>
    <div>
        <p>{{ state.name }}</p>
        <p>{{ state.lastname }}</p>
        <p>{{ state.age }}</p>
    </div>
</template>

<script lang="ts" setup>
    const name: Ref<string> = ref("")
    const lastname: Ref<string> = ref("")
    const age: Ref<number> = ref(0)

    const state = reactive({
        name: "" as string,
        lastname: "" as string,
        age: 0 as number
    })
</script>