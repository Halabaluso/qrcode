<template>
    <input type="checkbox" id="main-menu" class="drawer-toggle" />
    <label for="main-menu" class="p-2 cursor-pointer">
        <Icon name="material-symbols:menu-rounded" class="text-xl" />
    </label>
    <label class="overlay" for="main-menu"></label>
    <div class="drawer">
        <div class="drawer-content pt-10 flex flex-col h-full">
            <label for="main-menu" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <div>
                <h2 class="text-xl font-medium mb-5">{{ title }}</h2>
                <div>
                    <nav class="menu bg-gray-2 p-4 rounded-md">
                        <section class="menu-section">
                            <span class="menu-title">{{ menuTitle }}</span>
                            <ul class="menu-items">
                                <li class="menu-item" v-for="(menu, i) in arrayMenu" :key="i">
                                    <router-link :to="menu.link" class="flex flex-row items-center">
                                        <Icon :name="menu.icon" class="text-lg mr-2"/><p>{{ menu.title }}</p>
                                    </router-link>
                                </li>
                            </ul>
                        </section>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang = "ts" setup>
import type { MainMenu } from "../../interfaces/props"
const arrayMenu: Array<MainMenu> = inject('menuArray') as Array<MainMenu>
const title: string = inject('title') as string
const menuTitle: string = inject('menuTitle') as string
</script>