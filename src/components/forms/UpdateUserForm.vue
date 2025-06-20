<template>
    <div class="update-user-form">
        <div class="head">
            <h2>Editar datos de usuario</h2>
            <img @click.stop="closeForm" src="@/assets/icons/forms/form-close.svg" alt="icon-close">
        </div>
        <div class="body">
            <InputUserCommon :data="dataInputUsername"
                @update:model-value="(value: string) => { inputUsername.username = value }"
                @update:is-valid="(value: boolean) => { inputUsername.isValid = value }" />
            <InputUserPassword @update:model-value="(value: string) => { inputPassword.password = value }"
                @update:is-valid="(value: boolean) => { inputPassword.isValid = value }" />
            <InputUserCommon :data="dataInputDocument"
                @update:model-value="(value: string) => { inputDocument.document = value }"
                @update:is-valid="(value: boolean) => { inputDocument.isValid = value }" />
            <InputUserRoles :data="dataInputRoles"
                @update:model-value="(value: UserRol[]) => { inputRoles.roles = value }"
                @update:is-valid="(value: boolean) => { inputRoles.isValid = value }" />
        </div>
        <div class="foot">
            <button class="btn-secondary" id="btn-cancel" @click="closeForm">Cancelar</button>
            <button class="btn-primary" id="btn-create" @click="updateUser"
                :disabled="isLoading || !isValid">Actualizar</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import store from "@/store";
import { InputCommonData } from '@/types/user-input-common.interface';
import InputUserCommon from '@/components/inputs/InputUserCommon.vue'
import InputUserPassword from '@/components/inputs/InputUserPassword.vue'
import InputUserRoles from '../inputs/InputUserRoles.vue';
import { UserRow } from '@/types/table-common.interface';
import { InputRolesData } from '@/types/user-input-roles.interface';
import { UserRol } from '@/types/user-rol.interfaces';

const props = defineProps<{
    default: UserRow
}>();

const emits = defineEmits<{
    (e: 'close'): void;
    (e: 'update:rowSelected', value: UserRow): void;
}>()

interface InputField<T = string> {
    [key: string]: T | boolean | UserRol[];
    isValid: boolean;
}

const inputUsername = ref<InputField>(
    structuredClone({ username: props.default.username, isValid: true })
);
const inputPassword = ref<InputField>(
    { password: '', isValid: true }
);
const inputDocument = ref<InputField>(
    structuredClone({ document: props.default.document, isValid: true })
);
const inputRoles = ref<InputField>(
    structuredClone({ roles: props.default.roles, isValid: true }),
);

const areArrayObjectsEqual = (a: UserRol[], b: UserRol[]): boolean => {
    const a_ids = a.map(e => Number(e.id)).sort((x, y) => x - y);
    const b_ids = b.map(e => Number(e.id)).sort((x, y) => x - y);
    if (a_ids.length !== b_ids.length) return false;
    return a_ids.every((id, index) => id === b_ids[index]);
};

const inputChanged = (value: any, newValue: any) => {
    const isArray = Array.isArray(value) && Array.isArray(newValue);
    let isChanged: boolean;
    if (isArray) {
        isChanged = !areArrayObjectsEqual(value, newValue);
    } else {
        isChanged = value !== newValue;
    }
    return isChanged;
};

const isValid = computed(() => {
    console.log("Calculando validez del formulario")
    const usernameChanged = inputChanged(props.default.username, inputUsername.value.username);
    const documentChanged = inputChanged(props.default.document, inputDocument.value.document);
    const rolesChanged = inputChanged(props.default.roles, inputRoles.value.roles);
    if (usernameChanged) {
        if (inputUsername.value.isValid) {
            console.log("Username ha cambiado y es válido")
        } else {
            console.log("Username ha cambiado y no es válido")
        }
    }
    if (documentChanged) {
        if (inputDocument.value.isValid) {
            console.log("Document ha cambiado y es válido")
        } else {
            console.log("Document ha cambiado y no es válido")
        }
    }
    if (rolesChanged) {
        if (inputRoles.value.isValid) {
            console.log("Roles ha cambiado y es válido")
        } else {
            console.log("Roles ha cambiado y no es válido")
        }
    }
    let formValid
    //if ((usernameChanged && !inputUsername.value.isValid) || (!usernameChanged && inputUsername.value.isValid)) {
    //    formValid = false
    //}
    //if ((documentChanged && !inputDocument.value.isValid) || (!documentChanged && inputDocument.value.isValid)) {
    //    formValid = false
    //}
    //if ((rolesChanged && !inputRoles.value.isValid) || (!rolesChanged && inputRoles.value.isValid)) {
    //    formValid = false
    //}

    if (!usernameChanged && !documentChanged && !rolesChanged) {
        formValid = false
    } else {
        formValid = true
        if (usernameChanged && !inputUsername.value.isValid) {
            formValid = false
        }
        if (documentChanged && !inputDocument.value.isValid) {
            formValid = false
        }
        if (rolesChanged && !inputRoles.value.isValid) {
            formValid = false
        }
    }
    if (inputPassword.value.password !== "") {
        formValid = true
    }

    console.log(`El formulario ${formValid ? "" : "no"} es válido`)
    return formValid
});

