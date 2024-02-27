<template>
    <CommonsBreadcrumb :breads = breads />
    <FormsCreateUser/>
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
