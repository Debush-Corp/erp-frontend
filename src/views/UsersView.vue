<template>
    <div id="users-view">
        <div class="head">
            <svg :class="sidebarOpen ? 'selected' : 'no-selected'" @click="handleSideBar" width="25" height="25" viewBox="0 0 25 25" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect class="bg" width="25" height="25" rx="12.5" fill="white" />
                <rect class="stroke" x="5.5" y="7" width="14" height="2" fill="#0F141A" />
                <rect class="stroke" x="5.5" y="11.5" width="14" height="2" fill="#0F141A" />
                <rect class="stroke" x="5.5" y="16" width="14" height="2" fill="#0F141A" />
            </svg>
        </div>
        <div class="body">
            <Transition name="sidebar-transition">
                <div v-if="sidebarOpen" class="side-bar">
                    <div class="title">
                        <h2>Gestión de accesos</h2>
                        <svg @click="handleSideBar" width="8" height="25" viewBox="0 0 8 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 18.5L1.35355 12.8536C1.15829 12.6583 1.15829 12.3417 1.35355 12.1464L7 6.5"
                                stroke="#8C8C94" stroke-width="2" />
                        </svg>
                    </div>
                    <hr>
                    <nav>
                        <router-link to="/products" class="sidebar-li" :class="{ 'active': $route.path === '/users' }">
                            <h3>Usuarios</h3>
                        </router-link>
                        <router-link to="/materials" class="sidebar-li" :class="{ 'active': $route.path === '/users' }">
                            <h3>Roles</h3>
                        </router-link>
                        <router-link to="/materials" class="sidebar-li" :class="{ 'active': $route.path === '/users' }">
                            <h3>Permisos</h3>
                        </router-link>
                    </nav>
                </div>
            </Transition>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const sidebarOpen = ref(true)
const handleSideBar = () => {
    sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style scoped>
h2,
h3,
p {
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
    display: flex;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    border-bottom: 1px solid #B4B4BB;
}

.head .no-selected:hover .bg {
    fill: #EBEBF0;
}

.head .selected .bg {
    fill: #006CE0;
}
.head .selected .stroke {
    fill: #fff;
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
    box-sizing: border-box;
}

.side-bar {
    height: 100%;
    background: #fff;
    border-right: 1px solid #B4B4BB;
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
    gap: 10px;
}

nav .sidebar-li {
    list-style: none;
    text-decoration: none;
    width: 100%;
    height: auto;
}

nav .sidebar-li h3 {
    font-weight: 500;
    color: #424650;
}

@media screen and (min-width: 769px) {
    .head {
        padding: 0px 15px;
    }

    .side-bar {
        position: relative;
        width: 300px;
        padding: 20px;
    }

    .sidebar-transition-enter-active,
    .sidebar-transition-leave-active {
        transition: margin-left 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .sidebar-transition-enter-from,
    .sidebar-transition-leave-to {
        margin-left: -300px;
    }

    .sidebar-transition-enter-to,
    .sidebar-transition-leave-from {
        margin-left: 0px;
    }

    .title h2 {
        font-size: 18px;
    }

    nav .sidebar-li h3 {
        font-size: 14px;
    }
}

@media screen and (max-width: 768px) {
    .head {
        padding: 0px 20px;
    }

    .side-bar {
        position: absolute;
        width: auto;
        min-width: 200px;
        max-width: 240px;
        z-index: 2;
        padding: 15px 20px;
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

    .title {
        gap: 10px;
    }

    .title h2 {
        font-size: 16px;
    }

    .side-bar hr {
        margin-top: 15px;
    }

    nav .sidebar-li h3 {
        font-size: 14px;
    }
}
</style>