const dataInputUsername = ref<InputCommonData>({
    title: 'Nombre de usuario',
    description: 'Especifica un nombre para este usuario',
    value: inputUsername.value.username as string,
    default: inputUsername.value.username as string,
    name: 'username',
    typeValue: 'text',
    rules: {
        required: true,
        minLength: 4,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_]+$/,
        unique: true,
    },
    info: {
        default: 'empty',
        wait: 'Verificando',
        success: 'Nombre de usuario disponible.',
        duplicate: 'El nombre de usuario ingresado ya existe.',
        invalidFormat: 'Solo se permiten letras, números y guión bajo.',
        tooShort: 'Debe tener al menos 4 caracteres.',
        tooLong: 'No debe superar los 20 caracteres.',
        required: 'Este campo es obligatorio.',
        error: 'Ocurrió un error al validar.',
    },
    validationAction: 'accounts/validateUserField',
});

const dataInputDocument = ref<InputCommonData>({
    title: 'Documento de identidad',
    description: 'Especifica un documento de identidad para este usuario',
    value: inputDocument.value.document as string,
    default: inputDocument.value.document as string,
    name: 'document',
    typeValue: 'text',
    rules: {
        required: true,
        minLength: 6,
        maxLength: 20,
        pattern: /^[0-9]+$/,
        unique: true,
    },
    info: {
        default: 'empty',
        wait: 'Verificando',
        success: 'Documento de identidad válido.',
        duplicate: 'El documento ingresado ya ha sido asociado a otro usuario.',
        invalidFormat: 'Solo se permiten números.',
        tooShort: 'Debe tener al menos 6 dígitos.',
        tooLong: 'No debe superar los 20 dígitos.',
        required: 'Este campo es obligatorio.',
        error: 'Ocurrió un error inesperado.',
    },
    validationAction: 'accounts/validateUserField',
});

const dataInputRoles = ref<InputRolesData>({
    rolesSelected: inputRoles.value.roles as UserRol[]
})

const isLoading = ref(false)

const closeForm = () => {
    emits("close")
}

// POST /api/accounts/users/
const updateUser = async () => {
    console.log(`array roles: ${inputRoles.value.roles}`)
    console.log(`array ids: ${Object.values(inputRoles.value.roles).map((rol: UserRol) => rol.id)}`)
    interface UserData {
        username?: any;
        password?: any;
        document: any;
        group_ids: any;
    }

    let userData: UserData = {
        username: inputUsername.value.username,
        password: inputPassword.value.password,
        document: inputDocument.value.document,
        group_ids: Object.values(inputRoles.value.roles).map((rol: UserRol) => rol.id),
    };

    if (!inputChanged(props.default.username, inputUsername.value.username)) {
        delete userData.username;
    }

    if (userData.password === "") {
        delete userData.password;
    }

    if (!inputChanged(props.default.document, inputDocument.value.document)) {
        delete userData.document;
    }

    if (!inputChanged(props.default.roles, inputRoles.value.roles)) {
        delete userData.group_ids;
    }

    console.log(`Enviando ${JSON.stringify(userData)}`)
    try {
        isLoading.value = true

        closeForm()
        const updatedUser = await store.dispatch('accounts/updateUser', { userId: props.default.id, userData: userData });
        console.log('Usuarios actualizado exitosamente');
        console.log(JSON.stringify(updatedUser))
        emits('update:rowSelected', updatedUser)
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    } finally {
        isLoading.value = false
    }
};
</script>

<style scoped lang="scss">
.update-user-form {
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
}

.head {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px;

    h2 {
        margin: 0;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 18px;
        color: #0F141A;
    }

    img {
        cursor: pointer;
    }
}

.body {
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-sizing: border-box;
    padding: 0px 20px 25px 20px;
    overflow: auto;
}


.foot {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 15px;
    box-sizing: border-box;
    border-top: 1px solid #B6BEC9;
}

.foot button {
    border: none;
    padding: 0px 15px;
    border-radius: 17px;
    font-weight: 600;
    cursor: pointer;
}

#btn-cancel {
    background: transparent;
    color: #006CE0;
}

#btn-cancel:hover {
    color: #012B66;
}

#btn-create {
    background: #FFC756;
    color: #0F141A;
}

#btn-create:not(:disabled):hover {
    background: #ffb056;
}

#btn-create:disabled {
    background: #f1f1f1;
    color: #B4B4BB;
    cursor: default;
}

@media screen and (min-width: 769px) {
    .update-user-form {
        min-width: 500px;
        width: 40%;
        height: 90%;
        border-radius: 24px;
    }

    .foot {
        padding: 20px;
    }

    .foot button {
        font-size: 12px;
        height: 34px;
    }
}

@media screen and (max-width: 768px) {
    .update-user-form {
        width: 100%;
        height: 100%;
        border-radius: 0px;
    }

    .foot {
        padding: 15px 20px;
    }

    .foot button {
        font-size: 12px;
        height: 25px;
    }

}
</style>