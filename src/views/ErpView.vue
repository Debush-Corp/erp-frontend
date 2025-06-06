<template>
    <div id="erp-view">
        <header v-if="!isMobile" id="head-1">
            <div class="h-head">
                <img src="../assets/head/logo.png" alt="" height="24px">
                <div class="vl"></div>
                <svg @click="handleOpen('menu')" class="icon" id="menu-icon" width="16" height="16" viewBox="0 0 16 16"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_434)">
                        <path class="contorn-1"
                            d="M3 0H1C0.447715 0 0 0.447715 0 1V3C0 3.55228 0.447715 4 1 4H3C3.55228 4 4 3.55228 4 3V1C4 0.447715 3.55228 0 3 0Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M3 6H1C0.447715 6 0 6.44772 0 7V9C0 9.55228 0.447715 10 1 10H3C3.55228 10 4 9.55228 4 9V7C4 6.44772 3.55228 6 3 6Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M3 12H1C0.447715 12 0 12.4477 0 13V15C0 15.5523 0.447715 16 1 16H3C3.55228 16 4 15.5523 4 15V13C4 12.4477 3.55228 12 3 12Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M9 0H7C6.44772 0 6 0.447715 6 1V3C6 3.55228 6.44772 4 7 4H9C9.55228 4 10 3.55228 10 3V1C10 0.447715 9.55228 0 9 0Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M9 6H7C6.44772 6 6 6.44772 6 7V9C6 9.55228 6.44772 10 7 10H9C9.55228 10 10 9.55228 10 9V7C10 6.44772 9.55228 6 9 6Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M9 12H7C6.44772 12 6 12.4477 6 13V15C6 15.5523 6.44772 16 7 16H9C9.55228 16 10 15.5523 10 15V13C10 12.4477 9.55228 12 9 12Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M15 0H13C12.4477 0 12 0.447715 12 1V3C12 3.55228 12.4477 4 13 4H15C15.5523 4 16 3.55228 16 3V1C16 0.447715 15.5523 0 15 0Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M15 6H13C12.4477 6 12 6.44772 12 7V9C12 9.55228 12.4477 10 13 10H15C15.5523 10 16 9.55228 16 9V7C16 6.44772 15.5523 6 15 6Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M15 12H13C12.4477 12 12 12.4477 12 13V15C12 15.5523 12.4477 16 13 16H15C15.5523 16 16 15.5523 16 15V13C16 12.4477 15.5523 12 15 12Z"
                            fill="#F7F7F7" />
                    </g>
                    <defs>
                        <clipPath id="clip0_42_434">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div class="h-head">
                <svg class="icon" id="notifications-icon" width="17" height="18" viewBox="0 0 17 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-outside-1_79_711" maskUnits="userSpaceOnUse" x="-0.987305" y="0" width="18"
                        height="18" fill="black">
                        <rect fill="white" x="-0.987305" width="18" height="18" />
                        <path
                            d="M14.5065 13H2.50646C2.11646 13 1.87646 12.56 2.09646 12.24L4.50646 9V6C4.50646 3.79 6.29646 2 8.50646 2C10.7165 2 12.5065 3.79 12.5065 6V9L14.9165 12.24C15.1365 12.57 14.8965 13 14.5065 13ZM6.50646 14C6.50646 15.1 7.40646 16 8.50646 16C9.60646 16 10.5065 15.1 10.5065 14" />
                    </mask>
                    <path class="contorn-1"
                        d="M2.09646 12.24L0.49172 11.0463L0.469485 11.0762L0.448378 11.1069L2.09646 12.24ZM4.50646 9L6.1112 10.1937L6.50646 9.66227V9H4.50646ZM12.5065 9H10.5065V9.66227L10.9017 10.1937L12.5065 9ZM14.9165 12.24L16.5806 11.1306L16.552 11.0877L16.5212 11.0463L14.9165 12.24ZM14.5065 11H2.50646V15H14.5065V11ZM2.50646 11C3.6569 11 4.47622 12.3088 3.74455 13.3731L0.448378 11.1069C-0.723296 12.8112 0.576023 15 2.50646 15V11ZM3.7012 13.4337L6.1112 10.1937L2.90172 7.80635L0.49172 11.0463L3.7012 13.4337ZM6.50646 9V6H2.50646V9H6.50646ZM6.50646 6C6.50646 4.89457 7.40103 4 8.50646 4V0C5.19189 0 2.50646 2.68543 2.50646 6H6.50646ZM8.50646 4C9.61189 4 10.5065 4.89457 10.5065 6H14.5065C14.5065 2.68543 11.821 0 8.50646 0V4ZM10.5065 6V9H14.5065V6H10.5065ZM10.9017 10.1937L13.3117 13.4337L16.5212 11.0463L14.1112 7.80635L10.9017 10.1937ZM13.2524 13.3494C12.5596 12.3102 13.3474 11 14.5065 11V15C16.4455 15 17.7133 12.8298 16.5806 11.1306L13.2524 13.3494ZM4.50646 14C4.50646 16.2046 6.30189 18 8.50646 18V14H4.50646ZM8.50646 18C10.711 18 12.5065 16.2046 12.5065 14H8.50646V18Z"
                        fill="#EBEBF0" mask="url(#path-1-outside-1_79_711)" />
                </svg>
                <div class="vl"></div>
                <svg class="icon" id="info-icon" xmlns="http://www.w3.org/2000/svg" height="22px"
                    viewBox="0 -960 960 960" width="22px" fill="#F7F7F7">
                    <path class="contorn-1"
                        d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm2 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm4-172q25 0 43.5 16t18.5 40q0 22-13.5 39T502-525q-23 20-40.5 44T444-427q0 14 10.5 23.5T479-394q15 0 25.5-10t13.5-25q4-21 18-37.5t30-31.5q23-22 39.5-48t16.5-58q0-51-41.5-83.5T484-720q-38 0-72.5 16T359-655q-7 12-4.5 25.5T368-609q14 8 29 5t25-17q11-15 27.5-23t34.5-8Z" />
                </svg>
                <div class="vl"></div>
                <svg @click="handleOpen('user')" class="icon" id="user-icon" width="20" height="20" viewBox="0 0 20 20"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="contorn-2"
                        d="M10 10.8333C12.3012 10.8333 14.1667 8.96785 14.1667 6.66667C14.1667 4.36548 12.3012 2.5 10 2.5C7.69882 2.5 5.83334 4.36548 5.83334 6.66667C5.83334 8.96785 7.69882 10.8333 10 10.8333Z"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="contorn-2"
                        d="M16.6667 17.5C16.6667 15.7319 15.9643 14.0362 14.7141 12.786C13.4638 11.5357 11.7681 10.8333 10 10.8333C8.2319 10.8333 6.53621 11.5357 5.28596 12.786C4.03572 14.0362 3.33334 15.7319 3.33334 17.5"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </header>
        <header v-else id="head-2">
            <img src="../assets/head/logo.png" alt="" height="24px">
            <div class="h-head">
                <svg @click="handleOpen('menu')" class="icon" id="menu-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_434)">
                        <path class="contorn-1"
                            d="M3 0H1C0.447715 0 0 0.447715 0 1V3C0 3.55228 0.447715 4 1 4H3C3.55228 4 4 3.55228 4 3V1C4 0.447715 3.55228 0 3 0Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M3 6H1C0.447715 6 0 6.44772 0 7V9C0 9.55228 0.447715 10 1 10H3C3.55228 10 4 9.55228 4 9V7C4 6.44772 3.55228 6 3 6Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M3 12H1C0.447715 12 0 12.4477 0 13V15C0 15.5523 0.447715 16 1 16H3C3.55228 16 4 15.5523 4 15V13C4 12.4477 3.55228 12 3 12Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M9 0H7C6.44772 0 6 0.447715 6 1V3C6 3.55228 6.44772 4 7 4H9C9.55228 4 10 3.55228 10 3V1C10 0.447715 9.55228 0 9 0Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M9 6H7C6.44772 6 6 6.44772 6 7V9C6 9.55228 6.44772 10 7 10H9C9.55228 10 10 9.55228 10 9V7C10 6.44772 9.55228 6 9 6Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M9 12H7C6.44772 12 6 12.4477 6 13V15C6 15.5523 6.44772 16 7 16H9C9.55228 16 10 15.5523 10 15V13C10 12.4477 9.55228 12 9 12Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M15 0H13C12.4477 0 12 0.447715 12 1V3C12 3.55228 12.4477 4 13 4H15C15.5523 4 16 3.55228 16 3V1C16 0.447715 15.5523 0 15 0Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M15 6H13C12.4477 6 12 6.44772 12 7V9C12 9.55228 12.4477 10 13 10H15C15.5523 10 16 9.55228 16 9V7C16 6.44772 15.5523 6 15 6Z"
                            fill="#F7F7F7" />
                        <path class="contorn-1"
                            d="M15 12H13C12.4477 12 12 12.4477 12 13V15C12 15.5523 12.4477 16 13 16H15C15.5523 16 16 15.5523 16 15V13C16 12.4477 15.5523 12 15 12Z"
                            fill="#F7F7F7" />
                    </g>
                    <defs>
                        <clipPath id="clip0_42_434">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <div class="vl"></div>
                <svg class="icon" id="notifications-icon" width="17" height="18" viewBox="0 0 17 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-outside-1_79_711" maskUnits="userSpaceOnUse" x="-0.987305" y="0" width="18"
                        height="18" fill="black">
                        <rect fill="white" x="-0.987305" width="18" height="18" />
                        <path
                            d="M14.5065 13H2.50646C2.11646 13 1.87646 12.56 2.09646 12.24L4.50646 9V6C4.50646 3.79 6.29646 2 8.50646 2C10.7165 2 12.5065 3.79 12.5065 6V9L14.9165 12.24C15.1365 12.57 14.8965 13 14.5065 13ZM6.50646 14C6.50646 15.1 7.40646 16 8.50646 16C9.60646 16 10.5065 15.1 10.5065 14" />
                    </mask>
                    <path class="contorn-1"
                        d="M2.09646 12.24L0.49172 11.0463L0.469485 11.0762L0.448378 11.1069L2.09646 12.24ZM4.50646 9L6.1112 10.1937L6.50646 9.66227V9H4.50646ZM12.5065 9H10.5065V9.66227L10.9017 10.1937L12.5065 9ZM14.9165 12.24L16.5806 11.1306L16.552 11.0877L16.5212 11.0463L14.9165 12.24ZM14.5065 11H2.50646V15H14.5065V11ZM2.50646 11C3.6569 11 4.47622 12.3088 3.74455 13.3731L0.448378 11.1069C-0.723296 12.8112 0.576023 15 2.50646 15V11ZM3.7012 13.4337L6.1112 10.1937L2.90172 7.80635L0.49172 11.0463L3.7012 13.4337ZM6.50646 9V6H2.50646V9H6.50646ZM6.50646 6C6.50646 4.89457 7.40103 4 8.50646 4V0C5.19189 0 2.50646 2.68543 2.50646 6H6.50646ZM8.50646 4C9.61189 4 10.5065 4.89457 10.5065 6H14.5065C14.5065 2.68543 11.821 0 8.50646 0V4ZM10.5065 6V9H14.5065V6H10.5065ZM10.9017 10.1937L13.3117 13.4337L16.5212 11.0463L14.1112 7.80635L10.9017 10.1937ZM13.2524 13.3494C12.5596 12.3102 13.3474 11 14.5065 11V15C16.4455 15 17.7133 12.8298 16.5806 11.1306L13.2524 13.3494ZM4.50646 14C4.50646 16.2046 6.30189 18 8.50646 18V14H4.50646ZM8.50646 18C10.711 18 12.5065 16.2046 12.5065 14H8.50646V18Z"
                        fill="#EBEBF0" mask="url(#path-1-outside-1_79_711)" />
                </svg>
                <div class="vl"></div>
                <svg class="icon" id="info-icon" xmlns="http://www.w3.org/2000/svg" height="22px"
                    viewBox="0 -960 960 960" width="22px" fill="#F7F7F7">
                    <path class="contorn-1"
                        d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm2 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm4-172q25 0 43.5 16t18.5 40q0 22-13.5 39T502-525q-23 20-40.5 44T444-427q0 14 10.5 23.5T479-394q15 0 25.5-10t13.5-25q4-21 18-37.5t30-31.5q23-22 39.5-48t16.5-58q0-51-41.5-83.5T484-720q-38 0-72.5 16T359-655q-7 12-4.5 25.5T368-609q14 8 29 5t25-17q11-15 27.5-23t34.5-8Z" />
                </svg>
                <div class="vl"></div>
                <svg @click="handleOpen('user')" class="icon" id="user-icon" width="20" height="20" viewBox="0 0 20 20"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="contorn-2"
                        d="M10 10.8333C12.3012 10.8333 14.1667 8.96785 14.1667 6.66667C14.1667 4.36548 12.3012 2.5 10 2.5C7.69882 2.5 5.83334 4.36548 5.83334 6.66667C5.83334 8.96785 7.69882 10.8333 10 10.8333Z"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="contorn-2"
                        d="M16.6667 17.5C16.6667 15.7319 15.9643 14.0362 14.7141 12.786C13.4638 11.5357 11.7681 10.8333 10 10.8333C8.2319 10.8333 6.53621 11.5357 5.28596 12.786C4.03572 14.0362 3.33334 15.7319 3.33334 17.5"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </header>
        <transition name="menu-transition">
            <FloatingMenu v-if="isOpen['menu']" v-click-outside="() => handleClose('menu')" @section-selected="handleClose('menu')" />
        </transition>
        <transition name="user-transition">
            <FloatingUser v-if="isOpen['user']" v-click-outside="() => handleClose('user')" />
        </transition>
        <div id="content">
            <router-view />
        </div>
    </div>
