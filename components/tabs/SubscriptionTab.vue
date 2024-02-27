<template>
    <!--Actions table-->
    <div v-show="state.key !== ``" class="flex flex-row items-center gap-2">
        <label for="general-modal-2" class="btn btn-primary"><Icon name = "material-symbols-light:directory-sync" class="text-xl"/></label>
        <label for = "general-modal" class="btn btn-error"><Icon name = "material-symbols-light:delete-rounded" class="text-xl"/></label>
    </div>
    <!--Table-->
    <div class="flex w-full overflow-x-auto mt-5">
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Nombre</th>
                    <th>Periodo</th>
                    <th>Renovación</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item,i) in state.subscriptions" :key="i">
                    <tr>
                        <th>{{ i+1 }}</th>
                        <td><input @change="selectRow(i, item.index as string)" :id = "`checktable${i}`" type="checkbox" class="checkbox-primary checkbox rowstable"/></td>
                        <td>
                            {{ item.name }}
                        </td>
                        <td>
                            {{ item.duration }}
                        </td>
                        <td>
                            <p v-show="item.renew">Automático</p>
                            <p v-show="!item.renew">Manual</p>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <!--Delete Modal-->
    <ModalsGeneralModal :title="state.deleteModalTitle" :msg="state.deleteModalMsg" :buttonTitle="state.deleteButtonTitle" :action="DeleteRow"/>
</template>
<script setup lang = "ts">
import type { NewSubscription } from "~/interfaces/db";
import type { HeaderTable } from "../../interfaces/props"
import { subscription } from "../../stores/suscription"
import { Subscription } from "~/classes/Susbscription";

const state = reactive({
    subscription: new Subscription(),
    subscriptions: [] as Array<NewSubscription>,
    index: 0 as number,
    key: "" as string,

    deleteModalTitle: "Eliminar suscripción" as string,
    deleteModalMsg: "¿Estás seguro de que deseas eliminar la suscripción?" as string,
    deleteButtonTitle: "Si, eliminar"
})

const subscriptionStore = subscription()

onMounted(async () => {
    const response = await ReloadRows()
    state.subscriptions = response.msgObject as Array<any>
})

const selectRow = (index:number, key: string) => {
    subscriptionStore.subscription = state.subscriptions[index] as NewSubscription
    GetSelectedIndex(index, key)
    BlockAllRows("rowstable")
    CheckRow(index)
}


const GetSelectedIndex = (index: number, key: string) => {
    state.index = index
    state.key = key
}

const CheckRow = (index:number) => {
    const selectedRow:any = document.querySelector(`#checktable${index}`)
    selectedRow.checked = "true"
}

const BlockAllRows = (select: string) => {
    const allRowsDom = document.querySelectorAll(`.${select}`)
    allRowsDom.forEach((element:any) => {
        element.checked = false
    })
}

const ReloadRows = async () => {
    const response = await state.subscription.GetSubscriptionsDb("/api/rest", "GET")
    return response
}

const DeleteRow = async () => {
    const response = await state.subscription.DeleteSubscriptionFromDb(state.key)
    if(!response.err){
        push.success("Suscripción borrada con éxito.")
        const response = await ReloadRows()
        state.subscriptions = response.msgObject
    }else{
        push.error("Problema al borrar suscripción.")
    }
}

</script>