<template>
    <div class="input-user-common">
        <h3 class="title">{{ data.title }}</h3>
        <label :for="data.name" class="description">
            {{ data.description + (data.optional ? '' : ' (*)') }}
        </label>

        <input
            :type="data.typeValue"
            v-model="inputValue"
            :id="data.name"
            :name="data.name"
            :autocomplete="data.name"
            @input="validateInput"
            :class="{
                'default': inputState === 'default',
                'wait': inputState === 'wait',
                'success': inputState === 'success',
                'error': inputState !== 'default' && inputState !== 'wait' && inputState !== 'success'
            }"
        />

        <label class="info" v-if="!(data.info.default === 'empty' && inputState === 'default')">
            <img v-if="isLoading" src="@/assets/icons/loaders/loader-refresh.gif" alt="Cargando">
            <img v-else-if="inputState === 'success'" src="@/assets/icons/inputs/input-check.svg" alt="Éxito" />
            <img v-else-if="inputState !== 'default' && inputState !== 'wait'" src="@/assets/icons/inputs/input-error.svg" alt="Error" />
            <span :class="{
                'default': inputState === 'default',
                'wait': inputState === 'wait',
                'success': inputState === 'success',
                'error': inputState !== 'default' && inputState !== 'wait' && inputState !== 'success'
            }">{{ data.info[inputState] }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed } from 'vue';
import { debounce } from 'lodash';
import store from '@/store';
import { DataInputUserCommon } from '@/types/data-input-user-common.interface';

const props = defineProps<{
    data: DataInputUserCommon;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'update:isValid', value: boolean): void;
}>();

const isLoading = ref(false);
const inputValue = ref(props.data.value);
const inputState = ref<keyof DataInputUserCommon['info']>('default');

const validateInput = debounce(async () => {
    const value = inputValue.value.trim();
    const rules = props.data.rules || {};

    // Estado inicial
    let valid = true;
    let newState: keyof DataInputUserCommon['info'] = 'success';

    // Validaciones locales
    if (rules.required && !value) {
        valid = false;
        newState = 'required';
    } else if (rules.pattern && !(new RegExp(rules.pattern).test(value))) {
        valid = false;
        newState = 'invalidFormat';
    } else if (rules.minLength && value.length < rules.minLength) {
        valid = false;
        newState = 'tooShort';
    } else if (rules.maxLength && value.length > rules.maxLength) {
        valid = false;
        newState = 'tooLong';
    } else if (rules.unique && value && props.data.validationAction) {
        // Validación asíncrona para unicidad
        isLoading.value = true;
        newState = 'wait';
        inputState.value = newState;
        emits('update:isValid', false);

        try {
            const response = await validateDuplicatedValue({field: props.data.name, value: value});
            if (response.valid) {
                valid = true;
                newState = 'success';
            } else {
                valid = false;
                newState = response.error_code || 'error';
            }
        } catch (error) {
            valid = false;
            newState = 'error';
            console.error(`Error al validar el campo ${props.data.name}:`, error);
        } finally {
            isLoading.value = false;
        }
    }

    // Actualizar estado y emitir eventos
    inputState.value = value ? newState : 'default';
    emits('update:modelValue', value);
    emits('update:isValid', valid);
}, 500);

const validateDuplicatedValue = async (data: {[key: string] : string}) => {
    try {
        console.log(`Validando valor para ${props.data.name} en ${props.data.validationAction}`);
        const response = await store.dispatch(props.data.validationAction, data);
        return response;
    } catch (err) {
        console.error(`Error al validar el campo ${props.data.name}:`, err);
        throw err;
    }
};

// Watch para sincronizar props.data.value con inputValue
watch(() => props.data.value, (newValue) => {
    inputValue.value = newValue;
});

// Watch para disparar validación cuando cambie inputValue
//watch(inputValue, () => {
//    validateInput();
//});
</script>

<style scoped lang="scss">
.input-user-common {
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

input {
    margin: 0;
    font-size: 13px;
    font-weight: 400;
    color: #080F1E;
    display: flex;
    box-sizing: border-box;
    padding: 8px 10px;
    border: 2px solid #9BA7B6; // Borde por defecto
    border-radius: 8px;
    outline: none; // Eliminar el outline predeterminado
}

// Borde azul para default y wait con focus
input.default:focus,
input.wait:focus {
    border: 2px solid #0062CC; // Azul vibrante
}

// Borde para default y wait sin focus
input.default,
input.wait {
    border: 2px solid #9BA7B6; // Gris claro
}

// Borde verde para success, con o sin focus
input.success:focus {
    border: 2px solid #006CE0; // Verde
}

// Borde rojo para error, con o sin focus
input.error,
input.error:focus {
    border: 2px solid #AD2F2F; // Rojo
}

.info {
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 5px;
    text-wrap: wrap;

    img {
        width: 12.75px;
        height: 12.75px;
    }

    span {
        margin: 0;
        height: auto;
        font-size: 12px;
    }

    .default,
    .wait {
        color: #9BA7B6;
    }

    .success {
        color: #006CE0;
    }

    .error {
        color: #AD2F2F;
    }
}
</style>