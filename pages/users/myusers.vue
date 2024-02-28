<template>
    <section class="p-5">
        <CommonsBreadcrumb :breads="breads" />
        <TabsQrTab />
    </section>
        <ModalsGeneralModalSlot :id="1">
            <SlotsUpdateUser />
        </ModalsGeneralModalSlot>
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