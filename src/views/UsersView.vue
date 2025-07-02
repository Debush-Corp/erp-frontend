<template>
    <div ref="containerRef" class="users-view">
        <div class="main" :style="{ height: mainHeight + 'px' }">
            <ToastAlert :alerts="dataAlerts" @update:alerts="(value: Alert[]) => { dataAlerts = value as Alert[] }" />
            <div class="head-main">
                <h3>Usuarios <span>({{ totalUsers }})</span></h3>
                <div class="buttons">
                    <button class="btn" id="btn-refresh" @click="fetchUsers(currentPage)" :disabled="isLoading">
                        <img v-if="isLoading" alt="btn-refresh" src="@/assets/icons/loaders/loader-refresh.gif">
                        <svg v-else width="18" height="19" viewBox="0 0 18 19" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <mask class="bg-svg" id="path-1-inside-1_122_1322" fill="white">
                                <path
                                    d="M17.9995 9.5C17.9995 14.4757 13.9752 18.5 8.99951 18.5C4.0238 18.5 -0.000488281 14.4757 -0.000488281 9.5C-0.000488281 4.52429 4.0238 0.5 8.99951 0.5C12.5867 0.5 15.6852 2.59571 17.1381 5.64286" />
                            </mask>
                            <path class="line-svg"
                                d="M15.9995 9.5C15.9995 13.3711 12.8707 16.5 8.99951 16.5V20.5C15.0798 20.5 19.9995 15.5803 19.9995 9.5H15.9995ZM8.99951 16.5C5.12837 16.5 1.99951 13.3711 1.99951 9.5H-2.00049C-2.00049 15.5803 2.91923 20.5 8.99951 20.5V16.5ZM1.99951 9.5C1.99951 5.62886 5.12837 2.5 8.99951 2.5V-1.5C2.91923 -1.5 -2.00049 3.41972 -2.00049 9.5H1.99951ZM8.99951 2.5C11.7864 2.5 14.199 4.12575 15.3328 6.50361L18.9434 4.7821C17.1714 1.06568 13.3869 -1.5 8.99951 -1.5V2.5Z"
                                fill="#006CE0" mask="url(#path-1-inside-1_122_1322)" />
                            <mask id="path-3-inside-2_122_1322" fill="white">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.5713 7.51972L17.9999 7.57115V1.14258H16.0713V5.64258H11.5713V7.51972Z" />
                            </mask>
                            <path class="line-svg"
                                d="M11.5713 7.51972H8.57129V10.4958L11.5473 10.5196L11.5713 7.51972ZM17.9999 7.57115L17.9759 10.5711L20.9999 10.5952V7.57115H17.9999ZM17.9999 1.14258H20.9999V-1.85742H17.9999V1.14258ZM16.0713 1.14258V-1.85742H13.0713V1.14258H16.0713ZM16.0713 5.64258V8.64258H19.0713V5.64258H16.0713ZM11.5713 5.64258V2.64258H8.57129V5.64258H11.5713ZM16.0713 4.14258H17.9999V-1.85742H16.0713V4.14258ZM13.0713 1.14258V5.64258H19.0713V1.14258H13.0713ZM16.0713 2.64258H11.5713V8.64258H16.0713V2.64258ZM14.5713 7.51972V5.64258H8.57129V7.51972H14.5713ZM18.0239 4.57125L11.5953 4.51982L11.5473 10.5196L17.9759 10.5711L18.0239 4.57125ZM14.9999 1.14258V7.57115H20.9999V1.14258H14.9999Z"
                                fill="#006CE0" mask="url(#path-3-inside-2_122_1322)" />
                        </svg>
                    </button>
                    <button class="btn" id="btn-delete" @click="deleteUsers"
                        :disabled="rowsSelected.length === 0 || isLoading">Eliminar</button>
                    <button class="btn" id="btn-edit" :disabled="rowsSelected.length !== 1 || isLoading"
                        @click="handleModal($event, true), handleForm('userUpdate')">Editar</button>
                    <button class="btn" id="btn-create"
                        @click="handleModal($event, true), handleForm('userCreate')">Crear
                        usuario</button>
                </div>
            </div>
            <div class="medium-main">
                <div class="paginator">
                    <button class="stepper-page prev-stepper" :disabled="firstPage === 1" @click="handleIndex(-1)">
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 8.40625L1.7609 5.35011C1.42561 5.15452 1.43136 4.66811 1.77118 4.4805L7 1.59375"
                                stroke="#0F141A" stroke-width="1.5" />
                        </svg>
                    </button>
                    <button v-for="i in pageSize" :key="i" class="btn-page"
                        :class="{ 'selected-page': currentPage === firstPage + i - 1 }"
                        :disabled="totalPages < firstPage + i - 1 || rows.length == 0"
                        @click="handlePagination(firstPage + i - 1)">
                        {{ firstPage + i - 1 }}
                    </button>
                    <p v-if="firstPage + pageSize <= totalPages">...</p>
                    <button class="stepper-page next-stepper" :disabled="firstPage + pageSize > totalPages"
                        @click="handleIndex(1)">
                        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6.2391 4.05614C6.57439 4.25173 6.56864 4.73814 6.22882 4.92575L1 7.8125"
                                stroke="#0F141A" stroke-width="1.5" />
                        </svg>
                    </button>
                </div>
            </div>
            <TableCommon v-if="(isLoading && rows.length > 0) || !isLoading" :columns="columns" :rows="rows"
                @update:rowsSelected="(value: TableRow[]) => { rowsSelected = value as UserRow[] }" />
        </div>
        <div class="resizer" @mousedown="startDragging" @touchstart.prevent="startDragging">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5.5H14" stroke="#424650" stroke-width="2" />
                <path d="M14 10.5H2" stroke="#424650" stroke-width="2" />
            </svg>
        </div>
        <div class="details" :style="{ height: `calc(100% - ${mainHeight}px - 6px)` }">
            <h3>Seleccione un usuario <span></span></h3>
        </div>
        <transition name="modal-transition">
            <div v-if="modalOpen" class="over" @click="handleModal($event, false)">
                <CreateUserForm v-if="form === 'userCreate'" @close-form="modalOpen = false"
                    @submit-form="(value: FormUserCreateData) => { createUser(value) }" />
                <UpdateUserForm v-if="form === 'userUpdate'" @close-form="modalOpen = false" :default="rowsSelected"
                    @update:rowSelected="(value: UserRow) => { rowsSelected = [value] }"
                    @submit-form="(value: FormUserUpdateData) => { updateUser(value) }" />
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onBeforeMount, watch, useId, provide, nextTick } from "vue";
import store from "@/store";
import ToastAlert from "@/components/alerts/ToastAlert.vue";
import TableCommon from "@/components/tables/TableCommon.vue";
import CreateUserForm from "@/components/forms/CreateUserForm.vue";
import UpdateUserForm from "@/components/forms/UpdateUserForm.vue";
import { TableColumn, TableRow } from "@/types/table-common.interface";
import { UserRow } from "@/types/table-common.interface";
import { Alert } from "@/types/toast-alert.interface";
import { FormUserCreateData, FormUserUpdateData } from "@/types/user-form";
import { PaginatedResponse, User } from "@/types/interfaces";

