<template>
	<!--h1 title component-->
	<h1 class="font-bold text-xl text-primary mb-5">
		<Icon name="lucide:qr-code" class="mr-2" />Mis usuarios
	</h1>
	<!--Tab actions-->
	<select class="select mb-5">
		<option selected disabled>Acciones</option>
		<option>Borrar</option>
	</select>
	<!--Tab users show-->
	<div class="flex w-full overflow-x-auto">
		<table class="table-hover table">
			<thead>
				<tr>
					<th></th>
					<th>Nombre</th>
					<th>Email</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(user, i) in state.arrayUsers" :key="i">
					<tr v-if="i >= state.pageStart && i < (state.pageStart + state.limitPage)" >
						<th>
							<input type="checkbox" class="checkbox-primary checkbox" />
						</th>
						<td>{{ user.name }} {{ user.lastname }}</td>
						<td>{{ user.email }}</td>
						<td>
							<div class="flex flex-row items-center gap-2">
								<label @click="GetIndexQr(user.index as string)" for="qr-modal" class="btn btn-primary">
									<Icon name="material-symbols:qr-code" class="text-xl" />
								</label>
								<label @click="userStore.user = user" for = "general-modal-1" class="btn">
									<Icon name="material-symbols:directory-sync" />
								</label>
								<label for = "general-modal" class="btn btn-error">
									<Icon name="material-symbols:delete-rounded" />
								</label>
							</div>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
	<!--Pagination Tab-->
	<div class="pagination mt-5">
		<button @click="Pagination(`back`)" class="btn">
			<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z"
					fill="#969696" />
			</svg>
		</button>
		<button class="btn btn-active"><span class="p-2">Página {{ state.page }}</span></button>
		<button @click="Pagination(`next`)" class="btn">
			<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M7.74375 5.2448C7.41875 5.5698 7.41875 6.0948 7.74375 6.4198L10.9771 9.65314L7.74375 12.8865C7.41875 13.2115 7.41875 13.7365 7.74375 14.0615C8.06875 14.3865 8.59375 14.3865 8.91875 14.0615L12.7437 10.2365C13.0687 9.91147 13.0687 9.38647 12.7437 9.06147L8.91875 5.23647C8.60208 4.9198 8.06875 4.9198 7.74375 5.2448Z"
					fill="#969696" />
			</svg>
		</button>
	</div>
	<!--Modal-->
	<ModalsQrShow />
	<ModalsGeneralModal/>
</template>
<script setup lang = "ts">
import type { GeneralResponse } from "../../server/interfaces/dbresponses"
import type { NewUser } from "../../interfaces/db"
import { User } from "../../classes/User"
import { user } from "../../stores/user"

//Dinamic variables
const state = reactive({
	user: new User(),
	arrayUsers: [] as Array<NewUser>,

	page: 1,
	limitPage: 10,
	pageStart: 0,

	titleModal: "",
	msgModal: ""
})

const userIndex = ref("")

//Store pinia variables
const userStore = user()


//On mounted component and props
onMounted(async () => {
	const connectDb = await GetUsersDb()
	if (!connectDb.err) {
		state.arrayUsers = connectDb.msgObject as Array<NewUser>
		push.success("Usuarios cargados correctamente.")
	} else {
		push.success("Error al cargar usuarios.")
	}
})

provide("qrString", userIndex)


//ComponentsFunctions
const GetUsersDb = async (): Promise<GeneralResponse> => {
	const response = await state.user.GetUsersFromDb("/api/rest", "GET")
	return response
}

const GetIndexQr = (index: string) => {
	userIndex.value = index
}

const Pagination = (type: "back" | "next") => {
	if (type === "back") {
		if(state.page > 1){
			state.page -= 1
			state.pageStart -= state.limitPage
		}
	} else {
		if((state.arrayUsers.length - state.limitPage) > (state.pageStart)){
			state.page += 1
			state.pageStart += state.limitPage
		}
	}
}
</script>
