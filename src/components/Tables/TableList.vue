<template>
    <div class="table-container" :class="{ 'is-mobile': isMobile }">
        <table>
            <thead>
                <tr>
                    <th v-for="(column, index) in columns" :key="index"
                        :style="{ width: isMobile ? 'auto' : columnWidths[index] + 'px' }"
                        @mousedown="startResize($event, index)">
                        {{ column.header }}
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.10547 7.22949C5.91844 7.48846 5.54539 7.50474 5.33496 7.27832L5.29492 7.22949L1.73145 2.29297C1.4928 1.96229 1.72989 1.5 2.1377 1.5L9.2627 1.5C9.64505 1.5 9.8773 1.90625 9.70801 2.22949L9.66895 2.29297L6.10547 7.22949Z"
                                stroke="#0F141A" stroke-width="2" />
                        </svg>
                        <div v-if="index + 1 < columns.length" :style="{ width: isMobile ? '2px' : '30px' }" class="resize-handle">
                            <div class="resizer"></div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                    <td v-for="(column, colIndex) in columns" :key="colIndex"
                        :style="{ width: isMobile ? 'auto' : columnWidths[colIndex] + 'px' }">
                        {{ row[column.key] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
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
let resizingIndex = null;
let startX = 0;

// Detectar si es móvil
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768; // Consideramos móvil <= 768px
};

// Iniciar redimensionamiento
const startResize = (event, index) => {
    if (isMobile.value) return; // No permitir redimensionar en móvil
    if (event.target.classList.contains('resize-handle')) {
        resizingIndex = index;
        startX = event.clientX;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
    }
};

// Manejar el movimiento del ratón
const handleMouseMove = (event) => {
    if (resizingIndex !== null) {
        const delta = event.clientX - startX;
        const newWidths = [...columnWidths.value];
        newWidths[resizingIndex] = Math.max(100, newWidths[resizingIndex] + delta); // Mínimo 100px
        columnWidths.value = newWidths;
        startX = event.clientX;
    }
};

// Detener redimensionamiento
const stopResize = () => {
    resizingIndex = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
};

// Actualizar estado móvil al redimensionar ventana
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.table-container {
    max-width: auto;
    min-width: 100%;
    overflow-x: auto;
    /* Scroll horizontal */
    overflow-y: auto;
    /* Altura máxima para scroll vertical */
    position: relative;
    font-family: sans-serif;
    font-size: 14px;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    /* Para respetar los anchos establecidos */
}

thead {
    position: sticky;
    top: 0;
    z-index: 1;
    color: #0F141A;
    border-bottom: 1px solid #C6C6CD;
}

tbody {
    color: #0F141A;
    height: 400px;
}

tbody>*:not(:last-child) {
    border-bottom: 1px solid #E6E6EB;
}

th {
    position: relative;
    height: 20px;
    background-color: #FAFAFA;
}


td {
    height: 25px;
}

th,
td {
    border: 0px solid #ddd;
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    /* Evita que el contenido se rompa en varias líneas */
}


.resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 100%;
    cursor: col-resize;
    display: flex;
    justify-content: center;
    align-items: center;
}

.resizer {
    width: 2px;
    height: 55%;
    background: #8C8C94;
}

.resize-handle:hover .resizer {
    background: #000;
}

.is-mobile table {
    table-layout: auto;
    /* En móvil, las columnas toman ancho automático */
}

.is-mobile tr {
    display: flex;
    flex-direction: row;
}
 .is-mobile th {
    display: flex;
    align-items: center;
    justify-content: space-between;
 }

.is-mobile th,
.is-mobile td {
    width: auto !important;
    min-width: 80px
    /* Forzar ancho automático en móvil */
}
</style>