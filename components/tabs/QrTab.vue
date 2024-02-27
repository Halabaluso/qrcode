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
					<tr>
						<th>
							<input type="checkbox" class="checkbox-primary checkbox" />
						</th>
						<td>{{ user.name }} {{ user.lastname }}</td>
						<td>{{ user.email }}</td>
						<td>
							<div class="flex flex-row items-center gap-2">
								<label @click="GetIndexQr(user.index)" for="qr-modal" class="btn btn-primary">
									<Icon name="material-symbols:qr-code" class="text-xl" />
								</label>
								<button class="btn">
									<Icon name="material-symbols:directory-sync" />
								</button>
								<button class="btn btn-error">
									<Icon name="material-symbols:delete-rounded" />
								</button>
							</div>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
	<!--Modal-->
	<ModalsQrShow/>
</template>
<script setup lang = "ts">
import type { GeneralResponse } from "../../server/interfaces/dbresponses"
import type { NewUser } from "../../interfaces/db"
import { User } from "../../classes/User"

const state = reactive({
	user: new User(),
	arrayUsers: [] as Array<NewUser>,
})

const userIndex = ref("")

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

const GetUsersDb = async (): Promise<GeneralResponse> => {
	const response = await state.user.GetUsersFromDb("/api/rest", "GET")
	return response
}

const GetIndexQr = (index:string) => {
	userIndex.value = index
}
</script>
