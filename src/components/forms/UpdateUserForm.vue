<template>
    <div class="update-user-form">
        <div class="head">
            <h2>Actualizar usuario</h2>
            <img @click.stop="closeForm" src="@/assets/icons/forms/form-close.svg" alt="icon-close">
        </div>
        <div class="body">
            <InputUserCommon :data="dataInputUsername" @update:model-value="(value: string) => {inputUsername.username = value}" @update:is-valid="(value: boolean) => {inputUsername.isValid = value}"/>
            <InputUserPassword @update:model-value="(value: string) => { inputPassword.password = value }" @update:is-valid="(value: boolean) => { inputPassword.isValid = value }" />  
            <InputUserCommon :data="dataInputDocument" @update:model-value="(value: string) => {inputDocument.document = value}" @update:is-valid="(value: boolean) => {inputDocument.isValid = value}"/>          
            <InputUserRoles :data="dataInputRoles" @update:model-value="(value: number[]) => {inputRoles.roles = value}"/>
        </div>
        <div class="foot">
            <button class="btn-secondary" id="btn-cancel" @click="closeForm">Cancelar</button>
            <button class="btn-primary" id="btn-create" @click="createUser" :disabled="isLoading">Crear</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue';
import store from "@/store";
import { DataInputUserCommon } from '@/types/data-input-user-common.interface';
import { DataInputUserRoles } from '@/types/data-input-user-roles.interface';
import InputUserCommon from '@/components/inputs/InputUserCommon.vue'
import InputUserPassword from '@/components/inputs/InputUserPassword.vue'
import InputUserRoles from '../inputs/InputUserRoles.vue';

const dataInputUsername = ref<DataInputUserCommon>({
    title: 'Nombre de usuario',
    description: 'Especifica un nombre para este usuario',
    value: 'hola',
    name: 'username',
    typeValue: 'text',
    optional: false,
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

const dataInputDocument = ref<DataInputUserCommon>({
    title: 'Documento de identidad',
    description: 'Especifica un documento de identidad para este usuario',
    value: '',
    name: 'document',
    typeValue: 'text',
    optional: false,
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

const dataInputRoles = ref<DataInputUserRoles>({
    rolesSelected: [
        {id: 1, name: "Administrador de sistema"},
        {id: 2, name: "Gerente general"}
    ]
})

const isLoading = ref(false)

interface InputField<T = string> {
  [key: string]: T | number[] | boolean;
  isValid: boolean;
}

const inputUsername = ref<InputField>({ username: '', isValid: false });
const inputPassword = ref<InputField>({ password: '', isValid: false });
const inputDocument = ref<InputField>({ document: '', isValid: false });
const inputRoles = ref<InputField>({ roles: [], isValid: true });

const emits = defineEmits(["close"])

const closeForm = () => {
    emits("close")
}

// POST /api/accounts/users/
const createUser = async () => {
    const userData = {
        username: inputUsername.value.username,
        password: inputPassword.value.password,
        document: inputDocument.value.document,
        group_ids: inputRoles.value.roles
    }

    console.log(`Enviando ${JSON.stringify(userData)}`)
    try {
        isLoading.value = true
        await store.dispatch('accounts/createUser', userData);
        console.log('Usuarios creado exitosamente');
    } catch (error) {
        console.error('Error al crear el usuario:', error);
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

#btn-create:hover {
    background: #ffb056;
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