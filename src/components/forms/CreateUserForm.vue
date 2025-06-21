<template>
    <div class="create-user-form">
        <div class="head">
            <h2>Crear un usuario</h2>
            <img @click.stop="handleForm" src="@/assets/icons/forms/form-close.svg" alt="icon-close">
        </div>
        <div class="body">
            <InputUserCommon :data="dataInputUsername"
                @update:model-value="(value: string) => { inputUsername.data = value }"
                @update:is-valid="(value: boolean) => { inputUsername.isValid = value }" />
            <InputUserPassword @update:model-value="(value: string) => { inputPassword.data = value }"
                @update:is-valid="(value: boolean) => { inputPassword.isValid = value }" />
            <InputUserCommon :data="dataInputDocument"
                @update:model-value="(value: string) => { inputDocument.data = value }"
                @update:is-valid="(value: boolean) => { inputDocument.isValid = value }" />
            <InputUserRoles :data="dataInputRoles"
                @update:model-value="(value: UserRol[]) => { inputRoles.data = value }"
                @update:is-valid="(value: boolean) => { inputRoles.isValid = value }" />
        </div>
        <div class="foot">
            <button class="btn-secondary" id="btn-cancel" @click="handleForm()">Cancelar</button>
            <button class="btn-primary" id="btn-create" @click="sendFormData" :disabled="isLoading || !formValid">Crear</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue';
import store from "@/store";
import { InputCommonData } from '@/types/user-input-common.interface';
import InputUserCommon from '@/components/inputs/InputUserCommon.vue';
import InputUserPassword from '@/components/inputs/InputUserPassword.vue';
import { InputRolesData } from '@/types/user-input-roles.interface';
import InputUserRoles from '@/components/inputs/InputUserRoles.vue';
import { UserRol } from '@/types/user-rol.interfaces';
import { FormUserCreateData } from '@/types/user-form';

const emits = defineEmits<{
    (e: 'submit-form', value: FormUserCreateData): void;
}>();

const dataInputUsername = ref<InputCommonData>({
    title: 'Nombre de usuario',
    description: 'Especifica un nombre para este usuario',
    value: '',
    default: '',
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
    value: '',
    default: '',
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
    rolesSelected: []
})

const closeForm = ref(false);

const isLoading = ref(false)

interface InputStringField {
    data: string,
    isValid: boolean
}

interface InputArrayField {
    data: UserRol[],
    isValid: boolean;
}

const inputUsername = ref<InputStringField>({ data: '', isValid: false });
const inputPassword = ref<InputStringField>({ data: '', isValid: false });
const inputDocument = ref<InputStringField>({ data: '', isValid: false });
const inputRoles = ref<InputArrayField>({ data: [], isValid: false });

const formData = computed(() => {
    return {
        username: inputUsername.value.data,
        password: inputPassword.value.data,
        document: inputDocument.value.data,
        groups_id: Object.values(inputRoles.value.data).map((rol: UserRol) => rol.id)
    }
})

const formValid = computed(() => {
    return [
        inputUsername.value.isValid,
        inputPassword.value.isValid,
        inputDocument.value.isValid,
        inputRoles.value.isValid
    ].every(Boolean)
})

const handleForm = () => {
    closeForm.value = !closeForm.value
}

const sendFormData = () => {
    emits('submit-form', formData.value)
}
</script>

<style scoped lang="scss">
.create-user-form {
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
        padding: 0;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 18px;
        color: #0F141A;
    }

    img {
        cursor: pointer;
        border-radius: 50%;
    }

    img:hover {
        background: #f1f1f1;
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
    .create-user-form {
        min-width: 500px;
        width: 40%;
        height: 90%;
        border-radius: 32px;
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
    .create-user-form {
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