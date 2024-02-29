<template>
    <section class="p-5">
        <CommonsBreadcrumb :breads="breads" />
        <FormsSearch />
        <TabsSearchUser/>
        <ModalsGeneralModalSlot :id="3">
            <SlotsCreatePayment/>
        </ModalsGeneralModalSlot>
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