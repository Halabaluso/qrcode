<template>
    <input class="modal-state" id="qr-modal" type="checkbox" />
    <div class="modal w-screen">
        <label class="modal-overlay" for="qr-modal"></label>
        <div class="modal-content flex flex-col gap-5 max-w-3xl">
            <div class = "flex flex-row items-center justify-between">
                <h2 class="text-xl font-bold text-primary"><Icon name = "ion:qr-scanner" class = "mr-2"/>Qr de usuario</h2>
                <label for="qr-modal" class="btn btn-sm btn-circle btn-ghost ">✕</label>
            </div>
            <div class = "border-4 border-primary border-dashed p-5 rounded-xl">
                <CommonsQrComponent/>
            </div>
            <div class="flex justify-end gap-3">
                <label for="qr-modal" class = "btn cursor-pointer">Atrás</label>
            </div>
        </div>
    </div>
</template>