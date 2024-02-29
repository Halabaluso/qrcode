<template>
	<div class="grid grid-rows-2 md:grid-cols-2 gap-2">
		<div>
			<label>Buscador</label>
			<form @submit.prevent="Search(state.where)" class="form-control relative w-full">
				<input v-model="state.searchName" type="text" class="input input-lg max-w-full pl-10"
					placeholder="Buscar usuario" />

				<span class="absolute inset-y-0 left-3 inline-flex items-center">
					<Icon name="material-symbols:search" class="text-2xl" />
				</span>
			</form>
		</div>
		<div>
			<label>Buscar por</label>
			<select v-model="state.where" class="select select-block select-lg">
				<option value="name">Nombre o apellidos</option>
				<option value="email">Email</option>
			</select>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NewUser } from "~/interfaces/db";
import { User } from "../../classes/User"
import { user } from "../../stores/user"
const state = reactive({
	searchName: "" as string,
	where: "name" as "name" | "email",
	user: new User()
})

const userStore = user()

const Search = async (where: "name" | "email") => {

	switch (where) {
		case "name":
			const response = await state.user.SearchUserFromDb(where, state.searchName.toUpperCase())
			userStore.searchUser = response.msgObject as Array<NewUser>
			break;
		case "email":
			const response1 = await state.user.SearchUserFromDb(where, state.searchName.toLowerCase())
			userStore.searchUser = response1.msgObject as Array<NewUser>
		default:
			break;
	}
}
</script>