<template>
    <section class="p-5">
        <CommonsBreadcrumb :breads="breads" />
        <FormsSearch />
        <TabsSearchUser/>
    </section>
</template>
<script lang="ts" setup>
const breads = [
    {
        title: "Inicio",
        icon: "material-symbols:location-home"
    },
    {
        title: "Pagos",
        icon: "material-symbols:payments-sharp"
    }
]
</script>