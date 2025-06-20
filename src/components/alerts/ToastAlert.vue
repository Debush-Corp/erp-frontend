<template>
    <div class="toast-alert-container" v-show="localAlerts.length > 0 || isAnimating">
        <transition-group name="toast" tag="div" id="group">
            <div v-for="alert in localAlerts" :key="alert.id" :class="['toast', `toast-${alert.type}`]">
                <div class="icon-text">
                    <img v-if="alert.type === 'success'" src="@/assets/icons/alerts/alert-success.svg" alt="" />
                    <img v-else src="@/assets/icons/alerts/alert-error-fail.svg" alt="" />
                    <span>{{ alert.message }}</span>
                </div>
                <button class="close-btn" @click="removeAlert(alert.id)">
                    <img src="@/assets/icons/alerts/alert-close.svg" alt="icon-close" />
                </button>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { Alert } from '@/types/toast-alert.interface';
import { defineProps, ref } from 'vue';

const props = defineProps<{
    alerts: Alert[];
}>();

const localAlerts = ref([...props.alerts]);
const isAnimating = ref(false);

const removeAlert = (id: string) => {
    const index = localAlerts.value.findIndex((alert) => alert.id === id);
    if (index !== -1) {
        if (localAlerts.value.length === 1) {
            isAnimating.value = true; // Activa la animación para el último alert
        }
        localAlerts.value.splice(index, 1);
        if (localAlerts.value.length === 0) {
            setTimeout(() => {
                isAnimating.value = false; // Desactiva después de la animación
            }, 800); // Coincide con la duración de la transición (0.8s)
        }
    }
};
</script>

<style scoped lang="scss">
.toast-alert-container {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 0;
    max-width: calc(100dvw - 40px);
    /* Ancho fijo para consistencia */
    display: flex;
    flex-direction: column;
    z-index: 2;
    transition: opacity 0.4s ease;
    /* Suaviza la desaparición del contenedor */
}

#group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: auto;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
    &::-webkit-scrollbar {
        display: none;
        /* Chrome, Safari, Edge */
    }
}

.toast {
    width: 100%;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    will-change: transform, opacity;
    /* Optimiza la animación */
}

.icon-text {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    img {
        width: 18px;
        height: 18px;
    }

    span {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        font-size: 14px;
        color: #fff;
        display: -webkit-box;
        //-webkit-line-clamp: 2;
        //-webkit-box-orient: vertical;
        //overflow: hidden;
        //text-overflow: ellipsis;
    }
}

.close-btn {
    background: none;
    border: none;
    padding: 0;
    margin: 0;

    img {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
}

.toast-success {
    background: #00802e;
}

.toast-error {
    background: #ad2f2f;
}

.toast-fail {
    background: #9ba7b6;
}

.toast-move,
.toast-enter-active,
.toast-leave-active {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    /* Easing más suave */
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(-80px);
    /* Entra/sale desde abajo */
}

.toast-leave-active {
    position: absolute;
    width: 100%;
    /* Mantiene el ancho durante la salida */
}

/* Asegura que el contenedor se desvanezca suavemente */
.toast-alert-container {
    opacity: 1;
}

.toast-alert-container:empty {
    opacity: 0;
}
</style>