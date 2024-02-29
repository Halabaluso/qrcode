<template>
    <!--Actions table-->
    <div v-show="state.key !== ``" class="flex flex-row items-center gap-2">
        <label for="general-modal-2" class="btn btn-primary">
            <Icon name="material-symbols-light:directory-sync" class="text-xl" />
        </label>
        <label for="general-modal" class="btn btn-error">
            <Icon name="material-symbols-light:delete-rounded" class="text-xl" />
        </label>
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
                <template v-for="(item, i) in state.subscriptions" :key="i">
                    <tr v-if="i >= state.pageStart && i < (state.pageStart + state.limitPage)">
                        <th>{{ i + 1 }}</th>
                        <td><input @change="selectRow(i, item.index as string)" :id="`checktable${i}`" type="checkbox"
                                class="checkbox-primary checkbox rowstable" /></td>
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
    <!--Alert-->
    <CommonsAlerts :title="state.titleAlert" :msg="state.msgAlert" :show="state.showAlert" :type="state.typeAlert" class="mt-5"/>
    <!--Pagination Tab-->
    <div class="pagination mt-5">
        <button @click="Pagination(`back`)" class="btn">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z"
                    fill="#969696" />
            </svg>
        </button>
        <button class="btn btn-active"><span class="p-2">Página {{ state.page }}</span></button>
        <button @click="Pagination(`next`)" class="btn">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.74375 5.2448C7.41875 5.5698 7.41875 6.0948 7.74375 6.4198L10.9771 9.65314L7.74375 12.8865C7.41875 13.2115 7.41875 13.7365 7.74375 14.0615C8.06875 14.3865 8.59375 14.3865 8.91875 14.0615L12.7437 10.2365C13.0687 9.91147 13.0687 9.38647 12.7437 9.06147L8.91875 5.23647C8.60208 4.9198 8.06875 4.9198 7.74375 5.2448Z"
                    fill="#969696" />
            </svg>
        </button>
    </div>
    <!--Delete Modal-->
    <ModalsGeneralModal :title="state.deleteModalTitle" :msg="state.deleteModalMsg" :buttonTitle="state.deleteButtonTitle"
        :action="DeleteRow" />
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
    deleteButtonTitle: "Si, eliminar",

    page: 1,
    limitPage: 10,
    pageStart: 0,

    titleAlert: "No hay suscripciones.",
    msgAlert: "No se ha encontrado ninguna suscripción.",
    showAlert: false,
    typeAlert: "info"
})

const subscriptionStore = subscription()

onMounted(async () => {
    const load = push.load("Cargando...")
    const response = await ReloadRows()
    if (!response.err) {
        state.subscriptions = response.msgObject as Array<any>
        push.success("Suscripciones cargadas con éxito.")
        load.destroy()
    } else {
        state.subscriptions = []
        state.showAlert = true
        push.error("No hay suscripciones registradas.")
        load.destroy()
    }
})

const selectRow = (index: number, key: string) => {
    subscriptionStore.subscription = state.subscriptions[index] as NewSubscription
    GetSelectedIndex(index, key)
    BlockAllRows("rowstable")
    CheckRow(index)
}


const GetSelectedIndex = (index: number, key: string) => {
    state.index = index
    state.key = key
}

const CheckRow = (index: number) => {
    const selectedRow: any = document.querySelector(`#checktable${index}`)
    selectedRow.checked = "true"
}

const BlockAllRows = (select: string) => {
    const allRowsDom = document.querySelectorAll(`.${select}`)
    allRowsDom.forEach((element: any) => {
        element.checked = false
    })
}

const ReloadRows = async () => {
    const response = await state.subscription.GetSubscriptionsDb("/api/rest", "GET")
    return response
}

const DeleteRow = async () => {
    const load = push.load("Cargando...")
    const response = await state.subscription.DeleteSubscriptionFromDb(state.key)
    if (!response.err) {
        push.success("Suscripción borrada con éxito.")
        const response = await ReloadRows()
        state.subscriptions = response.msgObject
        load.destroy()
        BlockAllRows("rowstable")
    } else {
        state.subscriptions = []
        state.showAlert = true
        push.error("No hay ningúna suscripción.")
        load.destroy()
    }
}

const Pagination = (type: "back" | "next") => {
    if (type === "back") {
        if (state.page > 1) {
            state.page -= 1
            state.pageStart -= state.limitPage
        }
    } else {
        if ((state.subscriptions.length - state.limitPage) > (state.pageStart)) {
            state.page += 1
            state.pageStart += state.limitPage
        }
    }
}

</script>