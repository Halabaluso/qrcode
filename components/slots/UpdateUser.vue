<template>
    <form @submit.prevent="UpdateUser()">
        <h1 class="font-bold text-xl text-primary mb-5"><Icon name = "material-symbols:person-add" class="mr-2"/>Crear nuevo usuario</h1>
        <div class="grid grid-cols-2 md:gap-5 gap-3">
            <div class="form-field">
                <label class="form-label">
                    Nombre<span class="dot dot-error"></span>
                </label>
                <input v-model="userStore.user.name" placeholder="Nombre" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Apellidos<span class="dot dot-error"></span>
                </label>
                <input v-model="userStore.user.lastname" placeholder="Apellidos" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Edad<span class="dot dot-error"></span>
                </label>
                <input v-model="userStore.user.age" placeholder="Edad" type="number" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Provincia<span class="dot dot-error"></span>
                </label>
                <input v-model="userStore.user.place" placeholder="Dirección" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Dirección<span class="dot dot-error"></span>
                </label>
                <input v-model="userStore.user.direction" placeholder="Dirección" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Código postal<span class="dot dot-error"></span>
                </label>
                <input v-model="userStore.user.cp" placeholder="CP" type="number" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Correo electrónico<span class="dot dot-error"></span>
                </label>
                <input v-model="userStore.user.email" placeholder="Email" type="email" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Teléfono<span class="dot dot-error"></span>
                </label>
                <input v-model="userStore.user.phone" placeholder="Teléfono" type="number" class="input max-w-full" />
            </div>
        </div>
        <div>
            <button class="btn btn-primary btn-block mt-5">Actualizar usuario <Icon name = "material-symbols:add-task" class="ml-2 text-lg"/></button>
        </div>
    </form>
</template>
<script setup lang="ts">
    import { useVuelidate } from '@vuelidate/core'
    import { required, email, numeric } from '@vuelidate/validators'
    import { DbConnect } from "../../classes/DbConnect"
    import { User } from "../../classes/User"
    import { user } from "../../stores/user"

    const state = reactive({
        user: new User()
    })

    
    const userStore = user()
    const UpdateUser = async () => {
        if(await ValidateForm()){
            const response = await state.user.UpdateUserToDb("/api/rest","users", userStore.user.index as string, userStore.user)
            if(!response.err){
                push.success("Usuario actualizado.")
            }else{
                push.error("Error al actualizar usuario.")
            }
        }else{
            push.warning("Complete bien los campos.")
        }
    }

    const ValidateForm = async () => {
        const rules = {
            name: {required},
            lastname: {required},
            age: {numeric, required},
            direction: {required},
            place: {required},
            cp: {numeric, required},
            email: {required},
            phone:{numeric,required},
            created: {}
        }
        const v$ = useVuelidate(rules, userStore.user as any)
        return await v$.value.$validate()
    }
</script>