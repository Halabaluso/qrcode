<template>
    <div class="h-screen w-screen flex flex-col items-center justify-center">
        <form @submit.prevent="GoHome" action="">
            <div class="mx-auto flex w-full max-w-sm flex-col gap-6">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-semibold">User QR</h1>
                    <p class="text-sm">Introduzca su cuenta</p>
                </div>
                <div class="form-group">
                    <div class="form-field">
                        <label class="form-label">Email</label>

                        <input placeholder="Correo electrónico" type="email" class="input max-w-full" />

                    </div>
                    <div class="form-field">
                        <label class="form-label">Contraseña</label>
                        <div class="form-control">
                            <input placeholder="**********" type="password" class="input max-w-full" />
                        </div>
                    </div>
                    <div class="form-field">
                        <div class="form-control justify-between">
                            <div class="flex gap-2">
                                <input type="checkbox" class="checkbox" />
                                <a href="#">Recordar</a>
                            </div>
                            <label class="form-label">
                                <a class="link link-underline-hover link-primary text-sm">¿Has olvidado la contraseña?</a>
                            </label>
                        </div>
                    </div>
                    <div class="form-field pt-5">
                        <div class="form-control justify-between">
                            <button type="submit" class="btn btn-primary w-full">Entrar</button>
                        </div>
                    </div>

                    <div class="form-field">
                        <div class="form-control justify-center">
                            <a class="link link-underline-hover link-primary text-sm" disabled>¿No tienes una cuenta aún? ¡Vamos!</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script lang="ts" setup>
    import { auth } from "../../stores/auth"
    const GoHome = () => {
        auth().auth = true
        useRouter().push("/users")
    }
</script>