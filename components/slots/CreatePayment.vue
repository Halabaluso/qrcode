<template>
    <form @submit.prevent="SetPayInUserCollection">
        <h1 class="font-bold text-xl text-primary mb-5">
            <Icon name="eos-icons:activate-subscriptions" class="mr-2" />Nuevo pago
        </h1>
        <div class="grid grid-cols-1 md:gap-5 gap-3">
            <div class="form-field min-w-60">
                <label class="form-label">
                    Suscripción<span class="dot dot-error"></span>
                </label>
                <select v-model="state.subscriptionIndex" class="select select-block">
                    <option selected value="false">Sin suscripción</option>
                    <option v-for="subscription in state.subscriptions" :value="subscription.index">{{ subscription.name }}
                    </option>
                </select>
            </div>
            <div v-show="state.subscriptionIndex === `false`" class="form-field">
                <label class="form-label">
                    Precio (en €)<span class="dot dot-error"></span>
                </label>
                <input v-model="state.price" placeholder="Precio" type="number" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Método de pago<span class="dot dot-error"></span>
                </label>
                <select v-model="state.payMethod" class="select select-block">
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="bizum">Bizum</option>
                    <option value="transferencia bancaria">Transferencia bancaria</option>
                </select>
            </div>
        </div>
        <div>
            <button class="btn btn-primary btn-block mt-5">Aceptar pago
                <Icon name="material-symbols:add-task" class="ml-2 text-lg" />
            </button>
        </div>
    </form>
</template>
<script setup lang="ts">
import { Subscription } from '~/classes/Susbscription';
import { user } from "../../stores/user"
import { Pay } from '~/classes/Pay';
import type { NewSubscription } from "../../interfaces/db"
import type { PayMethod } from "../../interfaces/props"
import type { GeneralResponse } from "../../server/interfaces/dbresponses"

const state = reactive({
    subscription: new Subscription(),
    subscriptions: [] as Array<NewSubscription>,

    price: 0,

    pay: new Pay(),

    subscriptionIndex: "false" as string,
    subscriptionData: {} as NewSubscription,
    payMethod: "efectivo" as PayMethod
})

const userStore = user()

onMounted(async () => {
    await GetSubscriptionsFromDb()
})

const GetSubscriptionsFromDb = async () => {
    const loading = push.load("Cargando...")
    const response: GeneralResponse = await state.subscription.GetSubscriptionsDb("/api/rest", "GET")
    if (!response.err) {
        state.subscriptions = response.msgObject as Array<NewSubscription>
        loading.destroy()
    } else {
        loading.destroy()
    }
}

const GetSubscriptionData = (index: string): NewSubscription | undefined => {
    const find = state.subscriptions.find(element => element.index === index)
    if (find !== undefined) {
        state.subscriptionData = find
    }
    return find
}

const SetPayInUserCollection = async () => {
    const loading = push.load("Cargando...")
    const subscriptionData = GetSubscriptionData(state.subscriptionIndex)
    if (subscriptionData !== undefined) {
        const response: GeneralResponse = await state.pay.SetPaymentToDb("/api/rest", userStore.user.index as string, subscriptionData)
        if (!response.err) {
            push.success("Pago agregado con éxito.")
            loading.destroy()
        } else {
            console.log(response)
            push.error("Error al agregar el pago.")
            loading.destroy()
        }
    } else {
        const object: NewSubscription = {
            description: "Sin suscripción",
            duration: 0,
            name: "Sin suscripción",
            price: state.price,
            renew: false,
        }
        const response: GeneralResponse = await state.pay.SetPaymentToDb("/api/rest", userStore.user.index as string, object)
        if (!response.err) {
            push.success("Pago agregado con éxito.")
            loading.destroy()
        } else {
            console.log(response)
            push.error("Error al agregar el pago.")
            loading.destroy()
        }
    }
}


</script>