const isLoading = ref(false)
const modalOpen = ref(false)
const form = ref('')

const pageSize = 3
const firstPage = ref(1)
const currentPage = ref(1)
const totalPages = ref(3)
const totalUsers = ref(0)

const columns = ref<TableColumn[]>([]);
const rows = ref<UserRow[]>([]);
const rowsSelected = ref<UserRow[]>([]);

const containerRef = ref<HTMLElement | null>(null);
const mainHeight = ref(400);
const isDragging = ref(false);

const removeRowsSelected = ref(false)
provide('deselectedRows', removeRowsSelected)

const onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !containerRef.value) return;

    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    const containerRect = containerRef.value.getBoundingClientRect();
    const newHeight = clientY - containerRect.top;

    const min = 100;
    const max = containerRect.height - 100;
    mainHeight.value = Math.max(min, Math.min(newHeight, max));
};

const smainDragging = () => {
    isDragging.value = false;
};

const startDragging = () => {
    isDragging.value = true;
};

const fetchUsers = async (page: number) => {
    console.log("fetch users")
    try {
        isLoading.value = true
        const res = await store.dispatch('accounts/fetchUsers', { page: page });

        if (res && res.results && res.results.length > 0) {
            columns.value = Object.keys(res.results[0]).map((key) => ({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                id: key
            }));
        }
        totalUsers.value = res.total;
        totalPages.value = res.total_pages;
        //data.value = res.results;
        rows.value = res.results as UserRow[];
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    } finally {
        isLoading.value = false
    }
};

const handlePagination = (page: number) => {
    if (currentPage.value !== page) {
        currentPage.value = page
    }
}

const handleIndex = (val: number) => {
    firstPage.value = firstPage.value + val
}

