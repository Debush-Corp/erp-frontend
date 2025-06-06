<template>
    <div class="toast-alert-container">
        <transition-group name="toast" tag="div">
            <div v-for="alert in alerts" :key="alert.id" :class="['toast', `toast-${alert.type}`]">
                <span>{{ alert.message }}</span>
                <button class="close-btn" @click="removeAlert(alert.id)">
                    <img src="@/assets/icons/alerts/alert-close.svg" alt="icon-close" />
                </button>
            </div>
        </transition-group>
    </div>
</template>

<script>
import { defineProps } from 'vue';
const props = defineProps({
    alerts : {
        type: Array,
        required: false
    }
})
</script>

<style scoped lang="scss">
.toast-alert-container {
    width: 100%;
    height: auto;
    max-height: 100px;
    background: black;
}


</style>