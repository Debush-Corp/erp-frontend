<template>
    <div class="input-user-password">
        <h3 class="title">
            Contraseña
        </h3>
        <div class="description-buttons">
            <label class="description">
                Genere una contraseña para este usuario. (*)
            </label>
            <div class="buttons">
                <button id="btn-generate" @click="generatePassword" :disabled="isLoading">
                    <img v-show="isLoading" src="@/assets/icons/loaders/loader-refresh.gif" alt="">
                    <svg v-show="!isLoading" width="12" height="13" viewBox="0 0 12 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_678_1284" fill="white">
                            <path
                                d="M12 7.5C12 10 9.31714 12.5 6 12.5C2.68286 12.5 0 9.81714 0 6.5C0 3.18286 2.68286 0.5 6 0.5C8.39143 0.5 10.4571 1.89714 11.4257 3.92857" />
                        </mask>
                        <path
                            d="M12 7.5H10.4C10.4 8.17726 10.0223 9.01474 9.19804 9.72666C8.38998 10.4246 7.25728 10.9 6 10.9V12.5V14.1C8.05986 14.1 9.92716 13.3254 11.2898 12.1483C12.6363 10.9853 13.6 9.32274 13.6 7.5H12ZM6 12.5V10.9C3.56651 10.9 1.6 8.93349 1.6 6.5H0H-1.6C-1.6 10.7008 1.7992 14.1 6 14.1V12.5ZM0 6.5H1.6C1.6 4.06651 3.56651 2.1 6 2.1V0.5V-1.1C1.7992 -1.1 -1.6 2.2992 -1.6 6.5H0ZM6 0.5V2.1C7.75124 2.1 9.26819 3.12117 9.98148 4.61717L11.4257 3.92857L12.87 3.23997C11.6461 0.673117 9.03161 -1.1 6 -1.1V0.5Z"
                            fill="#006CE0" mask="url(#path-1-inside-1_678_1284)" />
                        <path d="M11.5005 1.42822V4.70947L8.21436 4.68311V4.42822H11.2144V1.42822H11.5005Z"
                            stroke="#006CE0" />
                    </svg>
                    <span :style="{ color: isLoading ? '#B4B4BB' : 'inherit' }">
                        Generar
                    </span>
                </button>
                <button id="btn-copy" @click="copyToClipboard" :disabled="isCopied">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_678_1302)">
                            <path :style="{ fill: isCopied ? '#B4B4BB' : '#006CE0' }"
                                d="M5.18136 10.161C4.73636 10.161 4.36062 10.0078 4.05416 9.70132C3.74769 9.39485 3.59446 9.01912 3.59446 8.57412V2.83104C3.59446 2.38604 3.74769 2.0103 4.05416 1.70384C4.36062 1.39737 4.73636 1.24414 5.18136 1.24414H9.4131C9.8581 1.24414 10.2338 1.39737 10.5403 1.70384C10.8468 2.0103 11 2.38604 11 2.83104V8.57412C11 9.01912 10.8468 9.39485 10.5403 9.70132C10.2338 10.0078 9.8581 10.161 9.4131 10.161H5.18136ZM5.18136 8.57412H9.4131V2.83104H5.18136V8.57412ZM2.5869 12.7555C2.1419 12.7555 1.76616 12.6022 1.4597 12.2958C1.15323 11.9893 1 11.6136 1 11.1686V3.8386H2.5869V11.1686H8.40554V12.7555H2.5869Z"
                                fill="#006CE0" />
                        </g>
                        <defs>
                            <clipPath id="clip0_678_1302">
                                <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span :style="{ color: isCopied ? '#B4B4BB' : 'inherit' }">
                        Copiar
                    </span>
                </button>
            </div>
        </div>
        <input type="text" id="password" name="password" v-model="inputValue" readonly />
        <label class="info">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.81898 10.6812H8.18117V6.87508H6.81898V10.6812ZM7.50008 5.69977C7.69831 5.69977 7.86451 5.63273 7.99867 5.49867C8.13273 5.36451 8.19977 5.19831 8.19977 5.00008C8.19977 4.80185 8.13273 4.63565 7.99867 4.50149C7.86451 4.36742 7.69831 4.30039 7.50008 4.30039C7.30185 4.30039 7.13565 4.36742 7.00148 4.50149C6.86742 4.63565 6.80039 4.80185 6.80039 5.00008C6.80039 5.19831 6.86742 5.36451 7.00148 5.49867C7.13565 5.63273 7.30185 5.69977 7.50008 5.69977ZM7.50008 13.8771C6.6156 13.8771 5.7857 13.7098 5.01039 13.3752C4.23497 13.0407 3.56049 12.5866 2.98695 12.0132C2.41352 11.4397 1.95951 10.7652 1.62492 9.98977C1.29034 9.21445 1.12305 8.38456 1.12305 7.50008C1.12305 6.6156 1.29034 5.7857 1.62492 5.01039C1.95951 4.23497 2.41352 3.56049 2.98695 2.98695C3.56049 2.41352 4.23497 1.95951 5.01039 1.62492C5.7857 1.29034 6.6156 1.12305 7.50008 1.12305C8.38456 1.12305 9.21445 1.29034 9.98977 1.62492C10.7652 1.95951 11.4397 2.41352 12.0132 2.98695C12.5866 3.56049 13.0407 4.23497 13.3752 5.01039C13.7098 5.7857 13.8771 6.6156 13.8771 7.50008C13.8771 8.38456 13.7098 9.21445 13.3752 9.98977C13.0407 10.7652 12.5866 11.4397 12.0132 12.0132C11.4397 12.5866 10.7652 13.0407 9.98977 13.3752C9.21445 13.7098 8.38456 13.8771 7.50008 13.8771ZM7.50008 12.4552C8.88591 12.4552 10.0583 11.9759 11.0171 11.0171C11.9759 10.0583 12.4552 8.88591 12.4552 7.50008C12.4552 6.11424 11.9759 4.9419 11.0171 3.98305C10.0583 3.0243 8.88591 2.54492 7.50008 2.54492C6.11424 2.54492 4.9419 3.0243 3.98305 3.98305C3.0243 4.9419 2.54492 6.11424 2.54492 7.50008C2.54492 8.88591 3.0243 10.0583 3.98305 11.0171C4.9419 11.9759 6.11424 12.4552 7.50008 12.4552Z"
                    fill="#9BA7B6" />
            </svg>
            <span>
                La contraseña se mostrará solo en este formulario. Si la olvida, deberá generar una nueva.
            </span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import store from '@/store';

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'update:isValid', value: boolean): void;
}>();