</template>
<script setup>
import FloatingMenu from '@/components/floatings/FloatingMenu.vue';
import FloatingUser from '@/components/floatings/FloatingUser.vue';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
const isMobile = ref(window.innerWidth <= 768)
const checkViewport = () => {
    isMobile.value = window.innerWidth <= 768
}
onMounted(() => {
    window.addEventListener('resize', checkViewport)
})
onUnmounted(() => {
    window.removeEventListener('resize', checkViewport)
})
const isOpen = reactive({
    menu: false,
    notifications: false,
    info: false,
    user: false,
})
const iconPressed = {
    menu: false,
    notifications: false,
    info: false,
    user: false,
}
const handleOpen = (name) => {
    console.log(`${name} abierto`)
    isOpen[name] = !isOpen[name];
    if (isOpen[name]) {
        iconPressed[name] = true
    }
}
const handleClose = (name) => {
    if (isOpen[name] && !iconPressed[name]) {
        console.log(`${name} cerrado`)
        isOpen[name] = false
    }
    iconPressed[name] = !iconPressed[name];
}

</script>
<style scoped>
#erp-view {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

header {
    width: 100%;
    height: 60px;
    background: #151D26;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    box-sizing: border-box;
    border-top: 1px solid #424650;
    border-bottom: 1px solid #424650;
    z-index: 99;
}

