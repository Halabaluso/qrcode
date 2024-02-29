interface Breadcrumbs {
    title: string,
    icon: string
}

interface MainMenu {
    title: string,
    icon: string,
    link: string
}

interface Navs {
    title: string,
    navs: Array<MainMenu>
}

interface Tabs {
    title: string,
    icon: string,
    link: string,
    active: boolean,
}

interface HeaderTable {
    title?: string,
    icon?: string
}

type PayMethod = "bizum" | "efectivo" | "tarjeta" | "transferencia bancaria"

export type{
    Breadcrumbs,
    MainMenu,
    Tabs,
    HeaderTable,
    Navs,
    PayMethod
}