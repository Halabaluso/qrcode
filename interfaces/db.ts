type MethodDb = "GET" | "POST" | "PUT" | "DELETE"

interface NewUser {
    name: string,
    lastname: string,
    age: number,
    direction: string,
    place: string,
    cp: number,
    email: string,
    phone: number,
    created?: string,
    index?: string
}

interface NewSubscription {
    name: string,
    description: string,
    duration: number,
    price: number,
    renew: boolean,
    created?: string,
    index?: string
}

export type {
    MethodDb,
    NewUser,
    NewSubscription
}