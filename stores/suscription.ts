import { defineStore } from "pinia"
import type { NewSubscription } from "../interfaces/db"

const subscription = defineStore("subscrption", {
    state() {
        return{
            subscription: {} as NewSubscription
        }
    },
})

export {
    subscription
}