import type { MethodDb } from "../interfaces/db"
import type { GeneralResponse } from "../server/interfaces/dbresponses"
import type { PostType, DeleteType, GetType } from "../server/interfaces/calltypes"

class DbConnect {
    url: string
    method: MethodDb

    response: GeneralResponse = {
        err: false,
        msg: "",
    }

    constructor(url: string, method: MethodDb) {
        this.url = url
        this.method = method
    }

    async Connect(object: DeleteType | PostType | GetType) {
        let response: GeneralResponse = {
            err: false,
            msg: "",
        }
        switch (this.method) {
            case "POST":
                await fetch(this.url, {
                    method: this.method,
                    body: JSON.stringify(object)
                })
                .then((data) => { return data.json() })
                .then(data => { this.response = data })
                .catch(err => {
                    this.response.err = true
                    this.response.msg = "Un error a sucedido al hacer POST."
                    this.response.msgObject = err
                })
                break;
            case "GET":
                const querys = new URLSearchParams(object as any).toString()
                await fetch(this.url + "?" + querys, {
                    method: this.method,
                })
                .then((data) => { return data.json() })
                .then(data => { this.response = data })
                .catch(err => {
                    this.response.err = true
                    this.response.msg = "Un error a sucedido al hacer GET."
                    this.response.msgObject = err
                })
                break;
            case "DELETE":
                await fetch(this.url, {
                    method: this.method,
                    body: JSON.stringify(object)
                })
                .then((data) => { return data.json() })
                .then(data => { this.response = data })
                .catch(err => {
                    this.response.err = true
                    this.response.msg = "Un error a sucedido al hacer DELETE."
                    this.response.msgObject = err
                })
                break;
            default:
                break;
        }
    }

    async GetResponse(){
        return this.response
    }
}

export {
    DbConnect
}