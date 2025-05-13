<template>
    <div id="users-view">
        <div class="head">
            <svg @click="handleSideBar" width="25" height="26" viewBox="0 0 25 26" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect y="0.5" width="25" height="25" rx="12.5" fill="#006CE0" />
                <line x1="5.5" y1="8" x2="19.5" y2="8" stroke="white" stroke-width="2" />
                <line x1="5.5" y1="13" x2="19.5" y2="13" stroke="white" stroke-width="2" />
                <line x1="5.5" y1="18" x2="19.5" y2="18" stroke="white" stroke-width="2" />
            </svg>
        </div>
        <div class="body">
            <Transition name="sidebar-transition">
                <div v-if="sidebarOpen" class="side-bar">
                    <div class="title">
                        <h2>Gestión de usuarios</h2>
                        <svg @click="handleSideBar" width="8" height="25" viewBox="0 0 8 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 18.5L1.35355 12.8536C1.15829 12.6583 1.15829 12.3417 1.35355 12.1464L7 6.5"
                                stroke="#8C8C94" stroke-width="2" />
                        </svg>
                    </div>
                    <hr>
                    <nav>
                        <li class="section">
                            <div class="head-section">
                                <svg width="13" height="10" viewBox="0 0 13 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.6464 9.14142C7.04712 9.85161 5.95288 9.85161 5.3536 9.14142L0.354758 3.21735C-0.468191 2.24209 0.225074 0.75 1.50116 0.75L11.4988 0.75C12.7749 0.75 13.4682 2.24209 12.6452 3.21735L7.6464 9.14142Z"
                                        fill="#0F141A" />
                                </svg>
                                <h3>Usuarios y roles</h3>
                            </div>
                        </li>
                    </nav>
                </div>
            </Transition>
            <div class="content">
                <h2>Contenido</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const sidebarOpen = ref(false)
const handleSideBar = () => {
    sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style scoped>

h2, h3, p {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
}

#users-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.head {
    width: 100%;
    height: 50px;
    background: #EFEFEF;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0px 25px;
    box-sizing: border-box;
    border-bottom: 1px solid #B4B4BB;
}

.body {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}


.content {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
}

.side-bar {
    height: 100%;
    background: #fff;
    border-right: 1px solid #B4B4BB;
    padding: 20px 25px;
    box-sizing: border-box;
}

.side-bar .title {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.title h2 {
    font-size: 18px;
    font-weight: bold;
}

.side-bar hr {
    margin: 20px 0px;
    border: none;
    height: 1px;
    background: #C6C6CD;
}

.side-bar nav {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10;
}

nav .section {
    width: 100%;
    height: auto;
    list-style: none;
}

nav .section .head-section {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
}

nav .section .head-section h3 {
    font-size: 14px;
    font-weight: bold;
}

@media screen and (min-width: 769px) {
    .side-bar {
        position: relative;
        width: 250px;
    }

    .sidebar-transition-enter-active,
    .sidebar-transition-leave-active {
        transition: margin-left 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .sidebar-transition-enter-from,
    .sidebar-transition-leave-to {
        margin-left: -250px;
    }

    .sidebar-transition-enter-to,
    .sidebar-transition-leave-from {
        margin-left: 0px;
    }
}

@media screen and (max-width: 768px) {
    .side-bar {
        position: absolute;
        width: 200px;
        z-index: 2;
    }

    .sidebar-transition-enter-active,
    .sidebar-transition-leave-active {
        transition: left 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .sidebar-transition-enter-from,
    .sidebar-transition-leave-to {
        left: -250px;
    }

    .sidebar-transition-enter-to,
    .sidebar-transition-leave-from {
        left: 0px;
    }
}
</style>