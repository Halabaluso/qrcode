interface PostType {
    query: string,
    object: object
}

interface DeleteType {
    query: string,
    index: string
}

interface GetType {
    type: "one" | "all" | "search"
    query: string,
    index?: string,
    key?: string,
    value?: any
}

interface PutType {
    type: "one" | "all"
    query: string,
    index: string,
    key?: string,
    value?: any
}


export {
    PostType,
    DeleteType,
    GetType,
    PutType
}