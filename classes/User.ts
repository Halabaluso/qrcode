import type { NewUser } from "../interfaces/db"
import type { GetType } from "../server/interfaces/calltypes"
import type { GeneralResponse } from "../server/interfaces/dbresponses"
import { DbConnect } from "../classes/DbConnect"
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

    constructor(name?: string, lastname?: string, age?: number, direction?: string, place?: string, cp?: number, email?:string, phone?: number, created?: string)
    constructor(name: string, lastname: string, age: number, direction: string, place: string, cp: number, email:string, phone: number, created: string){
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

    GetUser(){
        const user:NewUser = {
            name: this.name,
            lastname: this.lastname,
            age: this.age,
            direction: this.direction,
            place: this.place,
            cp: this.cp,
            email: this.email,
            phone: this.phone,
            created: this.created
        }
        return user
    }

    SetUser(name: string, lastname: string, age: number, direction: string, place: string, cp: number, email:string, phone: number, created: string){
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

    async GetUsersFromDb(url: string, method: MethodDb): Promise<GeneralResponse>{
        const db = new DbConnect(url, method)
        const object:GetType = {
            query: "users",
            type: "all",
        } 
        await db.Connect(object)
        const response:GeneralResponse = await db.GetResponse()
        return response
    }
}

export {
    User
}