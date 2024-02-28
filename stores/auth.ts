import { defineStore } from "pinia"
import type { UserData } from "../interfaces/auth"

const auth = defineStore("auth", {
    state() {
        return{
            userAuth: {} as UserData,
            auth: false as boolean
        }
    },
})

export {
    auth
}