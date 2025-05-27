<template>
    <div ref="containerRef" class="users-view">
        <div class="top" :style="{ height: topHeight + 'px' }">
            <div class="head-top">
                <h3>Usuarios <span>(100)</span></h3>
                <div class="buttons">
                    <svg class="btn" width="34" height="35" viewBox="0 0 34 35" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1.5" width="32" height="32" rx="16" stroke="#006CE0" stroke-width="2" />
                        <mask id="path-2-inside-1_181_2389" fill="white">
                            <path
                                d="M26 17.5C26 22.4757 21.9757 26.5 17 26.5C12.0243 26.5 8 22.4757 8 17.5C8 12.5243 12.0243 8.5 17 8.5C20.5871 8.5 23.6857 10.5957 25.1386 13.6429" />
                        </mask>
                        <path
                            d="M24 17.5C24 21.3711 20.8711 24.5 17 24.5V28.5C23.0803 28.5 28 23.5803 28 17.5H24ZM17 24.5C13.1289 24.5 10 21.3711 10 17.5H6C6 23.5803 10.9197 28.5 17 28.5V24.5ZM10 17.5C10 13.6289 13.1289 10.5 17 10.5V6.5C10.9197 6.5 6 11.4197 6 17.5H10ZM17 10.5C19.7869 10.5 22.1995 12.1257 23.3333 14.5036L26.9439 12.7821C25.1719 9.06568 21.3874 6.5 17 6.5V10.5Z"
                            fill="#006CE0" mask="url(#path-2-inside-1_181_2389)" />
                        <mask id="path-4-inside-2_181_2389" fill="white">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M19.5723 15.5197L26.0008 15.5711V9.14258H24.0723V13.6426H19.5723V15.5197Z" />
                        </mask>
                        <path
                            d="M19.5723 15.5197H16.5723V18.4958L19.5483 18.5196L19.5723 15.5197ZM26.0008 15.5711L25.9768 18.5711L29.0008 18.5952V15.5711H26.0008ZM26.0008 9.14258H29.0008V6.14258H26.0008V9.14258ZM24.0723 9.14258V6.14258H21.0723V9.14258H24.0723ZM24.0723 13.6426V16.6426H27.0723V13.6426H24.0723ZM19.5723 13.6426V10.6426H16.5723V13.6426H19.5723ZM24.0723 12.1426H26.0008V6.14258H24.0723V12.1426ZM21.0723 9.14258V13.6426H27.0723V9.14258H21.0723ZM24.0723 10.6426H19.5723V16.6426H24.0723V10.6426ZM22.5723 15.5197V13.6426H16.5723V15.5197H22.5723ZM26.0248 12.5712L19.5963 12.5198L19.5483 18.5196L25.9768 18.5711L26.0248 12.5712ZM23.0008 9.14258V15.5711H29.0008V9.14258H23.0008Z"
                            fill="#006CE0" mask="url(#path-4-inside-2_181_2389)" />
                    </svg>
                    <button class="btn btn-1">Eliminar</button>
                    <button class="btn btn-1">Editar</button>
                    <button class="btn btn-2">Crear usuario</button>
                </div>
            </div>
            <div class="body-top">
                <div class="labels">
                    <label>
                        <input type="radio" name="opcion" value="2">
                        <p>M <span>(20)</span></p>
                    </label>
                    <label>
                        <input type="radio" name="opcion" value="2">
                        <p>L <span>(20)</span></p>
                    </label>
                    <label>
                        <input type="radio" name="opcion" value="2">
                        <p>XL <span>(20)</span></p>
                    </label>
                </div>
                <div class="index">
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 8.40625L1.7609 5.35011C1.42561 5.15452 1.43136 4.66811 1.77118 4.4805L7 1.59375"
                            stroke="#B4B4BB" stroke-width="1.5" />
                    </svg>
                    <p class="i i-select">1</p>
                    <p class="i">2</p>
                    <p class="i">3</p>
                    <p>...</p>
                    <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6.2391 4.05614C6.57439 4.25173 6.56864 4.73814 6.22882 4.92575L1 7.8125"
                            stroke="#B4B4BB" stroke-width="1.5" />
                    </svg>

                </div>
            </div>
            <TableList :columns="columns" :data="data" />
        </div>
        <div class="resizer" @mousedown="startDragging" @touchstart.prevent="startDragging">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5.5H14" stroke="#424650" stroke-width="2" />
                <path d="M14 10.5H2" stroke="#424650" stroke-width="2" />
            </svg>
        </div>
        <div class="bottom" :style="{ height: `calc(100% - ${topHeight}px - 6px)` }">
            <h3>Seleccione un producto <span></span></h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import TableList from "@/components/Tables/TableList.vue";

