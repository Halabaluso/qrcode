import type { NewUser } from "../interfaces/db"
import type { GetType, PostType, PutType, DeleteType } from "../server/interfaces/calltypes"
import type { GeneralResponse } from "../server/interfaces/dbresponses"
import { DbConnect } from "../classes/DbConnect"
import moment from "moment"
import type { MethodDb } from "../interfaces/db"

class User {
    name: string
    lastname: string
    age: number
    direction: string
    place: string
    cp: number
    email: string
    phone: number
    created: string

    constructor(name?: string, lastname?: string, age?: number, direction?: string, place?: string, cp?: number, email?: string, phone?: number, created?: string)
    constructor(name: string, lastname: string, age: number, direction: string, place: string, cp: number, email: string, phone: number, created: string) {
        this.name = name
        this.lastname = lastname
        this.age = age
        this.direction = direction
        this.place = place
        this.cp = cp
        this.email = email
        this.phone = phone
        this.created = created
    }

    GetUser(): NewUser {
        const user: NewUser = {
            name: this.name,
            lastname: this.lastname,
            age: this.age,
            direction: this.direction,
            place: this.place,
            cp: this.cp,
            email: this.email,
            phone: this.phone,
        }
        return user
    }

    async GetUsersFromDb(url: string, method: MethodDb): Promise<GeneralResponse> {
        const db = new DbConnect(url, method)
        const object: GetType = {
            query: "users",
            type: "all",
        }
        await db.Connect(object)
        const response: GeneralResponse = await db.GetResponse()
        return response
    }

    SetUser(name: string, lastname: string, age: number, direction: string, place: string, cp: number, email: string, phone: number, created: string) {
        this.name = name
        this.lastname = lastname
        this.age = age
        this.direction = direction
        this.place = place
        this.cp = cp
        this.email = email
        this.phone = phone
        this.created = created
    }

    async SetUserToDb(): Promise<GeneralResponse> {
        const db = new DbConnect("/api/rest", "POST")
        const user: NewUser = {
            name: this.name.toUpperCase(),
            lastname: this.lastname.toUpperCase(),
            age: this.age,
            direction: this.direction,
            place: this.place,
            cp: this.cp,
            email: this.email.toLowerCase(),
            phone: this.phone,
            created: moment().format("DD-MM-YYYY, HH:mm")
        }
        const object: PostType = {
            query: "users",
            object: user
        }
        await db.Connect(object)
        const response = await db.GetResponse()
        return response
    }

    async UpdateUserToDb(url: string, query: string, index: string, value: any): Promise<GeneralResponse> {
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

    async DeleteUserFromDb(index: string): Promise<GeneralResponse> {
        const db = new DbConnect("/api/rest", "DELETE")
        const object: DeleteType = {
            query: "users",
            index: index
        }
        await db.Connect(object)
        const response = await db.GetResponse()
        return response
    }

    async SearchUserFromDb(key: string, value: string): Promise<GeneralResponse> {
        const db = new DbConnect("/api/rest", "GET")
        const object: GetType = {
            query: "users",
            type: "search",
            key: key,
            value: value
        }
        await db.Connect(object)
        const response = await db.GetResponse()
        return response
    }
}

export {
    User
}