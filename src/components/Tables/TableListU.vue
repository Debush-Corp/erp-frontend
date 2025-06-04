<template>
    <div class="scroll-wrapper" :class="{ 'is-mobile': isMobile }">
        <div class="scrollable-content">
            <table>
                <thead>
                    <tr>
                        <th class="first-th">
                            <div class="th-box">
                                <input type="checkbox" />
                            </div>
                        </th>
                        <th v-for="(column, colIndex) in columns" :key="colIndex">
                            <div class="th-box">
                                <div class="th-content">
                                    <p>{{ column.header }}</p>
                                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.10547 7.22949C5.91844 7.48846 5.54539 7.50474 5.33496 7.27832L5.29492 7.22949L1.73145 2.29297C1.4928 1.96229 1.72989 1.5 2.1377 1.5L9.2627 1.5C9.64505 1.5 9.8773 1.90625 9.70801 2.22949L9.66895 2.29297L6.10547 7.22949Z"
                                            stroke="#0F141A" stroke-width="2" />
                                    </svg>
                                </div>
                                <div v-if="colIndex < columns.length - 1" class="resize-handle"
                                    @mousedown="startDragging($event, colIndex)" @touchstart.prevent="startDragging">
                                    <div class="resizer"></div>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(row, rowIndex) in data" :key="rowIndex">
                        <tr>
                            <td class="first-td">
                                <input type="checkbox"/>
                            </td>
                            <td v-for="(column, colIndex) in columns" :key="colIndex">
                                {{ row[column.key] }}
                            </td>
                        </tr>
                        <tr v-if="rowIndex < data.length - 1" class="tr-separator">
                            <td>
                                <div></div>
                            </td>
                            <td v-for="(column, colIndex) in columns" :key="colIndex">
                                <div></div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue';

// Props
const props = defineProps({
    columns: {
        type: Array,
        required: true // Ejemplo: [{ header: 'Nombre', key: 'name' }, { header: 'Edad', key: 'age' }]
    },
    data: {
        type: Array,
        required: true // Ejemplo: [{ name: 'Juan', age: 30 }, { name: 'Ana', age: 25 }]
    }
});

// Estado reactivo
const isMobile = ref(false);
const columnWidths = ref(props.columns.map(() => 150)); // Ancho inicial en px para cada columna


// Detectar si es móvil
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768; // Consideramos móvil <= 768px
};

// Actualizar estado móvil al redimensionar ventana
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});

const selectedRows = ref([])

const elementRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);

const onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !elementRef.value) return;

    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    const containerRect = elementRef.value.getBoundingClientRect();
    const newHeight = clientY - containerRect.top;

    const min = 100;
    const max = containerRect.height - 100;
};

const startDragging = () => {
    isDragging.value = true;
};

const smainDragging = () => {
    isDragging.value = false;
};

</script>

<style>
.scroll-wrapper {
    position: relative;
    overflow: hidden;
    font-family: sans-serif;
    font-size: 14px;
}

.scrollable-content {
    overflow-x: auto;
    overflow-y: auto;
}

table {
    margin: 0;
    padding: 0;
    height: auto;
    border-collapse: collapse;
    table-layout: fixed;
}

thead {
    position: sticky;
    top: 0px;
    z-index: 1;
    color: #0F141A;
    background: #FAFAFA;
}

@media screen and (min-width: 769px) {
    table {
        width: 100%;
    }

    thead th:not(.first-th) {
        min-width: 120px;
        white-space: nowrap;
    }

    thead th:not(.first-th) .th-box {
        min-width: 120px;
        white-space: nowrap;
    }
}

@media screen and (max-width: 768px) {
    table {
        width: auto;
    }

    thead th:not(.first-th) {
        min-width: 120px;
    }
}


table,
th,
td {
    border: 1px solid black;
    /* Define el borde de tabla, encabezados y celdas */
    border-collapse: collapse;
    /* Para que los bordes se unan y no se dupliquen */
}

thead .first-th {
    width: 20px;
}

thead .first-th .th-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

thead th:not(.first-th) .th-box {
    width: auto;
    height: 30px;
    background: yellow;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

}

thead th:not(.first-th) .th-box .th-content {
    width: auto;
    height: 20px;
    background: blue;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

thead .resize-handle {
    cursor: col-resize;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
}

thead .resizer {
    width: 2px;
    height: 80%;
    background: #8C8C94;
}

tbody .first-td {
    text-align: center;
}

tbody td {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
}
</style>