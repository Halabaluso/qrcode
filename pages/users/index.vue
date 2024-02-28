<template>
    <section class="p-5">
        <CommonsBreadcrumb :breads = breads />
        <FormsCreateUser/>
    </section>
</template>

<script setup lang="ts">
    
    const breads = [
        {
            title: "Inicio",
            icon: "material-symbols:location-home"
        },
        {
            title: "Nuevos usuarios",
            icon: "material-symbols:person-edit-rounded"
        }
    ]
</script>
