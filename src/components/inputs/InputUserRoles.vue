<template>
    <div class="input-user-roles">
        <h3 class="title">Roles</h3>
        <label class="description">
            Seleccione los roles para este usuario. (*)
        </label>
        <div class="input-wrapper">
            <button @click="handleDropdown" :style="{ rotate: dropdownOpen ? '180deg' : '0deg' }"><svg width="14"
                    height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.56756 10.4295C7.96828 11.1397 6.87404 11.1397 6.27476 10.4295L1.27592 4.50544C0.452967 3.53018 1.14623 2.03809 2.42232 2.03809H12.42C13.6961 2.03809 14.3893 3.53018 13.5664 4.50544L8.56756 10.4295Z"
                        fill="#7D8998" />
                </svg></button>
            <input type="text" id="roles" name="roles" v-model="rolesString" readonly @click="handleDropdown" />
        </div>
        <transition name="dropdown-transition">
            <DropdownRol v-show="dropdownOpen" :data="dataRoles" :default="data.rolesSelected"
                @update:model-value="(value: UserRol[]) => { rolesSelected = value }" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineProps, defineEmits } from 'vue';
import { InputRolesData } from '@/types/user-input-roles.interface';
import { UserRol } from '@/types/user-rol.interfaces';
import DropdownRol from '../dropwdowns/DropdownRol.vue';

const props = defineProps<{
    data: InputRolesData
}>();
const emits = defineEmits<{
    (e: 'update:modelValue', value: UserRol[]): void;
    (e: 'update:isValid', value: boolean): void;
}>();

const dropdownOpen = ref<boolean>(false);
const handleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
}

const rolesSelected = ref<UserRol[]>(props.data.rolesSelected)
const rolesString = computed(() =>
    rolesSelected.value.map(rol => rol.name).join(', ')
);

const rolesId = computed(() =>
    rolesSelected.value.map(rol => rol.id)
);

watch(rolesId, () => {
    emits('update:modelValue', rolesSelected.value);
    emits('update:isValid', rolesId.value.length > 0);
})

const dataRoles = {
    administration: {
        name: "Administradores",
        roles: {
            1: {
                name: "Administrador de sistema",
                description: "Creador del sistema (cuenta con los máximos privilegios)."
            }
        }
    },
    management: {
        name: "Gerentes",
        roles: {
            2: {
                name: "Gerente general",
                description: "Dirige toda la organización (cuenta con acceso total, luego del administrador del sistema)."
            },
            3: {
                name: "Gerente adjunto",
                description: "Asiste al gerente general (cuenta con acceso total, luego del gerente general)"
            }
        }
    },
    supervisor: {
        name: "Supervisores",
        roles: {
            4: {
                name: "Supervisor general",
                description: "Visualiza las operaciones de todas las áreas (No puede modificar ni eliminar datos)."
            },
            5: {
                name: "Supervisor en producción",
                description: "Visualiza las operaciones en el área de producción (No puede modificar ni eliminar datos)."
            },
            6: {
                name: "Supervisor en ventas",
                description: "visualiza las operaciones en el área de ventas (No puede modificar ni eliminar datos)."
            },
            7: {
                name: "Supervisor en almacén",
                description: "Visualiza inventarios y movimientos en almacén (No puede modificar ni eliminar datos)"
            }
        }
    },
    operators: {
        name: "Operadores",
        roles: {
            8: {
                name: "Operador en producción",
                description: "Puede ejecutar acciones asignadas desde botones (como iniciar procesos), pero no editar directamente registros."
            },
            9: {
                name: "Operador en ventas",
                description: "Puede realizar acciones operativas como registrar ventas desde la interfaz, sin modificar las tablas directamente."
            },
            10: {
                name: "Operador en almacén",
                description: "Ejecuta tareas como registrar ingresos o salidas de productos mediante acciones predefinidas, sin editar datos directamente."
            }
        }
    }
}
</script>

<style scoped lang="scss">
.input-user-roles {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: sans-serif;
}

.title {
    font-size: 15px;
    font-weight: 600;
    color: #0F141A;
    margin: 0;
}

.description {
    font-size: 12px;
    color: #5F6B7A;
}

.input-wrapper {
    position: relative;

    button {
        position: absolute;
        top: calc(50% - 7.5px);
        padding: 0;
        margin: 0;
        right: 10px;
        width: 14px;
        height: 13px;
        border: none;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: rotate 0.3s ease;
    }


    input {
        width: 100%;
        margin: 0;
        font-size: 13px;
        font-weight: 400;
        color: #080F1E;
        display: flex;
        box-sizing: border-box;
        padding: 8px 30px 8px 10px;
        border: 2px solid #9BA7B6; // Borde por defecto
        border-radius: 8px;
        outline: none; // Eliminar el outline predeterminado
        cursor: default;
    }

    input:read-only {
        border: 2px solid #9BA7B6;
        background: #f1f1f1;
        overflow-x: auto;
        text-overflow: ellipsis;
    }

    input:not(:read-only):focus {
        border: 2px solid #006CE0;
    }


    svg:hover path {
        fill: #006CE0;
    }
}

.dropdown-transition-enter-active,
.dropdown-transition-leave-active {
    transition:
        max-height 0.5s ease-in-out;
    /*transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);*/
}

.dropdown-transition-enter-from,
.dropdown-transition-leave-to {
    max-height: 0;
    /*transform: translateY(-650px);*/
}

.dropdown-transition-enter-to,
.dropdown-transition-leave-from {
    max-height: 400px;
    /*transform: translateY(0px);*/
}
</style>