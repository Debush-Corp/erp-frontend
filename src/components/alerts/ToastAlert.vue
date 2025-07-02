<template>
    <div class="toast-alert-container" v-show="localAlerts.length > 0 || isAnimating">
        <transition-group name="toast" tag="div" id="group">
            <div v-for="alert in reversedAlerts" :key="alert.id" :class="['toast', `toast-${alert.type}`]">
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
import { defineProps, defineEmits, ref, computed, watch } from 'vue';

const props = defineProps<{
    alerts: Alert[];
}>();

const emit = defineEmits<{
    (e: 'update:alerts', alerts: Alert[]): void;
}>();

const localAlerts = ref<Alert[]>([...props.alerts]);
const isAnimating = ref(false);

// Computado para obtener los alerts en orden inverso sin modificar el array original
const reversedAlerts = computed(() => [...localAlerts.value].reverse());

const removeAlert = (id: string) => {
    const index = localAlerts.value.findIndex((alert) => alert.id === id);
    if (index !== -1) {
        isAnimating.value = true;
        localAlerts.value.splice(index, 1);
        // Emitir evento para actualizar el array en el componente padre
        emit('update:alerts', [...localAlerts.value]);
        // Desactiva isAnimating después de la animación
        setTimeout(() => {
            if (localAlerts.value.length === 0) {
                isAnimating.value = false;
            }
        }, 500); // Coincide con la duración de la transición (0.5s)
    }
};

// Observa cambios en props.alerts para actualizar localAlerts
watch(() => props.alerts, (newAlerts) => {
    localAlerts.value = [...newAlerts];
}, { deep: true });
</script>

<style scoped lang="scss">
.toast-alert-container {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    max-width: calc(100dvw - 40px);
    display: flex;
    flex-direction: column;
    z-index: 2;
    transition: opacity 0.4s ease;
}

#group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
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
}

.icon-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    img {
        width: 18px;
        height: 18px;
    }

    span {
        font-family: sans-serif;
        font-size: 14px;
        color: #fff;
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
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
    opacity: 0;
    transform: translateY(-50px); /* Entra desde arriba */
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(-50px); /* Sale hacia arriba */
}

.toast-leave-active {
    position: absolute;
    width: 100%;
}

/* Suaviza la aparición/desaparición del contenedor */
.toast-alert-container {
    opacity: 1;
}

.toast-alert-container:empty {
    opacity: 0;
}
</style>