const handleModal = (event: MouseEvent, stateModal: boolean) => {
    const target = event.target as HTMLElement
    const currentTarget = event.currentTarget as HTMLElement
    if (target === currentTarget) {
        modalOpen.value = stateModal
    }
}

const handleForm = (nameForm: string) => {
    form.value = nameForm
}

onBeforeMount(async () => {
    await fetchUsers(currentPage.value)
})

onMounted(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", smainDragging);
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("touchend", smainDragging);


    watch(() => currentPage.value, async (newPage) => {
        rows.value = []
        await fetchUsers(newPage);
    });
});

onBeforeUnmount(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", smainDragging);
    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", smainDragging);
});

const dataAlerts = ref<Alert[]>([
])

const alertId = ref<number>(0)

const createUser = async (data: FormUserCreateData) => {
    console.log(`Enviando ${JSON.stringify(data)}`)
    try {
        isLoading.value = true
        modalOpen.value = false
        await store.dispatch('accounts/createUser', data);
        await fetchUsers(currentPage.value);
        console.log('Usuario creado exitosamente');
        alertId.value = alertId.value + 1;
        const alert: Alert = {
            id: String(alertId.value),
            type: "success",
            message: "Usuarios creado exitosamente"
        }
        dataAlerts.value.push(alert)
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    } finally {
        isLoading.value = false
    }
};

const updateUser = async (data: FormUserUpdateData) => {
    console.log(`Enviando ${JSON.stringify(data)}`)
    try {
        isLoading.value = true
        modalOpen.value = false
        const updatedUser = await store.dispatch('accounts/updateUser', { userId: rowsSelected.value[0].id, userData: data });
        console.log('Usuario actualizado exitosamente');
        removeRowsSelected.value = true
        await nextTick()
        removeRowsSelected.value = false
        await fetchUsers(currentPage.value)
        alertId.value = alertId.value + 1;
        const alert: Alert = {
            id: String(alertId.value),
            type: "success",
            message: "Usuario actualizado exitosamente"
        }
        dataAlerts.value.push(alert)
        console.log(`UpdatedUser: ${JSON.stringify(updatedUser)}`)

        //const userRowUpdated: UserRow = {
        //    id: updatedUser.id,
        //    username: "gaaaaa",
        //    firstname: updatedUser.first_name,
        //    lastname: updatedUser.last_name,
        //    email: updatedUser.email,
        //    document: updatedUser.document,
        //    isActive: updatedUser.is_active,
        //    roles: updatedUser.roles
        //}
        //
        //console.log(`UserRowUpdated: ${JSON.stringify(userRowUpdated)}`)
        //rowsSelected.value = [structuredClone(userRowUpdated)]
        //console.log(`NewRowsSelected: ${JSON.stringify(rowsSelected.value)}`)
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    } finally {
        isLoading.value = false
    }
};

const deleteUsers = async () => {
    let alert: Alert | null = null;

    try {
        isLoading.value = true;
        modalOpen.value = false;

        await Promise.all(
            rowsSelected.value.map((row) =>
                store.dispatch("accounts/deleteUser", row.id)
            )
        );

        alertId.value += 1;
        alert = {
            id: String(alertId.value),
            type: "success",
            message:
                rowsSelected.value.length > 1
                    ? "Usuarios eliminados exitosamente"
                    : "Usuario eliminado exitosamente",
        };
    } catch (error) {
        alertId.value += 1;
        alert = {
            id: String(alertId.value),
            type: "error",
            message:
                rowsSelected.value.length > 1
                    ? "Error al eliminar usuarios"
                    : "Error al eliminar usuario",
        };
        console.error("Error al eliminar usuarios:", error);
    } finally {
        if (alert) {
            dataAlerts.value.unshift(alert); // Muestra el más reciente primero
        }

        rowsSelected.value = [];

        const res = await store.dispatch("accounts/fetchUsers", {
            page: currentPage.value,
        });

        if (!res.page_exists && currentPage.value > 1) {
            currentPage.value -= 1;
        } else {
            await fetchUsers(currentPage.value);
        }

        isLoading.value = false;
    }
};
</script>

<style scoped lang="scss">
.users-view {
    width: 100%;
    height: 100%;
    background: #FCFCFD;
    display: flex;
    flex-direction: column;
    position: relative;
    user-select: none;
}

h3,
h3,
p {
    margin: 0;
    font-family: sans-serif;
}