const columns = [
    { header: 'Nombre', key: 'name' },
    { header: 'Edad', key: 'age' },
    { header: 'Ciudad', key: 'city' },
    { header: 'Ciudad', key: 'city' },
    { header: 'Ciudad', key: 'city' }
]
const data = [
    { name: 'Juan Pérez', age: 30, city: 'Madrid' },
    { name: 'Ana Gómez', age: 25, city: 'Barcelona' },
    { name: 'Luis Martínez', age: 40, city: 'Valencia' },
    { name: 'Luis Martínez', age: 40, city: 'Valencia' },
    { name: 'Luis Martínez', age: 40, city: 'Valencia' }
]

const containerRef = ref<HTMLElement | null>(null);
const topHeight = ref(400);
const isDragging = ref(false);

const onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !containerRef.value) return;

    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    const containerRect = containerRef.value.getBoundingClientRect();
    const newHeight = clientY - containerRect.top;

    const min = 100;
    const max = containerRect.height - 100;
    topHeight.value = Math.max(min, Math.min(newHeight, max));
};

const stopDragging = () => {
    isDragging.value = false;
};

const startDragging = () => {
    isDragging.value = true;
};

onMounted(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("touchend", stopDragging);
});

onBeforeUnmount(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", stopDragging);
});
</script>

<style scoped>
.users-view {
    width: 100%;
    height: 100%;
    background: #FCFCFD;
    display: flex;
    flex-direction: column;
    position: relative;
    user-select: none;
}

h3,
h3,
p {
    margin: 0;
    font-family: sans-serif;
}

.top,
.bottom {
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.top {
    border-bottom: 1px solid #C6C6CD;
}

.top .head-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.top .head-top h3 {
    font-weight: bold;
}

.top .head-top h3 span {
    font-weight: 500;
    color: #666871;
}

.top .head-top .buttons {
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.top .head-top .buttons .btn {
    cursor: pointer;
}

.top .head-top svg {
    height: 100%;
    width: auto;
}

.top .head-top button {
    height: 100%;
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 17px;
    font-weight: bold;
}

.top .body-top {
    width: 100%;
    height: calc(100dvh - 100px);
    display: flex;
    flex-direction: row;
    align-items: start;
}

.btn-1 {
    background: #fff;
    border: 2px solid #006CE0;
    color: #006CE0;
}

.btn-2 {
    border: none;
    background: #FFC756;
    color: #000;
}

.top .body-top .labels {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
}


label {
    display: flex;
    flex-direction: row;
    align-items: center;
}

label input[type="radio"] {
    border: 0px;
    width: 14px;
    height: 14px;
    border: 1.5px solid #8C8C94;
    border-radius: 50%;
    transition: 0.2s;
}

label p {
    font-weight: 700;
}

.body-top .index {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.index svg:first-child {
    margin-right: 5px;
}

.index svg:last-child {
    margin-left: 5px;
}

.index .i {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-weight: bold;
    color: #616161;
}

.index .i-select {
    background: #006CE0;
    color: #fff;
}

.index .i:hover {
    background: #d2d2d2;
    color: #1e1e1e;
}

.bottom h3 {
    font-size: 16px;
    font-weight: bold;
}

.bottom h3 span {
    font-weight: 500;
    color: #666871;
}

.resizer {
    width: 100%;
    height: auto;
    cursor: row-resize;
    display: flex;
    justify-content: center;
}

@media screen and (min-width: 769px) {
    .top {
        padding: 20px 30px;
        gap: 20px;
    }

    .top .head-top h3 {
        font-size: 18px;
    }

    .top .head-top .buttons {
        height: 34px;
    }

    .top .body-top .labels {
        gap: 25px;
    }

    label {
        gap: 5px;
    }

    label p {
        font-size: 14px;
    }

    .body-top .index {
        gap: 5px;
    }

    .index .i {
        font-size: 14px;
    }

    .bottom {
        padding: 0px 30px;
    }
}

@media screen and (max-width: 768px) {
    .top {
        padding: 20px;
        gap: 20px;
    }

    .top .head-top h3 {
        font-size: 14px;
    }

    .top .head-top button {
        padding: 0px 8px;
    }

    .btn-1 {
        border: 1.5px solid #006CE0;
    }

    .top .head-top .buttons {
        height: 25px;
        gap: 6px;
    }

    .top .body-top .labels {
        gap: 12px;
    }

    label {
        gap: 2px;
    }

    label p {
        font-size: 12px;
    }

    .body-top .index {
        gap: 2px
    }

    .index .i {
        font-size: 12px;
    }

    .bottom {
        padding: 0px 20px;
    }
}
</style>