<template>
    <form @submit.prevent="CreateSubscription()" action="">
        <h1 class="font-bold text-xl text-primary mb-5">
            <Icon name="eos-icons:activate-subscriptions" class="mr-2" />Crear nueva suscripción
        </h1>
        <div class="grid grid-cols-2 md:gap-5 gap-3">
            <div class="form-field">
                <label class="form-label">
                    Nombre<span class="dot dot-error"></span>
                </label>
                <input v-model="state.subscription.name" placeholder="Nombre" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Precio (en €)<span class="dot dot-error"></span>
                </label>
                <input v-model="state.subscription.price" placeholder="Precio" type="number" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Duración (días)<span class="dot dot-error"></span>
                </label>
                <input v-model="state.subscription.duration" placeholder="Días" type="text"
                    class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Renovación<span class="dot dot-error"></span>
                </label>
                <select v-model="state.subscription.renew" class="select select-block">
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
            <textarea v-model="state.subscription.description" class="textarea-block textarea" placeholder="Descripción de la suscripción" />
        </div>
        <div>
            <button class="btn btn-primary btn-block mt-5">Crear plan
                <Icon name="material-symbols:add-task" class="ml-2 text-lg" />
            </button>
        </div>
    </form>
</template>
<script setup lang = "ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'
import { Subscription } from "../../classes/Susbscription"

const state = reactive({
    subscription: new Subscription()
})

const CreateSubscription = async () => {
    if(await ValidateForm()){
        const response = await state.subscription.SetSubscriptionToDb()
        if(!response.err){
            push.success("Suscripción creada")
        }else{
            push.error("Error al conectar con servidor.")
        }
    }else{
        push.warning("Rellene bien los campos.")
    }
}

const ValidateForm = async () => {
        const rules = {
            name: {required},
            description: {required},
            duration: {numeric, required},
            price: {numeric, required},
            renew: { required},
            created: {}
        }
        const v$ = useVuelidate(rules, state.subscription.GetSubscription() as any)
        return await v$.value.$validate()
    }

</script>