#head-2 .h-head {
    gap: 10px;
}

.h-head {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
}

.icon:hover {
    cursor: pointer;
}

.icon .contorn-1,
.contorn-2 {
    transition: fill 0.2s ease, stroke 0.2s ease;
}

.contorn-2 {
    stroke: #f7f7f7;
}

.icon:hover .contorn-1 {
    fill: #4FC3F7;
}

.icon:hover .contorn-2 {
    stroke: #4FC3F7;
}

.vl {
    border-left: 1px solid #424650;
    height: 30px;
}

@media screen and (min-width: 769px) {

    .menu-transition-enter-active,
    .menu-transition-leave-active {
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        /*transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);*/
    }

    .menu-transition-enter-from,
    .menu-transition-leave-to {
        opacity: 0;
        /*transform: translateY(-650px);*/
    }

    .menu-transition-enter-to,
    .menu-transition-leave-from {
        opacity: 1;
        /*transform: translateY(0px);*/
    }

    .user-transition-enter-active,
    .user-transition-leave-active {
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        /*transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);*/
    }

    .user-transition-enter-from,
    .user-transition-leave-to {
        opacity: 0;
        /*transform: translateY(-192px);*/
    }

    .user-transition-enter-to,
    .user-transition-leave-from {
        opacity: 1;
        /*transform: translateY(0px);*/
    }
}

@media screen and (max-width: 768px) {
    header {
        background: #111a24;
    }

    .menu-transition-enter-active,
    .menu-transition-leave-active {
        transition: transform 0.6s ease, opacity 0.2s ease;
    }

    .menu-transition-enter-from,
    .menu-transition-leave-to {
        opacity: 0;
        transform: translateY(-40px);
    }

    .menu-transition-enter-to,
    .menu-transition-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

    /* User */
    .user-transition-enter-active,
    .user-transition-leave-active {
        transition: transform 0.6s ease, opacity 0.2s ease;
    }

    .user-transition-enter-from,
    .user-transition-leave-to {
        opacity: 0;
        transform: translateY(-40px);
    }

    .user-transition-enter-to,
    .user-transition-leave-from {
        opacity: 1;
        transform: translateY(0);
    }
}

#content {
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>