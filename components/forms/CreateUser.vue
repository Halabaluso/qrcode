<template>
    <form ref="createUser" @submit.prevent="CreateUser">
        <h1 class="font-bold text-xl text-primary mb-5"><Icon name = "material-symbols:person-add" class="mr-2"/>Crear nuevo usuario</h1>
        <div class="grid grid-cols-2 md:gap-5 gap-3">
            <div class="form-field">
                <label class="form-label">
                    Nombre<span class="dot dot-error"></span>
                </label>
                <input v-model="state.user.name" placeholder="Nombre" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Apellidos<span class="dot dot-error"></span>
                </label>
                <input v-model="state.user.lastname" placeholder="Apellidos" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Edad<span class="dot dot-error"></span>
                </label>
                <input v-model="state.user.age" placeholder="Edad" type="number" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Provincia<span class="dot dot-error"></span>
                </label>
                <input v-model="state.user.place" placeholder="Dirección" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Dirección<span class="dot dot-error"></span>
                </label>
                <input v-model="state.user.direction" placeholder="Dirección" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Código postal<span class="dot dot-error"></span>
                </label>
                <input v-model="state.user.cp" placeholder="CP" type="number" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Correo electrónico<span class="dot dot-error"></span>
                </label>
                <input v-model="state.user.email" placeholder="Email" type="email" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    Teléfono<span class="dot dot-error"></span>
                </label>
                <input v-model="state.user.phone" placeholder="Teléfono" type="number" class="input max-w-full" />
            </div>
        </div>
        <div>
            <button class="btn btn-primary btn-block mt-5">Crear usuario <Icon name = "material-symbols:add-task" class="ml-2 text-lg"/></button>
        </div>
    </form>
</template>
<script setup lang="ts">
    import { useVuelidate } from '@vuelidate/core'
    import { required, email, numeric } from '@vuelidate/validators'
    import { DbConnect } from "../../classes/DbConnect"
    import { User } from "../../classes/User"

    const state = reactive({
        user: new User()
    })

    const db = new DbConnect("/api/rest", "POST")
    
    const CreateUser = async () => {
        if(await ValidateForm()){
            const response = await state.user.SetUserToDb()
            if(!response.err){
                push.success("Usuario añadido a la base de datos.")
                ClearForm()
            }else{
                push.error("Error al conectar con la base de datos.")
            }
        }else{
            console.log(state.user.GetUser())
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
        const v$ = useVuelidate(rules, state.user.GetUser() as any)
        return await v$.value.$validate()
    }

    const ClearForm = () => {
        state.user.name = ""
        state.user.age = 0
        state.user.cp = 0
        state.user.direction = ""
        state.user.email = ""
        state.user.lastname = ""
        state.user.phone = 0
        state.user.place = ""
    }
    
</script>