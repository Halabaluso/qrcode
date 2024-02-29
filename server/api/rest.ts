import { DbCrud } from "../classes/DbCrud"
import type { PostType, DeleteType, GetType, PutType } from "../interfaces/calltypes"
import type { GeneralResponse } from "../interfaces/dbresponses"

export default defineEventHandler(async (e) => {
    let response: GeneralResponse = {
        err: false,
        msg: ""
    }
    try {
        const CallType = e.method
        switch (CallType) {
            case "POST":
                const bodyPost = await readBody(e)
                const objectJsonPost: PostType = JSON.parse(bodyPost)
                const dbPost = new DbCrud(objectJsonPost.query)
                if (objectJsonPost.type === "double") {
                    response = await dbPost.CreateInDoubleCollection(objectJsonPost.query1 as string, objectJsonPost.idQuery as string, objectJsonPost.object)
                } else {
                    response = await dbPost.Create(objectJsonPost.object)
                }
                break;
            case "PUT":
                const bodyPut = await readBody(e)
                const objectJsonPut: PutType = JSON.parse(bodyPut)
                const dbPut = new DbCrud(objectJsonPut.query)
                if (objectJsonPut.type === "all") {
                    response = await dbPut.UpdateAllObject(objectJsonPut.index, objectJsonPut.value)
                }
                break;
            case "GET":
                const objectJsonGet: GetType = getQuery(e)
                const dbRead = new DbCrud(objectJsonGet.query)
                if (objectJsonGet.type === "all") {
                    response = await dbRead.ReadAll()
                } else if (objectJsonGet.type === "one") {
                    response = await dbRead.ReadOne(objectJsonGet.index as string)
                } else if (objectJsonGet.type === "search") {
                    response = await dbRead.Search(objectJsonGet.key as string, objectJsonGet.value as string)
                }
                break;
            case "DELETE":
                const bodyDelete = await readBody(e)
                const objectJsonDelete: DeleteType = JSON.parse(bodyDelete)
                const dbDelete = new DbCrud(objectJsonDelete.query)
                response = await dbDelete.Delete(objectJsonDelete.index)
                break;
            default:
                break;
        }

        return response
    } catch (error: any) {
        console.log(error)
        response.err = true
        response.msg = "Script error happen"
        response.msgObject = error.toString()
        return response
    }
})