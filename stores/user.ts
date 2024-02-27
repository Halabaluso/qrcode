import { defineStore } from "pinia"
import type { NewUser } from "../interfaces/db"

const user = defineStore("user", {
    state() {
        return{
            user: {} as NewUser
        }
    },
})

export {
    user
}