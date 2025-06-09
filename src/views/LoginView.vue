<template>
    <div id="login-view">
        <div id="card">
            <img id="logo" src="../assets/login/logo.png" alt="Logo" />
            <form @submit.prevent="handleLogin">
                <div>
                    <label for="user">Nombre de usuario:</label>
                    <input v-model="username" type="text" id="user" name="user"
                        placeholder="Ingrese su nombre de usuario" :disabled="loading" />
                </div>
                <div>
                    <label for="password">Contraseña:</label>
                    <input v-model="password" type="password" id="password" name="password"
                        placeholder="Ingrese su contraseña" :disabled="loading" />
                </div>
                <input id="send-btn" type="submit" value="Iniciar sesión" :class="!canSubmit ? 'disabled' : 'enabled'"
                    :disabled="!canSubmit" />
            </form>
            <div class="results">
                <label class="result" :class="success ? 'show':'hide'">
                    <img src="../assets/login/check.svg" alt="Éxito" />
                    <p>Credenciales verificadas</p>
                </label>

                <label class="result" :class="failed ? 'show':'hide'">
                    <img src="../assets/login/error.svg" alt="Error" />
                    <p>Credenciales incorrectas</p>
                </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const loading = ref(false);
const failed = ref(false);
const success = ref(false);

const store = useStore();
const router = useRouter();

// Computed para validar si se puede enviar el formulario
const canSubmit = computed(() => {
    return !failed.value || (username.value.trim() !== '' && password.value.trim() !== '' && !loading.value);
});

const handleLogin = async () => {
    if (!canSubmit.value) return;

    loading.value = true;
    failed.value = false;
    success.value = false;

    try {
        await store.dispatch('auth/login', {
            username: username.value,
            password: password.value,
        });

        success.value = true;
    } catch (error) {
        failed.value = true;
        password.value = "";
    } finally {
        loading.value = false;
    }
};

watch(() =>  success.value, () => {
    router.push('/');
})
</script>
<style scoped>
#login-view {
    width: 100%;
    height: 100%;
    background-color: #2C3588;
    background-image: url("../assets/login/bg-logo.svg");
    background-repeat: space;
    background-size: auto;
    background-size: 100px 100px;

    display: flex;
    align-items: center;
    justify-content: center;
}

#card {
    width: 90%;
    max-width: 400px;
    height: auto;
    background: #ffffff;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 50px 30px 45px 30px;
    box-sizing: border-box;
}

#card > *{
    margin-bottom: 35px;
}

#card > :nth-last-child(2) {
    margin-bottom: 25px;
}

#card > :nth-last-child(1) {
    margin-bottom: 0;
}

#logo {
    width: 200px;
    height: 50px;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

form div {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

form div label {
    position: relative;
    left: 15px;
    font-family: sans-serif;
    font-size: 14px;
    color: #626284
}

form div input {
    border: none;
    display: flex;
    width: 100%;
    height: 50px;
    background: #F6F8FF;
    border: 1px solid #BEBEDD;
    border-radius: 8px;
    padding: 0px 15px;
    box-sizing: border-box;
    font-family: sans-serif;
    font-size: 16px;
    color: #000
}

form div input::placeholder {
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #BEBEDD;
}

#send-btn {
    margin-top: 15px;
    width: 100%;
    height: 50px;
    border: none;
    color: #fff;
    font-family: sans-serif;
    font-size: 16px;
    border-radius: 8px;
}

.enabled:hover {
    background: #4651b1;
}

.enabled {
    background: #2C3588;
    transition: background 0.2s ease;
    cursor: pointer;
}

.disabled {
    background: #858ab2;
    transition: background 0.2s ease;
    cursor: not-allowed;
}

.show {
    display: block;
    opacity: 1;
}
.hide {
    display: none;
    opacity: 0;
}

.results {
    width: auto;
    height: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.result {
    height: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: sans-serif;
    font-size: 16px;
    color: #403E3E;
    border-radius: 8px;
    transition: opacity 0.3s ease;
}

.result img {
    width: 25px;
    height: 25px;
}
</style>
