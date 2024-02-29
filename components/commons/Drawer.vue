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
                <img src="../../img/logo.png" alt="" class="w-44 m-auto mb-5">
                <CommonsNav/>
            </div>
        </div>
    </div>
</template>