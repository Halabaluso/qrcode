import { nanoid } from "nanoid"
import { db } from "../connect"
import type { GeneralResponse } from "../interfaces/dbresponses"

//All crud
class DbCrud {
    db = db
    query: string

    constructor(query:string){
        this.query = query
    }

    async Create(object: any){
        const response: GeneralResponse = {
            err: false,
            msg: ""
        }
        
        const id = nanoid()
        object.index = id
        await this.db.collection(this.query).doc(id).set(object)
            .then(() => {
                response.err = false
                response.msg = "Objecto creado"
            })
            .catch(() => {
                response.err = true
                response.msg = "Objecto no creado"
            })

        return response
    }

    async ReadOne(index: string){
        const response: GeneralResponse = {
            err: false,
            msg: ""
        }
        await this.db.collection(this.query).doc(index).get()
            .then((data) => {
                if(data.exists){
                    response.err = false
                    response.msg = "Objecto encontrado"
                    response.msgObject = data.data()
                }else{
                    response.err = true
                    response.msg = "No hay datos"
                }
            })
            .catch(() => {
                response.err = true
                response.msg = "Objecto no encontrado"
            })

        return response
    }

    async ReadAll(){
        const response: GeneralResponse = {
            err: false,
            msg: ""
        }
        await this.db.collection(this.query).get()
            .then((data) => {
                if(!data.empty){
                    response.err = false
                    response.msg = "Objecto encontrado"
                    const arrayDb = [] as Array<any>
                    data.forEach(element => {
                        arrayDb.push(element.data())
                    })
                    response.msgObject = arrayDb
                }else{
                    response.err = true
                    response.msg = "Ningún objeto encontrado."
                }
            })
            .catch(() => {
                response.err = true
                response.msg = "Objecto no encontrado"
            })

        return response
    }

    async Delete(index:string){
        const response: GeneralResponse = {
            err: false,
            msg: ""
        }
        await this.db.collection(this.query).doc(index).delete()
            .then(() => {
                response.err = false
                response.msg = "Objecto borrado"
            })
            .catch(() => {
                response.err = true
                response.msg = "Objecto no borrado"
            })

        return response
    }

    async Update(index:string, key: string, value: string){
        const response: GeneralResponse = {
            err: false,
            msg: ""
        }
        const objectUpdate = {} as any
        objectUpdate[key] = value
        await this.db.collection(this.query).doc(index).update(objectUpdate)
            .then(() => {
                response.err = false
                response.msg = "Objecto actualizado"
            })
            .catch(() => {
                response.err = true
                response.msg = "Objecto no actualizado"
            })

        return response
    }
}

export{
    DbCrud
}