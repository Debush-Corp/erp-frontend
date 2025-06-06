<template>
    <nav class="user">
        <li>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="33" height="33" rx="8" fill="#2F445F" />
                <path
                    d="M24.5 17.5C24.5 22.5 21 25 16.84 26.45C16.6222 26.5238 16.3855 26.5203 16.17 26.44C12 25 8.5 22.5 8.5 17.5V10.5C8.5 10.2348 8.60536 9.98042 8.79289 9.79289C8.98043 9.60535 9.23478 9.49999 9.5 9.49999C11.5 9.49999 14 8.29999 15.74 6.77999C15.9519 6.59899 16.2214 6.49954 16.5 6.49954C16.7786 6.49954 17.0481 6.59899 17.26 6.77999C19.01 8.30999 21.5 9.49999 23.5 9.49999C23.7652 9.49999 24.0196 9.60535 24.2071 9.79289C24.3946 9.98042 24.5 10.2348 24.5 10.5V17.5Z"
                    stroke="#C6C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.5 16.5L15.5 18.5L19.5 14.5" stroke="#C6C6CD" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>

            <div>
                <h2>Usuario</h2>
                <p>{{ user?.username || 'Sin nombre' }}</p>
            </div>
        </li>
        <hr />
        <li>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="33" height="33" rx="8" fill="#2F445F" />
                <path d="M16.5 16.5H16.51" stroke="#C6C6CD" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path
                    d="M20.5 10.5V8.5C20.5 7.96957 20.2893 7.46086 19.9142 7.08579C19.5391 6.71071 19.0304 6.5 18.5 6.5H14.5C13.9696 6.5 13.4609 6.71071 13.0858 7.08579C12.7107 7.46086 12.5 7.96957 12.5 8.5V10.5"
                    stroke="#C6C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M26.5 17.5C23.5328 19.459 20.0555 20.5033 16.5 20.5033C12.9445 20.5033 9.46721 19.459 6.5 17.5"
                    stroke="#C6C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M24.5 10.5H8.5C7.39543 10.5 6.5 11.3954 6.5 12.5V22.5C6.5 23.6046 7.39543 24.5 8.5 24.5H24.5C25.6046 24.5 26.5 23.6046 26.5 22.5V12.5C26.5 11.3954 25.6046 10.5 24.5 10.5Z"
                    stroke="#C6C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div>
                <h2>Rol</h2>
                <p>{{ user?.groups[0] || 'Sin rol' }}</p>
            </div>
        </li>
        <hr />
        <button @click="handleLogout">
            <p>Cerrar sesión</p>
        </button>
    </nav>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const store = useStore()
const router = useRouter()

const user = computed(() => store.getters['auth/getUser'])

const handleLogout = async () => {
    try {
        await store.dispatch('auth/logout')
        router.push('/login')
    } catch (error) {
        console.error('Error al cerrar sesión:', error)
    }
}
</script>

<style scoped>
.user {
    position: absolute;
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
    box-sizing: border-box;
    z-index: 3;
}

hr {
    border: 0.5px solid #283950;
    width: 100%;
    height: 0px;
}

li {
    height: 33px;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    padding: 0px 5px;
    box-sizing: border-box;
    gap: 15px;
}

li div {
    height: auto;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 2px;
}

li div h2 {
    font-size: 14px;
    font-weight: bold;
    color: #C6C6CD;
    margin: 0;
}

li div p {
    font-size: 12px;
    font-weight: 500;
    color: #768296;
    margin: 0;
}

button {
    width: auto;
    height: auto;
    border: none;
    background: #EBEBF0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 5px 0px;
    border-radius: 16.5px;
    cursor: pointer;
}

button p {
    font-size: 14px;
    font-weight: bold;
    color: #151D26;
    margin: 0;
}

@media screen and (min-width: 769px) {
    .user {
        top: 60px;
        right: 5px;
        width: auto;
        height: auto;
        gap: 5px;
        padding: 15px 10px 6px 10px;
        background: #151D26;
        border-radius: 20px;
    }

    li svg {
        padding: 0;
        height: 53px;
        width: auto;
    }

    button {
        padding: 8px 20px;
    }
}

@media screen and (max-width: 768px) {
    .user {
        top: 55px;
        width: 100%;
        height: 100dvh;
        gap: 5px;
        padding: 17px 10px;
        background: #0F1217;
    }

    li svg {
        padding: 0;
        height: 36.76px;
        width: auto;
    }

    button {
        padding: 15px 20px;
        border-radius: 23px;
    }
}
</style>