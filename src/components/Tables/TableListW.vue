<template>
    <div class="scroll-wrapper" :class="{ 'is-mobile': isMobile }" ref="wrapperRef">
        <div class="scrollable-content" :style="{width: widthWrapper > maxWidthTable ? '100%' : 'auto'}">
            <table ref="tableRef">
                <thead>
                    <tr ref="trHeadRef">
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
                        <tr :ref="el => rowsRef[rowIndex] = el">
                            <td class="first-td">
                                <input type="checkbox" />
                            </td>
                            <td v-for="(column, colIndex) in columns" :key="colIndex">
                                <span>{{ row[column.key] }}</span>
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
import { ref, onMounted, onBeforeUnmount, onUnmounted, defineProps, nextTick, computed } from 'vue';

const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
});

const isMobile = ref(false);
const wrapperRef = ref<HTMLTableRowElement | null>(null);
const tableRef = ref(null);
const trHeadRef = ref<HTMLTableRowElement | null>(null);
const rowsRef = ref<HTMLElement[]>([]);
const widthWrapper = computed(() => { return wrapperRef.value?.offsetWidth ?? 0 })
const maxWidthTable = computed(() => {
    const numColumns = trHeadRef.value?.children.length ?? 0;
    const maxWidths = Array(numColumns).fill(0);

    rowsRef.value.forEach((rowRef) => {
        const tds = Array.from(rowRef.children) as HTMLElement[];
        tds.forEach((td, columnIndex) => {
            const child = td.children[0] as HTMLElement | undefined;
            const width = child?.offsetWidth ?? 0;
            if (width > maxWidths[columnIndex]) {
                maxWidths[columnIndex] = width;
            }
        });
    });
    return maxWidths.reduce((sum, width) => sum + width, 0);
});

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
};

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
    const newWidth = clientY - containerRect.top;
    const min = 100;
    const max = containerRect.height - 100;
};

const startDragging = () => {
    isDragging.value = true;
};

const smainDragging = () => {
    isDragging.value = false;
};

onMounted(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", smainDragging);
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("touchend", smainDragging);
});

onBeforeUnmount(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", smainDragging);
    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", smainDragging);
});

</script>

<style>
.scroll-wrapper {
    width: 100%;
    height: 100%;
    background: black;
    overflow: hidden;
    font-family: sans-serif;
    font-size: 14px;
}

.scrollable-content {
    background: blue;
    overflow-x: auto;
    overflow-y: auto;
}

table {
    margin: 0;
    padding: 0;
    height: auto;
    border-collapse: collapse;
    table-layout: auto;
}

thead {
    position: sticky;
    top: 0px;
    z-index: 1;
    color: #0F141A;
    background: #FAFAFA;
}


table,
th,
td {
    border: 1px solid black;
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

}

thead th:not(.first-th) .th-box .th-content {
    width: auto;
    height: 20px;
    background: blue;
    display: flex;
    flex-direction: row;
    align-items: center;
}

thead .resize-handle {
    cursor: col-resize;
    width: 0px;
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