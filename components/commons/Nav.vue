<template>
    <div>
        <nav v-for="nav in navs" class="menu bg-gray-2 p-4 rounded-md">
            <section class="menu-section">
                <span class="menu-title">{{ nav.title }}</span>
                
                <ul class="menu-items">
                    <li v-for="(menu, i) in nav.navs" :key="i">
                        <router-link :to="menu.link" class="flex flex-row items-center menu-item">
                            <Icon :name="menu.icon" class="text-lg mr-2" />
                            <p>{{ menu.title }}</p>
                        </router-link>
                    </li>
                </ul>
                
            </section>
        </nav>
    </div>
</template>
<script lang="ts" setup>
import type { Navs } from "../../interfaces/props"
const navs: Array<Navs> = inject('menus') as Array<Navs>
</script>