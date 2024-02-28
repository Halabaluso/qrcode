<template>
    <div class="tabs">
        <template v-for="(tabs,i) in props.arrayTabs" :key="i">
            <RouterLink @click="OnTabClick(`tab`, i, `mytabs`)" :id="`tab${i}`"  :to = "tabs.link" class="tab tab-pill mytabs">
                <button class="flex flex-row items-center">
                    <Icon :name = "tabs.icon" class="mr-2"/>
                    <p>{{ tabs.title }}</p>
                </button>
            </RouterLink>
        </template>
    </div>
</template>
<script lang = "ts" setup>
    import type { Tabs } from "../../interfaces/props"
    const props = defineProps({
        arrayTabs: Array<Tabs>
    })

    let stringActive:string = "tab"
    let lastActive:number = 0

    onMounted(() => {
        props.arrayTabs?.forEach((element,i) => {
            if(element.active === true){
                lastActive = i
            }
        })
        ChangeActiveTab(stringActive,lastActive)
    })

    const OnTabClick = (query:string,i:number,select:string) => {
        RemoveAllActiveTabs(select)
        ChangeActiveTab(query,i)
    }

    const ChangeActiveTab = (query:string,i:number) => {
        const DomElement:Element = document.querySelector(`#${query}${i}`) as Element
        DomElement.classList.add("text-primary")
        DomElement.classList.add("tab-underline")
        DomElement.classList.add("font-bold")
    }

    const RemoveAllActiveTabs = (select: string) => {
        const DomElement = document.querySelectorAll(`.${select}`)
        DomElement.forEach(element => {
            element.classList.remove("text-primary")
            element.classList.remove("tab-underline")
            element.classList.remove("font-bold")
        })
    }

</script>