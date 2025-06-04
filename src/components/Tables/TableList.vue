<template>
    <div class="scroll-wrapper" :class="{ 'is-mobile': isMobile }">
        <div class="scrollable-content">
            <table>
                <thead>
                    <tr>
                        <th class="first-th">
                            <div class="th-box">
                                <input type="checkbox" @change="toggleAll" ref="boxMasterRef" />
                                <div class="resize-handle">
                                    <div class="resizer"></div>
                                </div>
                            </div>
                        </th>
                        <th v-for="(column, index) in columns" :key="index"
                            :style="{ width: columnWidths[index] + 'px' }">
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
                                <div v-if="index + 1 < columns.length" class="resize-handle"
                                    @mousedown="startResize($event, index)">
                                    <div class="resizer"></div>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(row, rowIndex) in data" :key="rowIndex">
                        <tr :class="{ 'row-hover': selectedRows.includes(rowIndex), 'row': true }">
                            <td class="first-td">
                                <input type="checkbox" @click="toggleBox(rowIndex)"
                                    :ref="el => boxRefs[rowIndex] = el" />
                            </td>
                            <td v-for="(column, colIndex) in columns" :key="colIndex"
                                :style="{ width: isMobile ? 'auto' : columnWidths[colIndex] + 'px' }">
                                {{ row[column.key] }}
                            </td>
                        </tr>
                        <tr class="tr-separator">
                            <td>
                                <div></div>
                            </td>
                            <td v-for="(column, colIndex) in columns" :key="colIndex"
                                :style="{ width: isMobile ? 'auto' : columnWidths[colIndex] + 'px' }">
                                <div></div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';

// Props
const props = defineProps({
    columns: {
        type: Array,
        required: true, // Ejemplo: [{ header: 'Nombre', key: 'name' }, { header: 'Edad', key: 'age' }]
    },
    data: {
        type: Array,
        required: true, // Ejemplo: [{ name: 'Juan', age: 30 }, { name: 'Ana', age: 25 }]
    },
});

// Reactive state
const isMobile = ref(false);
const columnWidths = ref(props.columns.map(() => 150)); // Initial width in px for each column
const boxMasterRef = ref(false);
const boxRefs = ref([]);
const selectedRows = ref([]);
let resizingIndex = null;
let startX = 0;

// Detect mobile
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768; // Consider mobile <= 768px
};

// Start resizing
const startResize = (event, index) => {
    if (isMobile.value) return; // Prevent resizing on mobile
    if (event.target.classList.contains('resize-handle')) {
        resizingIndex = index;
        startX = event.clientX;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
        console.log('Ancho cambiado');
    }
};

// Handle mouse movement
const handleMouseMove = (event) => {
    if (resizingIndex !== null) {
        const delta = event.clientX - startX;
        const newWidths = [...columnWidths.value];
        newWidths[resizingIndex] = Math.max(100, newWidths[resizingIndex] + delta); // Minimum 100px
        columnWidths.value = newWidths;
        startX = event.clientX;
    }
};

// Stop resizing
const stopResize = () => {
    resizingIndex = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
};

// Toggle all checkboxes
const toggleAll = () => {
    const allChecked = selectedRows.value.length === props.data.length;
    if (allChecked || selectedRows.value.length === 0) {
        // If all are checked or none are checked, toggle all
        boxRefs.value.forEach((boxRef) => {
            boxRef.checked = !boxRef.checked;
        });
    } else {
        // If mixed, check only unchecked boxes
        boxRefs.value.forEach((boxRef) => {
            if (!boxRef.checked) {
                boxRef.checked = true;
            }
        });
    }
    // Update selectedRows based on actual checkbox state
    selectedRows.value = boxRefs.value
        .map((boxRef, idx) => (boxRef.checked ? idx : -1))
        .filter((idx) => idx !== -1);
};

// Toggle individual checkbox
const toggleBox = (index) => {
    const pos = selectedRows.value.indexOf(index);
    if (pos === -1) {
        selectedRows.value.push(index);
    } else {
        selectedRows.value.splice(pos, 1);
    }
    if (selectedRows.value.length === props.data.length) {
        boxMasterRef.value.checked = true;
    } else {
        boxMasterRef.value.checked = false;
    }
    console.log(`selectedRows: ${selectedRows.value}`);
};

// Lifecycle hooks
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.scroll-wrapper {
    position: relative;
    overflow: hidden;
    font-family: sans-serif;
    font-size: 14px;
    container-type: inline-size;
}

.scrollable-content {
    height: 100%;
    max-width: auto;
    min-width: 100%;
    overflow-x: auto;
    overflow-y: auto;
}