const isLoading = ref(false);
const isCopied = ref(false);
const inputValue = ref<string>("");

const generatePassword = async () => {
    try {
        console.log('Fetching password...');
        isLoading.value = true;
        const options = {
            length: 6,
            use_uppercase: true,
            use_lowercase: true,
            use_digits: true,
            use_special: true,
        };
        await store.dispatch('password/generatePassword', options);
        inputValue.value = store.state.password.password;
    } catch (err) {
        console.error('Error al generar la contraseña:', err);
    } finally {
        isLoading.value = false;
    }

    // Emitir eventos
    emits('update:modelValue', inputValue.value);
    emits('update:isValid', true);
};

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(inputValue.value)
        isCopied.value = true
        resetCopiedFlagAfter(1500)
    } catch (error) {
        console.error('Failed to copy text:', error)
    }
}

const resetCopiedFlagAfter = (delay = 1500) => {
    setTimeout(() => {
        isCopied.value = false
    }, delay)
}
</script>

<style scoped lang="scss">
.input-user-password {
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

.description-buttons {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
}

.description {
    font-family: sans-serif;
    font-size: 12px;
    color: #5F6B7A;
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: 10px;

    button {
        border: none;
        padding: 0;
        background: transparent;
        color: #006CE0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        cursor: pointer;

        span {
            font-family: sans-serif;
            font-size: 12px;
        }
    }

    #btn-generate img,
    #btn-generate svg {
        height: 12px;
    }
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

.info {
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 5px;
    text-wrap: wrap;

    svg {
        width: 14px;
        height: 14px;
    }

    span {
        font-size: 12px;
        color: #9BA7B6;
    }
}
</style>