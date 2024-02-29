import type { PayMethod } from "../interfaces/props"
import { DbConnect } from "../classes/DbConnect"
import type { GetType, PostType } from "~/server/interfaces/calltypes"
import type { GeneralResponse } from "~/server/interfaces/dbresponses"
import moment from "moment"

class Pay {
    subscriptionId: string
    payMethod: PayMethod
    userIndex: string

    constructor(suscriptionId?: string, payMethod?: PayMethod, userIndex?: string)
    constructor(subscriptionId: string, payMethod: PayMethod, userIndex: string) {
        this.subscriptionId = subscriptionId
        this.payMethod = payMethod
        this.userIndex = userIndex
    }

    async SetPaymentToDb(url: string, userIndex: string, object: any): Promise<GeneralResponse> {
        const db = new DbConnect(url, "POST")
        object.created = moment().format("DD-MM-YYYY, HH:mm")
        const objectPost: PostType = {
            type: "double",
            query: "users",
            idQuery: userIndex,
            query1: "pay",
            object: object
        }
        await db.Connect(objectPost)
        const response = db.GetResponse()
        return response
    }
}

export {
    Pay
}