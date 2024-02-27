<template>
    <CommonsBreadcrumb :breads="breads"/>
    <TabsQrTab/>
</template>
<script lang = "ts" setup>
        const breads = [
        {
            title: "Inicio",
            icon: "material-symbols:location-home"
        },
        {
            title: "Mis usuarios",
            icon: "material-symbols:qr-code"
        }
    ]
</script>