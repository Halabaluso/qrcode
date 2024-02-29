<template>
    <form @submit.prevent="UpdateSubscription" action="">
        <h1 class="font-bold text-xl text-primary mb-5">
            <Icon name="eos-icons:activate-subscriptions" class="mr-2" />Crear nueva suscripción
        </h1>
        <div class="grid grid-cols-2 md:gap-5 gap-3">
            <div class="form-field">
                <label class="form-label">
                    Nombre<span class="dot dot-error"></span>
                </label>
                <input v-model="subscriptionStore.subscription.name" placeholder="Nombre" type="text"
                    class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Precio (en €)<span class="dot dot-error"></span>
                </label>
                <input v-model="subscriptionStore.subscription.price" placeholder="Precio" type="number"
                    class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Duración (días)<span class="dot dot-error"></span>
                </label>
                <input v-model="subscriptionStore.subscription.duration" placeholder="Días" type="text"
                    class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Renovación<span class="dot dot-error"></span>
                </label>
                <select v-model="subscriptionStore.subscription.renew" class="select select-block">
                    <option selected disabled>Selecciona tipo de renovación</option>
                    <option :value="true">Automática</option>
                    <option :value="false">Manual</option>
                </select>
            </div>
        </div>
        <div class="mt-5">
            <label class="form-label">
                Descripción<span class="dot dot-error"></span>
            </label>
            <textarea v-model="subscriptionStore.subscription.description" class="textarea-block textarea"
                placeholder="Descripción de la suscripción" />
        </div>
        <div>
            <button type="submit" class="w-full">
                <label for="general-modal-2" class="btn btn-primary btn-block mt-5">Crear plan
                    <Icon name="material-symbols:add-task" class="ml-2 text-lg" />
                </label>
            </button>
        </div>
    </form>
</template>
<script setup lang = "ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'
import { Subscription } from "../../classes/Susbscription"
import { subscription } from "../../stores/suscription"

const state = reactive({
    subscription: new Subscription()
})

const subscriptionStore = subscription()

const UpdateSubscription = async () => {
    if (await ValidateForm()) {
        const response = await state.subscription.UpdateSubscriptionToDb("/api/rest", "subscriptions", subscriptionStore.subscription.index as string, subscriptionStore.subscription)
        if (!response.err) {
            push.success("Suscripción creada")
        } else {
            push.error("Error al conectar con servidor.")
        }
    } else {
        push.warning("Rellene bien los campos.")
    }
}

const ValidateForm = async () => {
    const rules = {
        name: { required },
        description: { required },
        duration: { numeric, required },
        price: { numeric, required },
        renew: { required },
        created: {}
    }
    const v$ = useVuelidate(rules, subscriptionStore.subscription as any)
    return await v$.value.$validate()
}

</script>