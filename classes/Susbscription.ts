import type { NewSubscription } from "../interfaces/db"
import type { DeleteType, GetType, PostType, PutType } from "../server/interfaces/calltypes"
import type { GeneralResponse } from "../server/interfaces/dbresponses"
import { DbConnect } from "../classes/DbConnect"
import type { MethodDb } from "../interfaces/db"
import moment from "moment"

class Subscription {
    name: string
    description: string
    duration: number
    price: number
    renew: boolean
    created: string

    constructor(name?: string, description?: string, duration?: number, price?: number, renew?: boolean, created?: string)
    constructor(name: string, description: string, duration: number, price: number, renew: boolean, created: string) {
        this.name = name
        this.description = description
        this.duration = duration
        this.price = price
        this.renew = renew
        this.created = created
    }

    GetSubscription(): NewSubscription {
        const object: NewSubscription = {
            name: this.name,
            description: this.description,
            duration: this.duration,
            price: this.price,
            renew: this.renew,
            created: this.created
        }
        return object
    }

    async GetSubscriptionsDb(url: string, method: MethodDb): Promise<GeneralResponse> {
        const db = new DbConnect(url, method)
        const object: GetType = {
            query: "subscriptions",
            type: "all",
        }
        await db.Connect(object)
        const response: GeneralResponse = await db.GetResponse()
        return response
    }

    SetSubscription(name: string, description: string, duration: number, price: number, renew: boolean) {
        this.name = name
        this.description = description
        this.duration = duration
        this.price = price
        this.renew = renew
    }

    async SetSubscriptionToDb(): Promise<GeneralResponse> {
        const db = new DbConnect("/api/rest", "POST")
        const subscription: NewSubscription = {
            name: this.name,
            description: this.description,
            duration: this.duration,
            price: this.price,
            renew: this.renew,
            created: moment().format("DD-MM-YYYY, HH:mm")
        }
        const object: PostType = {
            query: "subscriptions",
            object: subscription
        }
        await db.Connect(object)
        const response = await db.GetResponse()
        return response
    }

    async UpdateSubscriptionToDb(url: string, query: string, index: string, value: any): Promise<GeneralResponse> {
        const object: PutType = {
            query: query,
            index: index,
            value: value,
            type: "all"
        }
        const db = new DbConnect(url, "PUT")
        await db.Connect(object)
        const response: GeneralResponse = await db.GetResponse()
        return response
    }

    async DeleteSubscriptionFromDb(index: string): Promise<GeneralResponse> {
        const db = new DbConnect("/api/rest", "DELETE")
        const object: DeleteType = {
            query: "subscriptions",
            index: index
        }
        await db.Connect(object)
        const response = await db.GetResponse()
        return response
    }
}

export {
    Subscription
}