table {
    margin: 0;
    padding: 0;
    height: auto;
    border-collapse: collapse;
    table-layout: fixed;
    border: 2px solid transparent;
}

@container (min-width: 1200px) {
    table {
        width: 100%;
    }
}

@container (max-width: 1199px) {
    table {
        width: auto;
    }
}

thead {
    position: sticky;
    top: 0;
    z-index: 1;
    color: #0f141a;
    background: #fafafa;
}

th {
    position: relative;
    height: 20px;
    background: #fafafa;
    box-shadow: inset 0 -1px 0 0 #c6c6cd;
}

.first-th {
    padding: 4px 0 4px 8px;
}

.th-content {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
}

.th-content p {
    margin: 0;
}

thead .first-th {
    width: 30px;
}

thead .first-th .th-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 20px;
}

thead .resize-handle {
    cursor: col-resize;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

thead .resizer {
    width: 2px;
    height: 80%;
    background: #8c8c94;
}

.first-th .th-box .resize-handle:hover .resizer {
    background: #8c8c94;
}

th:not(.first-th) .th-box {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

tbody tr {
    background: #fcfcfd;
    box-sizing: border-box;
    padding-top: 30px;
    padding-bottom: 30px;
}

tbody .first-td {
    padding: 4px 0 4px 8px;
}

tbody tr .first-td {
    width: 20px;
}

tbody tr td {
    font-size: 13px;
    text-wrap: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #fcfcfd;
    box-shadow:
        inset 0 2px 0 0 #fcfcfd,
        inset 0 -2px 0 0 #fcfcfd,
        inset 2px 0 0 0 #fcfcfd,
        inset 2px 0 0 0 #fcfcfd;
    transition: box-shadow 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

tbody .tr-separator {
    width: 100%;
}

tbody .tr-separator td {
    padding: 1px 0;
    height: 4px;
}

tbody .tr-separator td div {
    height: 1px;
    background: #e6e6eb;
}

tbody tr.row:hover td {
    background: #f0fbff;
}

tbody tr.row>*:not(:first-child):not(:last-child) {
    box-shadow: inset 0 2px 0 0 transparent, inset 0 -2px 0 0 transparent;
}

tbody tr.row> :first-child {
    border-radius: 8px 0 0 8px;
    box-shadow: inset 0 2px 0 0 transparent, inset 0 -2px 0 0 transparent, inset 2px 0 0 0 transparent;
}

tbody tr.row> :last-child {
    border-radius: 0 8px 8px 0;
    box-shadow: inset 0 2px 0 0 transparent, inset 0 -2px 0 0 transparent, inset -2px 0 0 0 transparent;
}

tbody tr.row:hover>*:not(:first-child):not(:last-child) {
    box-shadow: inset 0 2px 0 0 #006ce0, inset 0 -2px 0 0 #006ce0;
}

tbody tr.row:hover> :first-child {
    border-radius: 8px 0 0 8px;
    box-shadow: inset 0 2px 0 0 #006ce0, inset 0 -2px 0 0 #006ce0, inset 2px 0 0 0 #006ce0;
}

tbody tr.row:hover> :last-child {
    border-radius: 0 8px 8px 0;
    box-shadow: inset 0 2px 0 0 #006ce0, inset 0 -2px 0 0 #006ce0, inset -2px 0 0 0 #006ce0;
}

tbody tr.row-hover td {
    background: #f0fbff;
}

tbody tr.row-hover>*:not(:first-child):not(:last-child) {
    box-shadow: inset 0 2px 0 0 #006ce0, inset 0 -2px 0 0 #006ce0;
}

tbody tr.row-hover> :first-child {
    border-radius: 8px 0 0 8px;
    box-shadow: inset 0 2px 0 0 #006ce0, inset 0 -2px 0 0 #006ce0, inset 2px 0 0 0 #006ce0;
}

tbody tr.row-hover> :last-child {
    border-radius: 0 8px 8px 0;
    box-shadow: inset 0 2px 0 0 #006ce0, inset 0 -2px 0 0 #006ce0, inset -2px 0 0 0 #006ce0;
}

td {
    height: 34px;
}

th:not(.first-th),
td:not(.first-td) {
    padding: 4px 0 4px 0;
    box-sizing: border-box;
}

td:not(.first-td) {
    padding-right: 18px;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
}

.is-mobile table {
    min-width: 100%;
    width: auto;
    font-size: 12px;
}

.is-mobile .resize-handle {
    width: 18px;
}

.is-mobile svg {
    width: 8px;
    height: 8px;
}
</style>