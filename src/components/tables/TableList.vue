<template>
    <div class="wrapper">
        <div class="content">
            <table style="min-width: 100%; width: auto;">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="cb-master" id="cb-master" ref="boxMasterRef"
                                @change="toggleAllBox" />
                        </th>
                        <th v-for="(column, i) in columns" :key="i">
                            <div class="th-box">
                                <span>{{ column.header }}</span>
                                <svg width="11" height="9" viewBox="0 0 11 9" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.10547 7.22949C5.91844 7.48846 5.54539 7.50474 5.33496 7.27832L5.29492 7.22949L1.73145 2.29297C1.4928 1.96229 1.72989 1.5 2.1377 1.5L9.2627 1.5C9.64505 1.5 9.8773 1.90625 9.70801 2.22949L9.66895 2.29297L6.10547 7.22949Z"
                                        stroke="#0F141A" stroke-width="2" />
                                </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(row, i) in data" :key="row.id">
                        <tr :class="{ 'row-selected': selectedItems.includes(row.id) }">
                            <td>
                                <input type="checkbox" :name="'cb-slave-' + row.id" :id="'cb-slave-' + row.id"
                                    :ref="(box) => (boxSlaveRefs[row.id] = box)"
                                    :checked="selectedItems.includes(row.id)" @change="toggleBox(row.id)" />
                            </td>
                            <td v-for="(column, j) in columns" :key="j">
                                <span>{{ row[column.key] }}</span>
                            </td>
                        </tr>
                        <tr v-if="i < data.length" class="box-separator">
                            <td :colspan="columns.length + 1" class="row-separator">
                                <div class="separator"></div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, watch, defineEmits, nextTick, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['update:selectedItems']);

const boxMasterRef = ref(null);
const boxSlaveRefs = ref([]);
const selectedItems = ref([]);

const toggleBox = (id) => {
    const index = selectedItems.value.indexOf(id);
    if (index !== -1) {
        selectedItems.value.splice(index, 1);
    } else {
        selectedItems.value.push(id);
    }
    boxMasterRef.value.checked = selectedItems.value.length === props.data.length;
    emit('update:selectedItems', [...selectedItems.value]);
};

const toggleAllBox = () => {
    const allChecked = selectedItems.value.length === props.data.length;
    selectedItems.value = allChecked ? [] : props.data.map((row) => row.id);

    Object.values(boxSlaveRefs.value).forEach((box) => {
        if (box) {
            box.checked = !allChecked;
        }
    });

    emit('update:selectedItems', [...selectedItems.value]);
};

// Sincronizar selectedItems, boxSlaveRefs y rowsRef cuando cambian los datos
watch(
    () => props.data,
    async (newData) => {
        // Limpiar selectedItems de IDs que ya no existen
        selectedItems.value = selectedItems.value.filter((id) =>
            newData.some((row) => row.id === id)
        );
        // Reiniciar boxSlaveRefs y rowsRef
        boxSlaveRefs.value = {};

        // Esperar a que el DOM se renderice
        await nextTick();

        // Actualizar el checkbox maestro
        if (boxMasterRef.value) {
            boxMasterRef.value.checked = selectedItems.value.length === newData.length;
        }
        emit('update:selectedItems', [...selectedItems.value]);
    },
    { deep: true }
);
</script>

<style scoped lang="scss">
.wrapper {
    position: relative;
    overflow: hidden;
    font-family: sans-serif;
    container-type: inline-size;
}

.content {
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
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0px;
}

thead {
    position: sticky;
    top: 0;
    z-index: 1;
}

th {
    height: 20px;
    background: #FAFAFA;
    position: relative;
    border-collapse: separate;
    box-sizing: border-box;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    font-weight: 700;
    color: #0F141A;
    border-bottom: 2px solid #C6C6CD;
}

th::after {
    content: '';
    position: absolute;
    top: 25%;
    right: 0px;
    height: 50%;
    width: 2px;
    border-radius: 2px;
    background: #8C8C94;
    cursor: col-resize;
}

/* latest th */
th:last-child::after {
    display: none;
}

thead th:first-child {
    width: 38px;
}

thead th .th-box {
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
}

tbody td {
    box-sizing: border-box;
    text-wrap: nowrap;
    border-collapse: separate;
}

/* firsts td */
tbody tr:not(.box-separator) td:first-child {
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
    border-radius: 6px 0px 0px 6px;
    text-align: center;
}

/* intermedies td */
tbody tr:not(.box-separator) td:not(:first-child):not(:last-child) {
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
}

/* latests td */
tbody tr:not(.box-separator) td:last-child {
    border-top: 2px solid transparent;
    border-right: 2px solid transparent;
    border-bottom: 2px solid transparent;
    border-radius: 0px 6px 6px 0px;
}

tbody tr:not(.box-separator):hover,
tbody tr.row-selected {
    td:first-child {
        border-top: 2px solid #006CE0;
        border-left: 2px solid #006CE0;
        border-bottom: 2px solid #006CE0;
        background: #F0FBFF;
    }

    td:not(:first-child):not(:last-child) {
        border-top: 2px solid #006CE0;
        border-bottom: 2px solid #006CE0;
        background: #F0FBFF;
    }

    td:last-child {
        border-top: 2px solid #006CE0;
        border-right: 2px solid #006CE0;
        border-bottom: 2px solid #006CE0;
        background: #F0FBFF;
    }
}

tbody .row-separator {
    padding: 2px;
}

tbody .separator {
    height: 1px;
    width: 100%;
    background: #E6E6EB;
}

@media screen and (min-width: 769px) {
    thead th {
        font-size: 13px;
    }

    tbody td:not(.row-separator) {
        padding: 8px;
        font-size: 13px;
    }
}

@media screen and (max-width: 768px) {
    thead th {
        font-size: 13px;
    }

    thead svg {
        height: 8px;
        width: 8px;
    }

    thead input,
    tbody input {
        width: 16px;
        height: 16px;
    }

    tbody td:not(.row-separator) {
        padding: 4px 8px 4px 8px;
        font-size: 12px;
    }
}
</style>