.main,
.details {
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.main {
    position: relative;
    border-bottom: 1px solid #C6C6CD;
}

.main .head-main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.main .head-main h3 {
    font-weight: bold;
}

.main .head-main h3 span {
    font-weight: 500;
    color: #666871;
}

.main .head-main .buttons {
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.main .head-main .buttons .btn {
    cursor: pointer;
}

.main .head-main button {
    height: 100%;
    box-sizing: border-box;
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 17px;
    font-weight: bold;
}


#btn-refresh {
    padding: 0;
    border: 2px solid #006CE0;
    aspect-ratio: 1 / 1;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

#btn-refresh:disabled {
    border: 2px solid #B4B4BB;
}

#btn-refresh img,
#btn-refresh svg {
    width: 65%;
    height: auto;
}


#btn-refresh:enabled:hover {
    background: #F0FBFF;
    border: 2px solid #007bff;
}

#btn-refresh:hover svg .line-svg {
    fill: #007bff;
}

#btn-delete,
#btn-edit {
    background: #fff;
    border: 2px solid #006CE0;
    color: #006CE0;
}

#btn-delete:disabled,
#btn-edit:disabled {
    border: 2px solid #B4B4BB;
    color: #B4B4BB;
}

#btn-delete:enabled:hover,
#btn-edit:enabled:hover {
    background: #F0FBFF;
    border: 2px solid #007bff;
    color: #007bff;
}

#btn-create {
    border: none;
    color: #000;
    background: #FFC756;
}

#btn-create:hover {
    background: #ffb056;
}

.main .medium-main {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: start;
}

.main .medium-main .labels {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
}


label {
    display: flex;
    flex-direction: row;
    align-items: center;
}

label input[type="radio"] {
    border: 0px;
    width: 14px;
    height: 14px;
    border: 1.5px solid #8C8C94;
    border-radius: 50%;
    transition: 0.2s;
}

label p {
    font-weight: 700;
}

.medium-main .paginator {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.paginator .stepper-page {
    padding: 0;
    width: auto;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    box-sizing: border-box;
}

.prev-stepper {
    margin-right: 5px;
}

.next-stepper {
    margin-left: 5px;
}

.paginator .stepper-page:disabled svg path {
    stroke: #B4B4BB;
}

.paginator .btn-page {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    font-size: 10px;
    font-weight: bold;
}

.paginator .btn-page:enabled:not(.selected-page) {
    background: #eaeaea;
    color: #424650;
}

.paginator .btn-page:disabled {
    background: transparent;
    color: #B4B4BB;
}

.paginator .selected-page,
.btn-page:enabled:not(.selected-page):hover {
    background: #006CE0;
    color: #fff;
}

.details h3 {
    font-size: 16px;
    font-weight: bold;
}

.details h3 span {
    font-weight: 500;
    color: #666871;
}

.resizer {
    width: 100%;
    height: auto;
    cursor: row-resize;
    display: flex;
    justify-content: center;
}

.over {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 4;
    width: 100dvw;
    height: calc(100dvh - 56.1px);
    background: rgba(2, 15, 33, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;

}

.modal-transition-enter-active,
.modal-transition-leave-active {
    transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    /*transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);*/
}

.modal-transition-enter-from,
.modal-transition-leave-to {
    opacity: 0;
    /*transform: translateY(-650px);*/
}

.modal-transition-enter-to,
.modal-transition-leave-from {
    opacity: 1;
    /*transform: translateY(0px);*/
}

@media screen and (min-width: 769px) {
    .main {
        box-sizing: border-box;
        padding: 20px 30px;
        gap: 20px;
    }

    .main .head-main h3 {
        font-size: 18px;
    }

    .main .head-main .buttons {
        height: 34px;
    }

    .main .medium-main .labels {
        gap: 25px;
    }

    label {
        gap: 5px;
    }

    label p {
        font-size: 14px;
    }

    .medium-main .paginator {
        gap: 5px;
    }

    .paginator .i {
        font-size: 14px;
    }

    .details {
        padding: 0px 30px;
    }
}

@media screen and (max-width: 768px) {
    .main {
        box-sizing: border-box;
        padding: 20px;
        gap: 20px;
    }

    .main .head-main h3 {
        font-size: 14px;
    }

    .main .head-main button {
        padding: 0px 8px;
    }

    .btn-1 {
        border: 1.5px solid #006CE0;
    }

    .main .head-main .buttons {
        height: 25px;
        gap: 6px;
    }

    .main .medium-main .labels {
        gap: 12px;
    }

    label {
        gap: 2px;
    }

    label p {
        font-size: 12px;
    }

    .medium-main .paginator {
        gap: 2px
    }

    .paginator .i {
        font-size: 12px;
    }

    .details {
        padding: 0px 20px;
    }
}
</style>